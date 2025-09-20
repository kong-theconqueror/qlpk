from marshmallow import Schema, fields

class DoanhThuSchema(Schema):
    Thang = fields.Str()
    DoanhThu_DichVuKB = fields.Int()
    DoanhThu_ThietBiKB = fields.Int()
    DoanhThu_DichVuCB = fields.Int()
    DoanhThu_ThietBiCB = fields.Int()
    DoanhThu_Thuoc = fields.Int()
    TongDoanhThu = fields.Int()
        
doanhthu_schema = DoanhThuSchema()
doanhthus_schema = DoanhThuSchema(many=True)