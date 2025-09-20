from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.cosovatchat_schema import cosovatchat_schema, cosovatchats_schema
from extensions import api

ns = Namespace("co_so_vat_chat", description="Quản lý thông tin cơ sở vật chất")

# Model API cho CoSoVatChat
CoSoVatChatModel = api.model("CoSoVatChat", {
    "MaThietBi": fields.String(required=True, description="Mã thiết bị"),
    "TenThietBi": fields.String(required=True, description="Tên thiết bị"),
    "TrangThai": fields.String(required=True, description="Trạng thái sử dụng"),
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
class CoSoVatChatList(Resource):
    def get(self):
        rows = run_query("""
            SELECT MaThietBi, TenThietBi, TrangThai
            FROM CoSoVatChat
            ORDER BY MaThietBi DESC
        """)
        return cosovatchats_schema.dump(rows)

    @ns.expect(CoSoVatChatModel)
    def post(self):
        data = request.json
        sql = """
            INSERT INTO CoSoVatChat(MaThietBi, TenThietBi, TrangThai)
            VALUES(%s, %s, %s)
        """
        params = (data["MaThietBi"], data["TenThietBi"], data["TrangThai"])
        run_query(sql, params)
        row = run_query("SELECT * FROM CoSoVatChat WHERE MaThietBi=%s", (data["MaThietBi"],), fetch="one")
        return cosovatchat_schema.dump(row), 201

    @ns.expect(CoSoVatChatModel)
    def put(self):
        data = request.json
        sql = """
            UPDATE CoSoVatChat
            SET TenThietBi=%s, TrangThai=%s
            WHERE MaThietBi=%s
        """
        params = (data["TenThietBi"], data["TrangThai"], data["MaThietBi"])
        run_query(sql, params)
        row = run_query("SELECT * FROM CoSoVatChat WHERE MaThietBi=%s", (data["MaThietBi"],), fetch="one")
        return cosovatchat_schema.dump(row), 200

@ns.route("/<string:ma_tb>")
class CoSoVatChatDetail(Resource):
    def get(self, ma_tb):
        row = run_query("SELECT * FROM CoSoVatChat WHERE MaThietBi=%s", (ma_tb,), fetch="one")
        if not row:
            return {"error": "not found"}, 404
        return cosovatchat_schema.dump(row), 200
    
    def delete(self, ma_tb):
        run_query("DELETE FROM CoSoVatChat WHERE MaThietBi=%s", (ma_tb,))
        return {"message": f"CoSoVatChat {ma_tb} deleted successfully"}, 200
