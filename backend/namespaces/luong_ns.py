# from flask import request
from flask_restx import Resource, Namespace
from db import run_query
from schemas.luong_schema import luongbacsys_schema, luongytas_schema

ns = Namespace('luong', description='API tính lương bác sỹ, y tá')


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
