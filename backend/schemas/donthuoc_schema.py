from marshmallow import Schema, fields

class DonThuocSchema(Schema):
    MaDonThuoc = fields.String()
    MaCB = fields.String()
    NgayLapDon = fields.DateTime()

donthuoc_schema = DonThuocSchema()
donthuocs_schema = DonThuocSchema(many=True)