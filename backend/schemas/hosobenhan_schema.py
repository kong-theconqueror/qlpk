from marshmallow import Schema, fields

class HoSoBenhAnSchema(Schema):
    MaBA = fields.String()
    TenBN = fields.String()
    TenBenh = fields.String()
    TenBS = fields.String()
    TrangThai = fields.String()
    ThoiGianMo = fields.DateTime()
    ThoiGianKetThuc = fields.DateTime()
    
hosobenhan_schema = HoSoBenhAnSchema()
hosobenhans_schema = HoSoBenhAnSchema(many=True)

