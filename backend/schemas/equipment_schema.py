from marshmallow import Schema, fields

class EquipmentSchema(Schema):
    id_thiet_bi = fields.String()
    ten_thiet_bi = fields.String()
    chi_phi_su_dung = fields.Float()
    trang_thai = fields.String()

equipment_schema = EquipmentSchema()
equipments_schema = EquipmentSchema(many=True)
