from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.khoa_schema import khoa_schema, khoas_schema
from extensions import api

ns = Namespace("khoa", description="Quản lý khoa")

KhoaModel = api.model("Khoa", {
    "MaKhoa": fields.String(required=True, description="Mã khoa (VD: K001)"),
    "TenKhoa": fields.String(required=True, description="Tên khoa"),
    "MoTa": fields.String(required=False, description="Mô tả"),
})

@ns.route("")
class KhoaList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM Khoa ORDER BY MaKhoa DESC")
        return khoas_schema.dump(rows)

    @ns.expect(KhoaModel)
    def post(self):
        data = request.json
        sql = "INSERT INTO Khoa(MaKhoa, TenKhoa, MoTa) VALUES(%s, %s, %s)"
        params = (data["MaKhoa"], data["TenKhoa"], data.get("MoTa"))
        run_query(sql, params)
        row = run_query("SELECT * FROM Khoa WHERE MaKhoa=%s", (data["MaKhoa"],), fetch="one")
        return khoa_schema.dump(row), 201

    @ns.expect(KhoaModel)
    def put(self):
        data = request.json
        sql = "UPDATE Khoa SET TenKhoa=%s, MoTa=%s WHERE MaKhoa=%s"
        params = (data["TenKhoa"], data.get("MoTa"), data["MaKhoa"])
        run_query(sql, params)
        row = run_query("SELECT * FROM Khoa WHERE MaKhoa=%s", (data["MaKhoa"],), fetch="one")
        return khoa_schema.dump(row), 200

@ns.route("/<string:khoa_id>")
class KhoaDetail(Resource):
    def get(self, khoa_id):
        row = run_query("SELECT * FROM Khoa WHERE MaKhoa=%s", (khoa_id,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return khoa_schema.dump(row), 200

    def delete(self, khoa_id):
        run_query("DELETE FROM Khoa WHERE MaKhoa=%s", (khoa_id,))
        return {"message": f"Khoa {khoa_id} deleted successfully"}, 200
