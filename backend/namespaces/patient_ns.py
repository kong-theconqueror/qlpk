from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.patient_schema import patient_schema, patients_schema
from extensions import api

ns = Namespace("patient", description="Quản lý thông tin bệnh nhân")

PatientModel = api.model("Patient", {
    "id": fields.String(required=True, description="Mã bệnh nhân (VD: BN041001)"),
    "full_name": fields.String(required=True, description="Họ và tên"),
    "birth": fields.String(required=True, description="Ngày sinh (dd/MM/yyyy)"),
    "gender": fields.String(required=True, description="Giới tính"),
    "phone_num": fields.String(required=True, description="Số điện thoại"),
    "address": fields.String(required=True, description="Địa chỉ"),
})

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        if sql.strip().lower().startswith("select"):
            return cur.fetchone() if fetch == "one" else cur.fetchall()
        return {"rowcount": cur.rowcount, "last_id": cur.lastrowid}
    conn.close()

@ns.route("")
class PatientList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM patient ORDER BY id DESC")
        return patients_schema.dump(rows)

    @ns.expect(PatientModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO patient(id, full_name, birth, gender, phone_num, address)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        params = (
            data["id"], data["full_name"], data["birth"], data["gender"],
            data["phone_num"], data["address"]
        )
        res = run_query(sql, params)
        row = run_query("SELECT * FROM patient WHERE id=%s", (data["id"],), fetch="one")
        return patient_schema.dump(row), 201

    @ns.expect(PatientModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE patient 
            SET full_name=%s, birth=%s, gender=%s, phone_num=%s, address=%s
            WHERE id=%s
        """
        params = (
            data["full_name"], data["birth"], data["gender"],
            data["phone_num"], data["address"], data["id"]
        )
        run_query(sql, params)
        row = run_query("SELECT * FROM patient WHERE id=%s", (data["id"],), fetch="one")
        return patient_schema.dump(row), 201


@ns.route("/<string:patient_id>")
class PatientDetail(Resource):
    def get(self, patient_id):
        row = run_query("SELECT * FROM patient WHERE id=%s", (patient_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return patient_schema.dump(row)

    def delete(self, patient_id):
        run_query("DELETE FROM patient WHERE id=%s", (patient_id,))
        return {"message": f"Patient {patient_id} deleted successfully"}, 201
