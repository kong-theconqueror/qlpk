from marshmallow import Schema, fields

class ChuaBenhSchema(Schema):
    MaCB = fields.String()
    MaBN = fields.String()
    TenBN = fields.String()
    MaBS = fields.String()
    TenBS = fields.String()
    MaKhoa = fields.String()
    TenKhoa = fields.String()
    MaBenh = fields.String()
    TenBenh = fields.String()
    HinhThucChuaBenh = fields.String()
    ThoiGian = fields.DateTime()

chuabenh_schema = ChuaBenhSchema()
chuabenhs_schema = ChuaBenhSchema(many=True)

class ChiTietChuaBenhSchema(Schema):
    MaCB = fields.String()
    ThoiGian = fields.DateTime()
    YTaThamGia = fields.String()
    DichVuSuDung = fields.String()
    ThietBiSuDung = fields.String()
    ThuocSuDung = fields.String()

chitietchuabenh_schema = ChiTietChuaBenhSchema()
chitietchuabenhs_schema = ChiTietChuaBenhSchema(many=True)
