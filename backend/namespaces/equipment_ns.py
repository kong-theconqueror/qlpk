from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.equipment_schema import equipment_schema, equipments_schema
from extensions import api

ns = Namespace("equipment", description="Quản lý thiết bị y tế")

EquipmentModel = api.model("Equipment", {
    "id_thiet_bi": fields.Integer(required=True, description="Mã thiết bị"),
    "ten_thiet_bi": fields.String(required=True, description="Tên thiết bị"),
    "chi_phi_su_dung": fields.Float(required=True, description="Chi phí sử dụng"),
    "trang_thai": fields.String(required=True, description="Trạng thái"),
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
class EquipmentList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM equipment ORDER BY id_thiet_bi DESC")
        return equipments_schema.dump(rows)

    @ns.expect(EquipmentModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO equipment(id_thiet_bi, ten_thiet_bi, chi_phi_su_dung, trang_thai)
                 VALUES(%s,%s,%s,%s)"""
        params = (data["id_thiet_bi"], data["ten_thiet_bi"],
                  data["chi_phi_su_dung"], data["trang_thai"])
        run_query(sql, params)
        row = run_query("SELECT * FROM equipment WHERE id_thiet_bi=%s", (data["id_thiet_bi"],), fetch="one")
        return equipment_schema.dump(row), 201

@ns.route("/<int:equipment_id>")
class EquipmentDetail(Resource):
    def get(self, equipment_id):
        row = run_query("SELECT * FROM equipment WHERE id_thiet_bi=%s", (equipment_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return equipment_schema.dump(row)

    @ns.expect(EquipmentModel)
    def put(self, equipment_id):
        data = request.json
        sql = """UPDATE equipment SET ten_thiet_bi=%s, chi_phi_su_dung=%s, trang_thai=%s
                 WHERE id_thiet_bi=%s"""
        params = (data["ten_thiet_bi"], data["chi_phi_su_dung"], data["trang_thai"], equipment_id)
        run_query(sql, params)
        row = run_query("SELECT * FROM equipment WHERE id_thiet_bi=%s", (equipment_id,), fetch="one")
        return equipment_schema.dump(row), 200

    def delete(self, equipment_id):
        run_query("DELETE FROM equipment WHERE id_thiet_bi=%s", (equipment_id,))
        return {"message": f"Equipment {equipment_id} deleted"}, 200
