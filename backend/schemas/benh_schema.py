from marshmallow import Schema, fields

class BenhSchema(Schema):
    MaBenh = fields.String()
    TenBenh = fields.String()
    MoTa = fields.String()

benh_schema = BenhSchema()
benhs_schema = BenhSchema(many=True)
