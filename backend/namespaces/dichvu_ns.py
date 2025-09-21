from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.dichvu_schema import dichvu_schema, dichvus_schema
from extensions import api

ns = Namespace("dich_vu", description="Quản lý thông tin dịch vụ")

# Model API cho DichVu
DichVuModel = api.model("DichVu", {
    "MaDichVu": fields.String(required=True, description="Mã dịch vụ"),
    "TenDichVu": fields.String(required=True, description="Tên dịch vụ"),
    "DonGia": fields.Float(required=True, description="Chi phí dịch vụ"),
    "MoTa": fields.String(required=False, description="Mô tả dịch vụ"),
})


@ns.route("")
class DichVuList(Resource):
    def get(self):
        rows = run_query("""
            SELECT MaDichVu, TenDichVu, DonGia, MoTa
            FROM DichVu
            ORDER BY MaDichVu DESC
        """)
        return dichvus_schema.dump(rows)

    @ns.expect(DichVuModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO DichVu(MaDichVu, TenDichVu, DonGia, MoTa)
            VALUES(%s, %s, %s, %s)
        """
        params = (data["MaDichVu"], data["TenDichVu"], data["DonGia"], data.get("MoTa"))
        run_query(sql, params)
        row = run_query("SELECT * FROM DichVu WHERE MaDichVu=%s", (data["MaDichVu"],), fetch="one")
        return dichvu_schema.dump(row), 201

    @ns.expect(DichVuModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE DichVu
            SET TenDichVu=%s, DonGia=%s, MoTa=%s
            WHERE MaDichVu=%s
        """
        params = (data["TenDichVu"], data["DonGia"], data.get("MoTa"), data["MaDichVu"])
        run_query(sql, params)
        row = run_query("SELECT * FROM DichVu WHERE MaDichVu=%s", (data["MaDichVu"],), fetch="one")
        return dichvu_schema.dump(row), 200

@ns.route("/<string:ma_dv>")
class DichVuDetail(Resource):
    def get(self, ma_dv):
        row = run_query("SELECT * FROM DichVu WHERE MaDichVu=%s", (ma_dv,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return dichvu_schema.dump(row), 200
    
    def delete(self, ma_dv):
        run_query("DELETE FROM DichVu WHERE MaDichVu=%s", (ma_dv,))
        return {"message": f"DichVu {ma_dv} deleted successfully"}, 200
