from marshmallow import Schema, fields

class YTaSchema(Schema):
    MaYT = fields.String()
    TenYT = fields.String()
    GioiTinh = fields.String()
    BoPhan = fields.String()
    NamKinhNghiem = fields.Integer()
    HeSoLuong = fields.Float()

yta_schema = YTaSchema()
ytas_schema = YTaSchema(many=True)
