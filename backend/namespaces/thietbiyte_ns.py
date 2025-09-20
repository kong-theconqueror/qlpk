from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.thietbiyte_schema import thietbiyte_schema, thietbiytes_schema
from extensions import api

ns = Namespace("thiet_bi_y_te", description="Quản lý thông tin thiết bị y tế")

# Model API cho ThietBiYTe
ThietBiYTeModel = api.model("ThietBiYTe", {
    "MaThietBi": fields.String(required=True, description="Mã thiết bị"),
    "TenThietBi": fields.String(required=True, description="Tên thiết bị"),
    "DonViTinh": fields.String(required=True, description="Đơn vị tính"),
    "DonGia": fields.Integer(required=True, description="Đơn giá"),
})

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params or ())
            if sql.strip().lower().startswith("select"):
                return cur.fetchone() if fetch == "one" else cur.fetchall()
            conn.commit()
            return {"rowcount": cur.rowcount, "last_id": cur.lastrowid}
    finally:
        conn.close()

@ns.route("")
class ThietBiYTeList(Resource):
    def get(self):
        rows = run_query("""
            SELECT MaThietBi, TenThietBi, DonViTinh, DonGia
            FROM ThietBiYTe
            ORDER BY MaThietBi DESC
        """)
        return thietbiytes_schema.dump(rows)

    @ns.expect(ThietBiYTeModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO ThietBiYTe(MaThietBi, TenThietBi, DonViTinh, DonGia)
            VALUES(%s, %s, %s, %s)
        """
        params = (data["MaThietBi"], data["TenThietBi"], data["DonViTinh"], data["DonGia"])
        run_query(sql, params)
        row = run_query("SELECT * FROM ThietBiYTe WHERE MaThietBi=%s", (data["MaThietBi"],), fetch="one")
        return thietbiyte_schema.dump(row), 201

    @ns.expect(ThietBiYTeModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE ThietBiYTe
            SET TenThietBi=%s, TrangThai=%s
            WHERE MaThietBi=%s
        """
        params = (data["TenThietBi"], data["DonViTinh"], data["DonGia"], data["MaThietBi"])
        run_query(sql, params)
        row = run_query("SELECT * FROM ThietBiYTe WHERE MaThietBi=%s", (data["MaThietBi"],), fetch="one")
        return thietbiyte_schema.dump(row), 200

@ns.route("/<string:ma_tb>")
class ThietBiYTeDetail(Resource):
    def get(self, ma_tb):
        row = run_query("SELECT * FROM ThietBiYTe WHERE MaThietBi=%s", (ma_tb,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return thietbiyte_schema.dump(row), 200
    
    def delete(self, ma_tb):
        run_query("DELETE FROM ThietBiYTe WHERE MaThietBi=%s", (ma_tb,))
        return {"message": f"ThietBiYTe {ma_tb} deleted successfully"}, 200
