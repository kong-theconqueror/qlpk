from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.department_schema import department_schema, departments_schema
from extensions import api

ns = Namespace("department", description="Quản lý khoa")

DepartmentModel = api.model("Department", {
    "ma_khoa": fields.String(required=True, description="Mã khoa"),
    "ten_khoa": fields.String(required=True, description="Tên khoa"),
    "mo_ta": fields.String(description="Mô tả"),
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
class DepartmentList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM department ORDER BY ma_khoa ASC")
        return departments_schema.dump(rows)

    @ns.expect(DepartmentModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO department(ma_khoa, ten_khoa, mo_ta) VALUES(%s,%s,%s)"""
        params = (data["ma_khoa"], data["ten_khoa"], data["mo_ta"])
        run_query(sql, params)
        row = run_query("SELECT * FROM department WHERE ma_khoa=%s", (data["ma_khoa"],), fetch="one")
        return department_schema.dump(row), 201
    
    @ns.expect(DepartmentModel)
    def put(self):
        data = request.json
        sql = """UPDATE department SET ten_khoa=%s, mo_ta=%s WHERE ma_khoa=%s"""
        params = (data["ten_khoa"], data["mo_ta"], data["ma_khoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM department WHERE ma_khoa=%s", (data["ma_khoa"],), fetch="one")
        return department_schema.dump(row), 201

@ns.route("/<string:ma_khoa>")
class DepartmentDetail(Resource):
    def get(self, ma_khoa):
        row = run_query("SELECT * FROM department WHERE ma_khoa=%s", (ma_khoa,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return department_schema.dump(row)

    def delete(self, ma_khoa):
        run_query("DELETE FROM department WHERE ma_khoa=%s", (ma_khoa,))
        return {"message": f"Department {ma_khoa} deleted"}, 201
