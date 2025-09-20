from marshmallow import Schema, fields

class ThuocSchema(Schema):
    MaThuoc = fields.String()
    TenThuoc = fields.String()
    MoTa = fields.String()
    DonViTinh = fields.String()
    DonGia = fields.Integer()

thuoc_schema = ThuocSchema()
thuocs_schema = ThuocSchema(many=True)