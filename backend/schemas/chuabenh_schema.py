from marshmallow import Schema, fields

class ChuaBenhSchema(Schema):
    MaCB = fields.String()
    MaBenh = fields.String()
    TenBenh = fields.String()
    HinhThucChuaBenh = fields.String()
    ThoiGian = fields.DateTime()

chuabenh_schema = ChuaBenhSchema()
chuabenhs_schema = ChuaBenhSchema(many=True)
