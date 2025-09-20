from marshmallow import Schema, fields

class LieuDungSchema(Schema):
    MaDonThuoc = fields.String()
    MaThuoc = fields.String()
    SoLuong = fields.Integer()
    LieuDung = fields.String()

lieudung_schema = LieuDungSchema()
lieudungs_schema = LieuDungSchema(many=True)