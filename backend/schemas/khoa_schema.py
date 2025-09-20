from marshmallow import Schema, fields

class KhoaSchema(Schema):
    MaKhoa = fields.String()
    TenKhoa = fields.String()
    MoTa = fields.String()

khoa_schema = KhoaSchema()
khoas_schema = KhoaSchema(many=True)
