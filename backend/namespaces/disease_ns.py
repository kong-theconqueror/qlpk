from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.disease_schema import disease_schema, diseases_schema
from extensions import api

ns = Namespace("disease", description="Quản lý bệnh")

DiseaseModel = api.model("Disease", {
    "id_benh": fields.Integer(required=True, description="Mã bệnh"),
    "ten_benh": fields.String(required=True, description="Tên bệnh"),
    "mo_ta": fields.String(description="Mô tả"),
    "ma_khoa": fields.String(required=True, description="Mã khoa"),
})

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        if sql.strip().lower().startswith("select"):
            return cur.fetchone() if fetch == "one" else cur.fetchall()
        return {"rowcount": cur.rowcount}
    conn.close()

@ns.route("")
class DiseaseList(Resource):
    def get(self):
        rows = run_query("""
            SELECT id_benh, ten_benh, disease.mo_ta, ten_khoa FROM `disease`, `department` 
            WHERE disease.ma_khoa = department.ma_khoa
            ORDER BY id_benh DESC
        """)
        return diseases_schema.dump(rows)

    @ns.expect(DiseaseModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO disease(id_benh, ten_benh, mo_ta, ma_khoa)
                 VALUES(%s,%s,%s,%s)"""
        params = (data["id_benh"], data["ten_benh"], data.get("mo_ta"), data["ma_khoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM disease WHERE id_benh=%s", (data["id_benh"],), fetch="one")
        return disease_schema.dump(row), 201
    
    @ns.expect(DiseaseModel)
    def put(self):
        data = request.json
        sql = """UPDATE disease SET ten_benh=%s, mo_ta=%s, ma_khoa=%s WHERE id_benh=%s"""
        params = (data["ten_benh"], data.get("mo_ta"), data["ma_khoa"], data["id"])
        run_query(sql, params)
        row = run_query("SELECT * FROM disease WHERE id_benh=%s", (data["id"],), fetch="one")
        return disease_schema.dump(row), 201


@ns.route("/<int:disease_id>")
class DiseaseDetail(Resource):
    def get(self, disease_id):
        row = run_query("SELECT * FROM disease WHERE id_benh=%s", (disease_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return disease_schema.dump(row)

    def delete(self, disease_id):
        run_query("DELETE FROM disease WHERE id_benh=%s", (disease_id,))
        return {"message": f"Disease {disease_id} deleted"}, 201
