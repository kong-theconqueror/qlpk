from marshmallow import Schema, fields

class DichVuSchema(Schema):
    MaDichVu = fields.String()
    TenDichVu = fields.String()
    MoTa = fields.String()
    MaThietBi = fields.String()
    DonGia = fields.Integer()

dichvu_schema = DichVuSchema()
dichvus_schema = DichVuSchema(many=True)
