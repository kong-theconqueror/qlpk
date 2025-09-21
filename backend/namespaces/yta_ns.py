from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.yta_schema import yta_schema, ytas_schema
from extensions import api

ns = Namespace("y_ta", description="Quản lý thông tin y tá")

# Model API cho YTa
YTaModel = api.model("YTa", {
    "MaYT": fields.String(required=True, description="Mã y tá (VD: YT0001)"),
    "TenYT": fields.String(required=True, description="Họ và tên y tá"),
    "GioiTinh": fields.String(required=True, description="Giới tính"),
    "BoPhan": fields.String(required=False, description="Bộ phận công tác"),
    "NamKinhNghiem": fields.Integer(required=True, description="Số năm kinh nghiệm"),
    "HeSoLuong": fields.Float(required=True, description="Hệ số lương"),
})

@ns.route("")
class YTaList(Resource):
    def get(self):
        rows = run_query("""
            SELECT MaYT, TenYT, GioiTinh, BoPhan, NamKinhNghiem, HeSoLuong
            FROM YTa
            ORDER BY MaYT DESC
        """)
        return ytas_schema.dump(rows)

    @ns.expect(YTaModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO YTa(MaYT, TenYT, GioiTinh, BoPhan, NamKinhNghiem, HeSoLuong)
            VALUES(%s, %s, %s, %s, %s, %s)
        """
        params = (
            data["MaYT"], data["TenYT"], data["GioiTinh"],
            data.get("BoPhan"), data["NamKinhNghiem"], data["HeSoLuong"]
        )
        run_query(sql, params)
        row = run_query("SELECT * FROM YTa WHERE MaYT=%s", (data["MaYT"],), fetch="one")
        return yta_schema.dump(row), 201

    @ns.expect(YTaModel)
    def put(self):
        """Cập nhật thông tin y tá"""
        data = request.json
        sql = """
            UPDATE YTa
            SET TenYT=%s, GioiTinh=%s, BoPhan=%s,
                NamKinhNghiem=%s, HeSoLuong=%s
            WHERE MaYT=%s
        """
        params = (
            data["TenYT"], data["GioiTinh"], data.get("BoPhan"),
            data["NamKinhNghiem"], data["HeSoLuong"], data["MaYT"]
        )
        run_query(sql, params)
        row = run_query("SELECT * FROM YTa WHERE MaYT=%s", (data["MaYT"],), fetch="one")
        return yta_schema.dump(row), 200

@ns.route("/<string:ma_yt>")
class YTaDetail(Resource):
    def get(self, ma_yt):
        row = run_query("SELECT * FROM YTa WHERE MaYT=%s", (ma_yt,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return yta_schema.dump(row), 200
    
    def delete(self, ma_yt):
        """Xoá y tá"""
        run_query("DELETE FROM YTa WHERE MaYT=%s", (ma_yt,))
        return {"message": f"YTa {ma_yt} deleted successfully"}, 200
