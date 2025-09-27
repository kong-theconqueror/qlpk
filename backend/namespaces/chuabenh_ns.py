from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.chuabenh_schema import chuabenh_schema, chuabenhs_schema, chitietchuabenhs_schema
from extensions import api

ns = Namespace("chua_benh", description="Quản lý thông tin chữa bệnh")

# Model API cho ChuaBenh
SearchModel = api.model("Search", {
    "date": fields.String(required=True, description="Ngay chữa bệnh")
})

ChuaBenhModel = api.model("ChuaBenh", {
    "MaKB": fields.String(required=True, description="Mã chữa bệnh"),
    "MaBN": fields.String(required=True, description="Mã bệnh nhân"),
    "MaBS": fields.String(required=True, description="Mã bác sĩ"),
    "ThoiGian": fields.String(required=True, description="Thời gian chữa"),
})

@ns.route("")
class ChuaBenhList(Resource):
    @ns.expect(SearchModel)
    def get(self):
        date_str = request.args.get("date")
        if not date_str:
            return {"error": "Thiếu tham số ?date="}, 400
        
        sql = """
            SELECT 
                cb.MaCB,
                bn.MaBN,
                bn.TenBN,
                bs.MaBS,
                bs.TenBS, 
                cb.MaBenh,
                b.TenBenh,
                k.MaKhoa,
                k.TenKhoa,
                cb.ThoiGian,
                cb.HinhThucChuaBenh
            FROM ChuaBenh cb, BenhNhan bn, BacSy bs, Khoa k, Benh b, HoSoBenhAn hs
            WHERE DATE(cb.ThoiGian) = %s
                AND cb.MaBA = hs.MaBA
                AND cb.MaBenh = b.MaBenh
                AND bs.MaBS = hs.MaBS
                AND bn.MaBN = hs.MaBN
                AND k.MaKhoa = bs.MaKhoa
            ORDER BY bn.TenBN, cb.ThoiGian ASC;
        """
        params = (date_str,)
        rows = run_query(sql, params)
        return chuabenhs_schema.dump(rows)

    @ns.expect(ChuaBenhModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO ChuaBenh(MaBS, TenBS, GioiTinh, PhongKham,
                              NamKinhNghiem, HeSoLuong, MaKhoa)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
        """
        params = (data["MaBS"], data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM ChuaBenh WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return chuabenh_schema.dump(row), 201

    @ns.expect(ChuaBenhModel)
    def put(self):
        """Cập nhật thông tin bác sỹ"""
        data = request.json
        sql = """
            UPDATE ChuaBenh 
            SET TenBS=%s, GioiTinh=%s, PhongKham=%s,
                NamKinhNghiem=%s, HeSoLuong=%s, MaKhoa=%s
            WHERE MaBS=%s
        """
        params = (data["TenBS"], data["GioiTinh"], data["PhongKham"],
                  data["NamKinhNghiem"], data["HeSoLuong"], data["MaKhoa"], data["MaBS"])
        run_query(sql, params)
        row = run_query("SELECT * FROM ChuaBenh WHERE MaBS=%s", (data["MaBS"],), fetch="one")
        return chuabenh_schema.dump(row), 200

@ns.route("/<string:ma_cb>")
class ChuaBenhDetail(Resource):
    def get(self, ma_cb):
        row = run_query("SELECT * FROM ChuaBenh WHERE MaCB=%s", (ma_cb,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return chuabenh_schema.dump(row), 200
    
    def delete(self, ma_cb):
        """Xoá bác sỹ"""
        run_query("DELETE FROM ChuaBenh WHERE MaBS=%s", (ma_cb,))
        return {"message": f"ChuaBenh {ma_cb} deleted successfully"}, 200

@ns.route("/<string:date>")
class ChuaBenhSearch(Resource):
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
            FROM ChuaBenh kb
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
        return chuabenhs_schema.dump(rows)
    

@ns.route("/benh_an/<string:ma_benhan>")
class ChuaBenhBenhAn(Resource):
    def get(self, ma_benhan):
        if not ma_benhan:
            return {"error": "Thiếu tham số /ma_benhan"}, 400
        
        sql = """
            SELECT 
                cb.MaCB,
                cb.ThoiGian,
                -- Y tá
                GROUP_CONCAT(DISTINCT CONCAT('{MaYTa:', yt.MaYT, ', TenYT:', yt.TenYT, '}') SEPARATOR '|') AS YTaThamGia,
                
                -- Thiết bị
                GROUP_CONCAT(DISTINCT CONCAT('{MaThietBi:', tb.MaThietBi, ', TenThietBi:', tb.TenThietBi, ', SL:', tbcb.SoLuong, ', Gia:', tbcb.DonGiaApDung, '}') SEPARATOR '| ') AS ThietBiSuDung,
                
                -- Dịch vụ
                GROUP_CONCAT(DISTINCT CONCAT('{MaDV:', dv.MaDichVu, ', TenDV:', dv.TenDichVu, ', SL:', dvcb.SoLuong, ', Gia:', dvcb.DonGiaApDung, '}') SEPARATOR '| ') AS DichVuSuDung,
                
                -- Thuốc
                GROUP_CONCAT(DISTINCT CONCAT('{MaThuoc:', th.MaThuoc, ', TenThuoc:', th.TenThuoc, ', LieuDung:', ld.LieuDung, ', SoLuong:', ld.SoLuong, ', DonGia:', th.DonGia, ')') SEPARATOR ' | ') AS ThuocSuDung

            FROM HoSoBenhAn ba
            JOIN ChuaBenh cb ON ba.MaBA = cb.MaBA

            -- Y tá
            LEFT JOIN PhanCongCB pccb ON cb.MaCB = pccb.MaCB
            LEFT JOIN YTa yt ON pccb.MaYT = yt.MaYT

            -- Thiết bị
            LEFT JOIN SuDungThietBiCB tbcb ON cb.MaCB = tbcb.MaCB
            LEFT JOIN ThietBiYTe tb ON tbcb.MaThietBi = tb.MaThietBi

            -- Dịch vụ
            LEFT JOIN DichVuCB dvcb ON cb.MaCB = dvcb.MaCB
            LEFT JOIN DichVu dv ON dvcb.MaDichVu = dv.MaDichVu

            -- Thuốc
            LEFT JOIN DonThuoc dt ON cb.MaCB = dt.MaCB
            LEFT JOIN LieuDung ld ON dt.MaDonThuoc = ld.MaDonThuoc
            LEFT JOIN Thuoc th ON ld.MaThuoc = th.MaThuoc

            WHERE ba.MaBA = %s
            GROUP BY cb.MaCB
            ORDER BY cb.ThoiGian ASC;
        """
        params = (ma_benhan)
        rows = run_query(sql, params)
        return chitietchuabenhs_schema.dump(rows), 201