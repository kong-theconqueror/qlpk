from marshmallow import Schema, fields

class ThietBiYTeSchema(Schema):
    MaThietBi = fields.String()
    TenThietBi = fields.String()
    DonViTinh = fields.String()
    DonGia = fields.Int()

thietbiyte_schema = ThietBiYTeSchema()
thietbiytes_schema = ThietBiYTeSchema(many=True)
