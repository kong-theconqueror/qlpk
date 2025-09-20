from marshmallow import Schema, fields

class CoSoVatChatSchema(Schema):
    MaThietBi = fields.String()
    TenThietBi = fields.String()
    TrangThai = fields.String()

cosovatchat_schema = CoSoVatChatSchema()
cosovatchats_schema = CoSoVatChatSchema(many=True)
