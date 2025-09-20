# from flask import request
from flask_restx import Resource, Namespace
from db import get_conn
from schemas.luong_schema import luongbacsys_schema, luongytas_schema
from extensions import api

ns = Namespace('luong', description='API tính lương bác sỹ, y tá')

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

@ns.route('/bac_sy/<int:month>/<int:year>')
class LuongBacSyThang(Resource):
    def get(self, month, year):
        """
        Tính lương bác sỹ theo tháng/năm
        Truyền tham số: nam=YYYY, thang=MM
        """
        if not year or not month:
            return {"error": "Thiếu tham số ?nam=YYYY&thang=MM"}, 400

        sql = """
            SELECT 
                b.MaBS,
                b.TenBS,
                %s AS Nam,
                %s AS Thang,
                b.HeSoLuong,
                2340000 AS LuongCoBan,
                COALESCE(COUNT(h.MaBA), 0) AS ChuaKhoi,
                b.HeSoLuong * 2340000 + COALESCE(COUNT(h.MaBA), 0) * 1000000 AS TongLuong
            FROM BacSy b
            LEFT JOIN HoSoBenhAn h 
                   ON b.MaBS = h.MaBS 
                  AND h.ThoiGianKetThuc IS NOT NULL
                  AND YEAR(h.ThoiGianKetThuc) = %s
                  AND MONTH(h.ThoiGianKetThuc) = %s
            GROUP BY b.MaBS, b.TenBS, b.HeSoLuong
            ORDER BY TongLuong DESC;
        """

        params = (year, month, year, month)
        rows = run_query(sql, params)

        return luongbacsys_schema.dump(rows), 200

@ns.route('/y_ta/<int:month>/<int:year>')
class LuongYTaThang(Resource):
    def get(self, month, year):
        """
        Tính lương bác sỹ theo tháng/năm
        Truyền tham số: nam=YYYY, thang=MM
        """
        if not year or not month:
            return {"error": "Thiếu tham số ?nam=YYYY&thang=MM"}, 400

        sql = """
            SELECT 
                yt.MaYT,
                yt.TenYT,
                yt.HeSoLuong,
                2340000 AS LuongCoBan,
                COALESCE(pc.SoLanHoTro, 0) AS HoTro,
                yt.HeSoLuong * 2340000 + COALESCE(pc.SoLanHoTro, 0) * 200000 AS TongLuong
            FROM YTa yt
            LEFT JOIN (
                SELECT MaYT, COUNT(*) AS SoLanHoTro
                FROM (
                    -- hỗ trợ khám bệnh
                    SELECT pkb.MaYT, kb.ThoiGian
                    FROM PhanCongKB pkb
                    JOIN KhamBenh kb ON pkb.MaKB = kb.MaKB
                    WHERE MONTH(kb.ThoiGian) = %s AND YEAR(kb.ThoiGian) = %s
                    UNION ALL
                    -- hỗ trợ chữa bệnh
                    SELECT pcb.MaYT, cb.ThoiGian
                    FROM PhanCongCB pcb
                    JOIN ChuaBenh cb ON pcb.MaCB = cb.MaCB
                    WHERE MONTH(cb.ThoiGian) = %s AND YEAR(cb.ThoiGian) = %s
                ) AS tmp
                GROUP BY MaYT
            ) pc ON yt.MaYT = pc.MaYT
            ORDER BY TongLuong DESC;
        """

        params = (year, month, year, month)
        rows = run_query(sql, params)

        return luongytas_schema.dump(rows), 200
