# from flask import request
from flask_restx import Resource, Namespace
from db import get_conn
from schemas.luong_schema import luongbacsys_schema, luongytas_schema

ns = Namespace('luong', description='API tính lương bác sỹ, y tá')

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params or ())
            if sql.strip().lower().startswith("select") or sql.strip().lower().startswith("call"):
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

        sql = "CALL TinhLuongBacSi(%s, %s)"

        params = (month, year)
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

        sql = "CALL TinhLuongYTa(%s, %s)"

        params = (month, year)
        rows = run_query(sql, params)

        return luongytas_schema.dump(rows), 200
