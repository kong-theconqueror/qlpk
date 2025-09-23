from marshmallow import Schema, fields

class HoSoBenhAnSchema(Schema):
    MaBA = fields.String()
    MaBN = fields.String()
    TenBN = fields.String()
    MaBenh = fields.String()
    TenBenh = fields.String()
    MucDo = fields.String()
    MaBS = fields.String()
    TenBS = fields.String()
    TenKhoa = fields.String()
    TrangThai = fields.String()
    ThoiGianMo = fields.DateTime()
    ThoiGianKetThuc = fields.DateTime()
    
hosobenhan_schema = HoSoBenhAnSchema()
hosobenhans_schema = HoSoBenhAnSchema(many=True)

