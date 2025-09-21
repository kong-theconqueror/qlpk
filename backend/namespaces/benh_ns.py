from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.benh_schema import benh_schema, benhs_schema, thongkebenhs_schema
from extensions import api

ns = Namespace("benh", description="Quản lý thông tin bệnh")

# Model API cho Benh
BenhModel = api.model("Benh", {
    "MaBenh": fields.String(required=True, description="Mã bệnh"),
    "TenBenh": fields.String(required=True, description="Tên bệnh"),
    "MoTa": fields.String(required=False, description="Mô tả bệnh"),
})

@ns.route("")
class BenhList(Resource):
    def get(self):
        rows = run_query("""
            SELECT MaBenh, TenBenh, MoTa
            FROM Benh
            ORDER BY MaBenh DESC
        """)
        return benhs_schema.dump(rows)

    @ns.expect(BenhModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO Benh(MaBenh, TenBenh, MoTa)
            VALUES(%s, %s, %s)
        """
        params = (data["MaBenh"], data["TenBenh"], data.get("MoTa"))
        run_query(sql, params)
        row = run_query("SELECT * FROM Benh WHERE MaBenh=%s", (data["MaBenh"],), fetch="one")
        return benh_schema.dump(row), 201

    @ns.expect(BenhModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE Benh
            SET TenBenh=%s, MoTa=%s
            WHERE MaBenh=%s
        """
        params = (data["TenBenh"], data.get("MoTa"), data["MaBenh"])
        run_query(sql, params)
        row = run_query("SELECT * FROM Benh WHERE MaBenh=%s", (data["MaBenh"],), fetch="one")
        return benh_schema.dump(row), 200

@ns.route("/<string:ma_benh>")
class BenhDetail(Resource):
    def get(self, ma_benh):
        row = run_query("SELECT * FROM Benh WHERE MaBenh=%s", (ma_benh,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return benh_schema.dump(row), 200
    
    def delete(self, ma_benh):
        run_query("DELETE FROM Benh WHERE MaBenh=%s", (ma_benh,))
        return {"message": f"Benh {ma_benh} deleted successfully"}, 200

@ns.route("/thong_ke/<int:month>/<int:year>")
class BenhStatistic(Resource):
    def get(self, month, year):
        sql = "CALL ThongKeBenh(%s, %s)"
        params =  (month, year)
        rows = run_query(sql, params)
        return thongkebenhs_schema.dump(rows), 200
