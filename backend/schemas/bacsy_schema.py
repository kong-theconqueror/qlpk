from marshmallow import Schema, fields
# from extensions import ma

class BacSySchema(Schema):
    MaBS = fields.Str()
    TenBS = fields.Str()
    GioiTinh = fields.Str()
    PhongKham = fields.Str()
    NamKinhNghiem = fields.Int()
    HeSoLuong = fields.Float()   # ép sang float
    TenKhoa = fields.Str()
        
bacsy_schema = BacSySchema()
bacsys_schema = BacSySchema(many=True)