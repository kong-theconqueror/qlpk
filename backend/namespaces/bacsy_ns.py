from flask import request
from flask_restx import Resource, fields, Namespace
from db import get_conn
from schemas.bacsy_schema import bacsy_schema, bacsys_schema
from extensions import api

ns = Namespace("BacSy", description="Quản lý bác sĩ")

DoctorModel = api.model("Doctor", {
    "full_name": fields.String(required=True),
    "specialty": fields.String(),
    "phone": fields.String(),
    "email": fields.String()
})

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        if sql.strip().lower().startswith("select"):
            return cur.fetchone() if fetch == "one" else cur.fetchall()
        return {"rowcount": cur.rowcount, "last_id": cur.lastrowid}
    conn.close()

@ns.route("")
class DoctorList(Resource):
    def get(self):
        rows = run_query("SELECT * FROM BacSy ORDER BY id DESC")
        return bacsys_schema.dump(rows)

    @ns.expect(DoctorModel)
    def post(self):
        data = request.json
        res = run_query("INSERT INTO BacSy(full_name, specialty, phone, email) VALUES (%s,%s,%s,%s)",
                        (data["full_name"], data.get("specialty"), data.get("phone"), data.get("email")))
        row = run_query("SELECT * FROM BacSy WHERE id=%s", (res["last_id"],), fetch="one")
        return bacsy_schema.dump(row), 201

@ns.route("/<int:doctor_id>")
class DoctorDetail(Resource):
    def get(self, doctor_id):
        row = run_query("SELECT * FROM BacSy WHERE id=%s", (doctor_id,), fetch="one")
        if not row: return {"error": "not found"}, 404
        return bacsy_schema.dump(row)