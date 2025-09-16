from marshmallow import Schema, fields

class DiseaseSchema(Schema):
    id_benh = fields.String()
    ten_benh = fields.String()
    mo_ta = fields.String()
    ten_khoa = fields.String()

disease_schema = DiseaseSchema()
diseases_schema = DiseaseSchema(many=True)
