from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.benhnhan_schema import benhnhan_schema, benhnhans_schema
from extensions import api

ns = Namespace("benh_nhan", description="Quản lý thông tin bệnh nhân")

# Model API cho BenhNhan
BenhNhanModel = api.model("BenhNhan", {
    "MaBN": fields.String(required=True, description="Mã bệnh nhân (VD: BN0001)"),
    "TenBN": fields.String(required=True, description="Tên bệnh nhân"),
    "GioiTinh": fields.String(required=True, description="Giới tính"),
    "NgaySinh": fields.String(required=True, description="Ngày sinh (YYYY-MM-DD)"),
    "DiaChi": fields.String(required=False, description="Địa chỉ"),
    "SDT": fields.String(required=False, description="Số điện thoại"),
})

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

@ns.route("")
class BenhNhanList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM BenhNhan ORDER BY MaBN DESC")
        return benhnhans_schema.dump(rows)

    @ns.expect(BenhNhanModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO BenhNhan(MaBN, TenBN, GioiTinh, NgaySinh, DiaChi, SDT)
            VALUES(%s, %s, %s, %s, %s, %s)
        """
        params = (data["MaBN"], data["TenBN"], data["GioiTinh"], data["NgaySinh"],
                  data.get("DiaChi"), data.get("SDT"))
        run_query(sql, params)
        row = run_query("SELECT * FROM BenhNhan WHERE MaBN=%s", (data["MaBN"],), fetch="one")
        return benhnhan_schema.dump(row), 201

    @ns.expect(BenhNhanModel)
    def put(self):
        """Cập nhật thông tin bệnh nhân"""
        data = request.json
        sql = """
            UPDATE BenhNhan 
            SET TenBN=%s, GioiTinh=%s, NgaySinh=%s, DiaChi=%s, SDT=%s
            WHERE MaBN=%s
        """
        params = (data["TenBN"], data["GioiTinh"], data["NgaySinh"],
                  data.get("DiaChi"), data.get("SDT"), data["MaBN"])
        run_query(sql, params)
        row = run_query("SELECT * FROM BenhNhan WHERE MaBN=%s", (data["MaBN"],), fetch="one")
        return benhnhan_schema.dump(row), 200

@ns.route("/<string:benh_nhan_id>")
class BenhNhanDetail(Resource):
    def get(self, benh_nhan_id):
        row = run_query("SELECT * FROM BenhNhan WHERE MaBN=%s", (benh_nhan_id,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return benhnhan_schema.dump(row), 200
    
    def delete(self, benh_nhan_id):
        """Xoá bệnh nhân"""
        run_query("DELETE FROM BenhNhan WHERE MaBN=%s", (benh_nhan_id,))
        return {"message": f"BenhNhan {benh_nhan_id} deleted successfully"}, 200
