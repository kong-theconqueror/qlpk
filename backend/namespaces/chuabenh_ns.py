from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.khambenh_schema import khambenh_schema, khambenhs_schema
from extensions import api

ns = Namespace("kham_benh", description="Quản lý thông tin khám bệnh")

# Model API cho KhamBenh
SearchModel = api.model("Search", {
    "NgayKham": fields.String(required=True, description="Ngay khám bệnh")
})

KhamBenhModel = api.model("KhamBenh", {
    "MaKB": fields.String(required=True, description="Mã khám bệnh"),
    "MaBN": fields.String(required=True, description="Mã bệnh nhân"),
    "MaBS": fields.String(required=True, description="Mã bác sĩ"),
    "ThoiGian": fields.String(required=True, description="Thời gian khám"),
})

@ns.route("")
class KhamBenhList(Resource):
    @ns.expect(SearchModel)
    def get(self):
        date_str = request.args.get("date")
        if not date_str:
            return {"error": "Thiếu tham số ?date="}, 400
        
        sql = """
            SELECT 
                kb.MaKB,
                kb.MaBN,
                bn.TenBN,
                kb.MaBS,
                bs.TenBS, 
                k.TenKhoa,
                kb.ThoiGian
            FROM KhamBenh kb, BenhNhan bn, BacSy bs, Khoa k
            WHERE DATE(kb.ThoiGian) = %s
                AND bn.MaBN = kb.MaBN
                AND bs.MaBS = kb.MaBS
                AND k.MaKhoa = bs.MaKhoa
            ORDER BY bn.TenBN, kb.ThoiGian ASC;
        """
        params = (date_str,)
        rows = run_query(sql, params)
        return khambenhs_schema.dump(rows)

    @ns.expect(KhamBenhModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO KhamBenh(MaBS, TenBS, GioiTinh, PhongKham,
                              NamKinhNghiem, HeSoLuong, MaKhoa)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
        """
        params = (data["MaBS"], data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM KhamBenh WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return khambenh_schema.dump(row), 201

    @ns.expect(KhamBenhModel)
    def put(self):
        """Cập nhật thông tin bác sỹ"""
        data = request.json
        sql = """
            UPDATE KhamBenh 
            SET TenBS=%s, GioiTinh=%s, PhongKham=%s,
                NamKinhNghiem=%s, HeSoLuong=%s, MaKhoa=%s
            WHERE MaBS=%s
        """
        params = (data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"], data["MaBS"])
        run_query(sql, params)
        row = run_query("SELECT * FROM KhamBenh WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return khambenh_schema.dump(row), 200

@ns.route("/<string:ma_kb>")
class KhamBenhDetail(Resource):
    def get(self, ma_kb):
        row = run_query("SELECT * FROM KhamBenh WHERE MaBS=%s", (ma_kb,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return khambenh_schema.dump(row), 200
    
    def delete(self, ma_kb):
        """Xoá bác sỹ"""
        run_query("DELETE FROM KhamBenh WHERE MaBS=%s", (ma_kb,))
        return {"message": f"KhamBenh {ma_kb} deleted successfully"}, 200

@ns.route("/<string:date>")
class KhamBenhSearch(Resource):
    def get(self, date):
        data = request.json
        sql = """
            SELECT 
                kb.MaKB,
                kb.MaBN,
                bn.TenBN,
                kb.MaBS,
                bs.TenBS,
                b.TenBenh,
                cd.MucDo,
                cd.SoLanChuaBenhDuDoan,
                kb.ThoiGian
            FROM KhamBenh kb
            JOIN BenhNhan bn ON kb.MaBN = bn.MaBN
            JOIN BacSy bs ON kb.MaBS = bs.MaBS
            LEFT JOIN ChanDoan cd ON kb.MaKB = cd.MaKB
            LEFT JOIN Benh b ON cd.MaBenh = b.MaBenh
            WHERE DATE(kb.ThoiGian) = %s
            ORDER BY kb.ThoiGian ASC;
        """
        params = (date,)
        rows = run_query(sql, params)
        print(rows)
        return khambenhs_schema.dump(rows)