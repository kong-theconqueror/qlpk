from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.nurse_schema import nurse_schema, nurses_schema
from extensions import api

ns = Namespace("nurse", description="Quản lý y tá")

NurseModel = api.model("Nurse", {
    "id": fields.String(required=True, description="Mã y tá"),
    "full_name": fields.String(required=True, description="Họ và tên"),
    "gender": fields.String(required=True, description="Giới tính"),
    "years_of_experience": fields.Integer(required=True, description="Số năm kinh nghiệm"),
    "title": fields.String(required=True, description="Chức danh"),
    "salary_coefficient": fields.Float(required=True, description="Hệ số lương"),
    "specialty": fields.String(required=True, description="Chuyên khoa"),
})

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        if sql.strip().lower().startswith("select"):
            return cur.fetchone() if fetch == "one" else cur.fetchall()
        return {"rowcount": cur.rowcount}
    conn.close()

@ns.route("")
class NurseList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM nurse ORDER BY id DESC")
        return nurses_schema.dump(rows)

    @ns.expect(NurseModel)
    def post(self):
        data = request.json
        sql = """INSERT INTO nurse(id, full_name, gender, years_of_experience, title, salary_coefficient, specialty)
                 VALUES(%s,%s,%s,%s,%s,%s,%s)"""
        params = (data["id"], data["full_name"], data["gender"], data["years_of_experience"],
                  data["title"], data["salary_coefficient"], data["specialty"])
        run_query(sql, params)
        row = run_query("SELECT * FROM nurse WHERE id=%s", (data["id"],), fetch="one")
        return nurse_schema.dump(row), 201

    @ns.expect(NurseModel)
    def put(self):
        data = request.json
        sql = """UPDATE nurse SET full_name=%s, gender=%s, years_of_experience=%s,
                 title=%s, salary_coefficient=%s, specialty=%s WHERE id=%s"""
        params = (data["full_name"], data["gender"], data["years_of_experience"],
                  data["title"], data["salary_coefficient"], data["specialty"], data["id"])
        run_query(sql, params)
        row = run_query("SELECT * FROM nurse WHERE id=%s", (data["id"],), fetch="one")
        return nurse_schema.dump(row), 201

@ns.route("/<string:nurse_id>")
class NurseDetail(Resource):
    def get(self, nurse_id):
        row = run_query("SELECT * FROM nurse WHERE id=%s", (nurse_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return nurse_schema.dump(row)

    def delete(self, nurse_id):
        run_query("DELETE FROM nurse WHERE id=%s", (nurse_id,))
        return {"message": f"Nurse {nurse_id} deleted"}, 201
