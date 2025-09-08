from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.doctor_schema import doctor_schema, doctors_schema
from extensions import api

ns = Namespace("doctor", description="Quản lý thông tin bác sỹ")

DoctorModel = api.model("Doctor", {
    "id": fields.String(required=True, description="Mã bác sỹ (VD: BS0001)"),
    "full_name": fields.String(required=True, description="Họ và tên"),
    "gender": fields.String(required=True, description="Giới tính"),
    "room": fields.String(required=True, description="Phòng khám"),
    "years_of_experience": fields.Integer(required=True, description="Số năm kinh nghiệm"),
    "title": fields.String(required=True, description="Chức danh"),
    "salary_coefficient": fields.Float(required=True, description="Hệ số lương"),
    "specialty": fields.String(required=True, description="Chuyên khoa"),
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
class DoctorList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM Doctor ORDER BY id DESC")
        doctors_schema.dump(rows)
        return doctors_schema.dump(rows)

    @ns.expect(DoctorModel)
    def post(self):
        data = request.json
        sql = """
                INSERT INTO doctors(id, full_name, gender, room,
                                    years_of_experience, title,
                                    salary_coefficient, specialty)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s)
            """
        params = (data["id"], data["full_name"], data["gender"], data["room"],
            data["years_of_experience"], data["title"],
            data["salary_coefficient"], data["specialty"])
        res = run_query(sql, params)
        print(sql)
        row = run_query("SELECT * FROM Doctor WHERE id=%s", (res["last_id"],), fetch="one")
        return doctor_schema.dump(row), 201

    @api.expect(DoctorModel)
    def put(self, doctor_id):
        """Cập nhật thông tin bác sỹ"""
        data = request.json
        sql = """
            UPDATE doctors SET full_name=%s, gender=%s, room=%s,
                years_of_experience=%s, title=%s,
                salary_coefficient=%s, specialty=%s
            WHERE id=%s
        """
        params = (data["full_name"], data["gender"], data["room"],
            data["years_of_experience"], data["title"],
            data["salary_coefficient"], data["specialty"], doctor_id)
        res = run_query( sql, params )
        row = run_query("SELECT * FROM Doctor WHERE id=%s", (doctor_id,), fetch="one")
        return doctor_schema.dump(row), 201

    def delete(self, doctor_id):
        """Xoá bác sỹ"""
        res = run_query("DELETE FROM doctors WHERE id=%s", (doctor_id,))
        return {"message": f"Doctor {doctor_id} deleted successfully"}, 201

@ns.route("/<string:doctor_id>")
class DoctorDetail(Resource):
    def get(self, doctor_id):
        row = run_query("SELECT * FROM Doctor WHERE id=%s", (doctor_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return doctor_schema.dump(row)