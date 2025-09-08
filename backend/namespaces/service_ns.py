from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.service_schema import service_schema, services_schema
from extensions import api

ns = Namespace("service", description="Quản lý dịch vụ")

ServiceModel = api.model("Service", {
    "id_dich_vu": fields.Integer(required=True, description="Mã dịch vụ"),
    "ten_dich_vu": fields.String(required=True, description="Tên dịch vụ"),
    "don_gia": fields.Float(required=True, description="Đơn giá"),
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
class ServiceList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM service ORDER BY id_dich_vu DESC")
        return services_schema.dump(rows)

    @ns.expect(ServiceModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO service(id_dich_vu, ten_dich_vu, don_gia, mo_ta)
                 VALUES(%s,%s,%s,%s)"""
        params = (data["id_dich_vu"], data["ten_dich_vu"], data["don_gia"], data.get("mo_ta"))
        run_query(sql, params)
        row = run_query("SELECT * FROM service WHERE id_dich_vu=%s", (data["id_dich_vu"],), fetch="one")
        return service_schema.dump(row), 201

@ns.route("/<int:service_id>")
class ServiceDetail(Resource):
    def get(self, service_id):
        row = run_query("SELECT * FROM service WHERE id_dich_vu=%s", (service_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return service_schema.dump(row)

    @ns.expect(ServiceModel)
    def put(self, service_id):
        data = request.json
        sql = """UPDATE service SET ten_dich_vu=%s, don_gia=%s, mo_ta=%s WHERE id_dich_vu=%s"""
        params = (data["ten_dich_vu"], data["don_gia"], data.get("mo_ta"), service_id)
        run_query(sql, params)
        row = run_query("SELECT * FROM service WHERE id_dich_vu=%s", (service_id,), fetch="one")
        return service_schema.dump(row), 200

    def delete(self, service_id):
        run_query("DELETE FROM service WHERE id_dich_vu=%s", (service_id,))
        return {"message": f"Service {service_id} deleted"}, 200
