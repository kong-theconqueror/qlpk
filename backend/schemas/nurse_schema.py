from marshmallow import Schema, fields

class NurseSchema(Schema):
    id = fields.String()
    full_name = fields.String()
    gender = fields.String()
    room = fields.String()
    years_of_experience = fields.Integer()
    title = fields.String()
    salary_coefficient = fields.Float()
    specialty = fields.String()

nurse_schema = NurseSchema()
nurses_schema = NurseSchema(many=True)
