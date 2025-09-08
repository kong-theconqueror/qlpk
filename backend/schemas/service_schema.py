from marshmallow import Schema, fields

class ServiceSchema(Schema):
    id_dich_vu = fields.String()
    ten_dich_vu = fields.String()
    don_gia = fields.Float()
    mo_ta = fields.String()

service_schema = ServiceSchema()
services_schema = ServiceSchema(many=True)
