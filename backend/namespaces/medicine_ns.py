from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.medicine_schema import medicine_schema, medicines_schema
from extensions import api

ns = Namespace("medicine", description="Quản lý thuốc")

MedicineModel = api.model("Medicine", {
    "id": fields.String(required=True, description="Mã thuốc"),
    "name": fields.String(required=True, description="Tên thuốc"),
    "description": fields.String(description="Mô tả"),
    "unit_price": fields.Float(required=True, description="Đơn giá"),
    "unit": fields.String(required=True, description="Đơn vị"),
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
class MedicineList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM medicine ORDER BY id DESC")
        return medicines_schema.dump(rows)

    @ns.expect(MedicineModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO medicine(id, name, description, unit_price, unit)
                 VALUES(%s,%s,%s,%s,%s)"""
        params = (data["id"], data["name"], data.get("description"), data["unit_price"], data["unit"])
        run_query(sql, params)
        row = run_query("SELECT * FROM medicine WHERE id=%s", (data["id"],), fetch="one")
        return medicine_schema.dump(row), 201

@ns.route("/<string:medicine_id>")
class MedicineDetail(Resource):
    def get(self, medicine_id):
        row = run_query("SELECT * FROM medicine WHERE id=%s", (medicine_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return medicine_schema.dump(row)

    @ns.expect(MedicineModel)
    def put(self, medicine_id):
        data = request.json
        sql = """UPDATE medicine SET name=%s, description=%s, unit_price=%s, unit=%s WHERE id=%s"""
        params = (data["name"], data.get("description"), data["unit_price"], data["unit"], medicine_id)
        run_query(sql, params)
        row = run_query("SELECT * FROM medicine WHERE id=%s", (medicine_id,), fetch="one")
        return medicine_schema.dump(row), 200

    def delete(self, medicine_id):
        run_query("DELETE FROM medicine WHERE id=%s", (medicine_id,))
        return {"message": f"Medicine {medicine_id} deleted"}, 200
