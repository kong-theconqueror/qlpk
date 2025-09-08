from marshmallow import Schema, fields

class MedicineSchema(Schema):
    id = fields.String()
    name = fields.String()
    description = fields.String()
    unit_price = fields.Integer()
    unit = fields.String()
    
medicine_schema = MedicineSchema()
medicines_schema = MedicineSchema(many=True)