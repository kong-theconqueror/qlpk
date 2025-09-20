from marshmallow import Schema, fields

class KhamBenhSchema(Schema):
    MaKB = fields.String()
    MaBN = fields.String()
    TenBN = fields.String()
    MaBS = fields.String()
    TenBS = fields.String()
    TenKhoa = fields.String()
    ThoiGian = fields.DateTime()

khambenh_schema = KhamBenhSchema()
khambenhs_schema = KhamBenhSchema(many=True)
