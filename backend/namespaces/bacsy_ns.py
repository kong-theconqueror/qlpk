from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.bacsy_schema import bacsy_schema, bacsys_schema
from extensions import api

ns = Namespace("bac_sy", description="Quản lý thông tin bác sỹ")

# Model API cho BacSy
BacSyModel = api.model("BacSy", {
    "MaBS": fields.String(required=True, description="Mã bác sỹ (VD: BS0001)"),
    "TenBS": fields.String(required=True, description="Họ và tên"),
    "GioiTinh": fields.String(required=True, description="Giới tính"),
    "PhongKham": fields.String(required=True, description="Phòng khám"),
    "NamKinhNghiem": fields.Integer(required=True, description="Số năm kinh nghiệm"),
    "HeSoLuong": fields.Float(required=True, description="Hệ số lương"),
    "MaKhoa": fields.String(required=True, description="Mã khoa"),
})

@ns.route("")
class BacSyList(Resource):
    def get(self):
        rows = run_query("""
            SELECT b.MaBS, b.TenBS, b.GioiTinh, b.PhongKham, 
                   b.NamKinhNghiem, b.HeSoLuong, k.TenKhoa, k.MaKhoa
            FROM BacSy b
            JOIN Khoa k ON b.MaKhoa = k.MaKhoa
            ORDER BY b.MaBS DESC
        """)
        return bacsys_schema.dump(rows)

    @ns.expect(BacSyModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO BacSy(MaBS, TenBS, GioiTinh, PhongKham,
                              NamKinhNghiem, HeSoLuong, MaKhoa)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
        """
        params = (data["MaBS"], data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM BacSy WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return bacsy_schema.dump(row), 201

    @ns.expect(BacSyModel)
    def put(self):
        """Cập nhật thông tin bác sỹ"""
        data = request.json
        sql = """
            UPDATE BacSy 
            SET TenBS=%s, GioiTinh=%s, PhongKham=%s,
                NamKinhNghiem=%s, HeSoLuong=%s, MaKhoa=%s
            WHERE MaBS=%s
        """
        params = (data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"], data["MaBS"])
        run_query(sql, params)
        row = run_query("SELECT * FROM BacSy WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return bacsy_schema.dump(row), 200

@ns.route("/<string:bac_sy_id>")
class BacSyDetail(Resource):
    def get(self, bac_sy_id):
        row = run_query("SELECT * FROM BacSy WHERE MaBS=%s", (bac_sy_id,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return bacsy_schema.dump(row), 200
    
    def delete(self, bac_sy_id):
        """Xoá bác sỹ"""
        run_query("DELETE FROM BacSy WHERE MaBS=%s", (bac_sy_id,))
        return {"message": f"BacSy {bac_sy_id} deleted successfully"}, 200
