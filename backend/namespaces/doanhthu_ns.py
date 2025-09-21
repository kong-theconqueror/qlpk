# from flask import request
from flask_restx import Resource, Namespace
from db import run_query
from schemas.doanhthu_schema import doanhthu_schema, doanhthus_schema

ns = Namespace('doanh_thu', description='API tính doanh thu')

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
