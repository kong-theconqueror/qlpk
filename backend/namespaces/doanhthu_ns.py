# from flask import request
from flask_restx import Resource, Namespace
from db import get_conn
from schemas.doanhthu_schema import doanhthu_schema, doanhthus_schema

ns = Namespace('doanh_thu', description='API tính doanh thu')

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

@ns.route('/<int:year>')
class DoanhThuThang(Resource):
    def get(self, year):
        """
        Tính doanh thu hàng tháng
        Truyền tham số: nam=YYYY
        """
        if not year:
            return {"error": "Thiếu tham số ?nam=YYYY"}, 400
        
        sql = "CALL TinhDoanhThuNam(%s);"
        params = (year)
        rows = run_query(sql, params)

        return doanhthus_schema.dump(rows), 200
