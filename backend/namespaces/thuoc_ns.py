from flask import request
from flask_restx import Resource, fields, Namespace
from db import run_query
from schemas.thuoc_schema import thuoc_schema, thuocs_schema
from extensions import api

ns = Namespace("thuoc", description="Quản lý thuốc")

ThuocModel = api.model("Thuoc", {
    "MaThuoc": fields.String(required=True, description="Mã thuốc (VD: T001)"),
    "TenThuoc": fields.String(required=True, description="Tên thuốc"),
    "MoTa": fields.String(required=False, description="Mô tả"),
    "DonViTinh": fields.String(required=True, description="Đơn vị tính"),
    "DonGia": fields.Integer(required=True, description="Đơn giá"),
})

@ns.route("")
class ThuocList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM Thuoc ORDER BY MaThuoc DESC")
        return thuocs_schema.dump(rows)

    @ns.expect(ThuocModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO Thuoc(MaThuoc, TenThuoc, MoTa, DonViTinh, DonGia)
            VALUES(%s, %s, %s, %s, %s)
        """
        params = (data["MaThuoc"], data["TenThuoc"], data.get("MoTa"),
                  data["DonViTinh"], data["DonGia"])
        run_query(sql, params)
        row = run_query("SELECT * FROM Thuoc WHERE MaThuoc=%s", (data["MaThuoc"],), fetch="one")
        return thuoc_schema.dump(row), 201

    @ns.expect(ThuocModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE Thuoc
            SET TenThuoc=%s, MoTa=%s, DonViTinh=%s, DonGia=%s
            WHERE MaThuoc=%s
        """
        params = (data["TenThuoc"], data.get("MoTa"),
                  data["DonViTinh"], data["DonGia"], data["MaThuoc"])
        run_query(sql, params)
        row = run_query("SELECT * FROM Thuoc WHERE MaThuoc=%s", (data["MaThuoc"],), fetch="one")
        return thuoc_schema.dump(row), 200

@ns.route("/<string:thuoc_id>")
class ThuocDetail(Resource):
    def get(self, thuoc_id):
        row = run_query("SELECT * FROM Thuoc WHERE MaThuoc=%s", (thuoc_id,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return thuoc_schema.dump(row), 200

    def delete(self, thuoc_id):
        run_query("DELETE FROM Thuoc WHERE MaThuoc=%s", (thuoc_id,))
        return {"message": f"Thuoc {thuoc_id} deleted successfully"}, 200
