from marshmallow import Schema, fields
# from extensions import ma

class LuongBacSySchema(Schema):
    MaBS = fields.Str()
    TenBS = fields.Str()
    HeSoLuong = fields.Float()
    LuongCoBan = fields.Int()
    ChuaKhoi = fields.Int()
    TongLuong = fields.Int()
        
luongbacsy_schema = LuongBacSySchema()
luongbacsys_schema = LuongBacSySchema(many=True)

class LuongYTaSchema(Schema):
    MaYT = fields.Str()
    TenYT = fields.Str()
    HeSoLuong = fields.Float()
    LuongCoBan = fields.Int()
    HoTro = fields.Int()
    TongLuong = fields.Int()
        
luongyta_schema = LuongYTaSchema()
luongytas_schema = LuongYTaSchema(many=True)