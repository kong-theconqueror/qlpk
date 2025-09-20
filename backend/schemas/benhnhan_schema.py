from marshmallow import Schema, fields

class BenhNhanSchema(Schema):
    MaBN = fields.String()
    TenBN = fields.String()
    GioiTinh = fields.String()
    NgaySinh = fields.Date()
    DiaChi = fields.String()
    SDT = fields.String()

benhnhan_schema = BenhNhanSchema()
benhnhans_schema = BenhNhanSchema(many=True)
