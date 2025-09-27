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

class ChiTietKhamBenhSchema(Schema):
    MaKB = fields.String()
    MaBN = fields.String()
    TenBN = fields.String()
    MaBS = fields.String()
    TenBS = fields.String()
    MaBenh = fields.String()
    TenBenh = fields.String()
    ThoiGian = fields.DateTime()
    SoLanChuaBenhDuDoan = fields.String()
    YTaThamGia = fields.String()
    DichVuSuDung = fields.String()
    ThietBiSuDung = fields.String()

chitietkhambenh_schema = ChiTietKhamBenhSchema()
chitietkhambenhs_schema = ChiTietKhamBenhSchema(many=True)
