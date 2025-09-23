from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.hosobenhan_schema import hosobenhan_schema, hosobenhans_schema
from extensions import api

ns = Namespace("ho_so_benh_an", description="Quản lý thông tin bệnh án")

# Model API cho HoSoBenhAn
SearchModel = api.model("Search", {
    "MaBN": fields.String(required=True, description="Mã bệnh nhân")
})

HoSoBenhAnModel = api.model("HoSoBenhAn", {
    "MaKB": fields.String(required=True, description="Mã bệnh án"),
    "MaBN": fields.String(required=True, description="Mã bệnh nhân"),
    "MaBS": fields.String(required=True, description="Mã bác sĩ"),
    "ThoiGian": fields.String(required=True, description="Thời gian chữa"),
})

@ns.route("")
class HoSoBenhAnList(Resource):
    @ns.expect(SearchModel)
    def get(self):
        MaBN = request.args.get("MaBN")
        if not MaBN:
            return {"error": "Thiếu tham số ?MaBN="}, 400
        sql = """
            SELECT 
                h.MaBA,
                h.MaBN,
                bn.TenBN,
                h.MaCD,
                cd.MaBenh,
                b.TenBenh,
                cd.MucDo,
                cd.SoLanChuaBenhDuDoan,
                h.MaBS,
                bs.TenBS,
                h.TrangThai,
                h.ThoiGianMo,
                h.ThoiGianKetThuc
            FROM HoSoBenhAn h, BenhNhan bn, ChanDoan cd, Benh b, BacSy bs
            WHERE h.MaBN = bn.MaBN
            AND h.MaCD = cd.MaCD
            AND cd.MaBenh = b.MaBenh
            AND h.MaBS = bs.MaBS
            AND h.MaBN = %s
            ORDER BY h.ThoiGianMo DESC;
        """
        params = (MaBN,)
        rows = run_query(sql, params)
        return hosobenhans_schema.dump(rows)

    @ns.expect(HoSoBenhAnModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO HoSoBenhAn(MaBS, TenBS, GioiTinh, PhongKham,
                              NamKinhNghiem, HeSoLuong, MaKhoa)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
        """
        params = (data["MaBS"], data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM HoSoBenhAn WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return hosobenhan_schema.dump(row), 201

    @ns.expect(HoSoBenhAnModel)
    def put(self):
        """Cập nhật thông tin bác sỹ"""
        data = request.json
        sql = """
            UPDATE HoSoBenhAn 
            SET TenBS=%s, GioiTinh=%s, PhongKham=%s,
                NamKinhNghiem=%s, HeSoLuong=%s, MaKhoa=%s
            WHERE MaBS=%s
        """
        params = (data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"], data["MaBS"])
        run_query(sql, params)
        row = run_query("SELECT * FROM HoSoBenhAn WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return hosobenhan_schema.dump(row), 200

@ns.route("/<string:ma_cb>")
class HoSoBenhAnDetail(Resource):
    def get(self, ma_cb):
        row = run_query("SELECT * FROM HoSoBenhAn WHERE MaCB=%s", (ma_cb,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return hosobenhan_schema.dump(row), 200
    
    def delete(self, ma_cb):
        """Xoá bác sỹ"""
        run_query("DELETE FROM HoSoBenhAn WHERE MaBS=%s", (ma_cb,))
        return {"message": f"HoSoBenhAn {ma_cb} deleted successfully"}, 200

@ns.route("/<string:date>")
class HoSoBenhAnSearch(Resource):
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
                cd.SoLanHoSoBenhAnDuDoan,
                kb.ThoiGian
            FROM HoSoBenhAn kb
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
        return hosobenhans_schema.dump(rows)