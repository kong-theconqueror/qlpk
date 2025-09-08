from marshmallow import Schema, fields

class DepartmentSchema(Schema):
    ma_khoa = fields.String()
    ten_khoa = fields.String()
    mo_ta = fields.String()

department_schema = DepartmentSchema()
departments_schema = DepartmentSchema(many=True)
