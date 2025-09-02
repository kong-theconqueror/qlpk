from marshmallow import Schema, fields
# from extensions import ma

class DoctorSchema(Schema):
    id = fields.Str()
    full_name = fields.Str()
    gender = fields.Str()
    room = fields.Str()
    years_of_experience = fields.Int()
    title = fields.Str()
    salary_coefficient = fields.Float()   # ép sang float
    specialty = fields.Str()

    class Meta:
        fields = (
            "id", "full_name", "gender", "room",
            "years_of_experience", "title",
            "salary_coefficient", "specialty", "created_at"
        )
        
doctor_schema = DoctorSchema()
doctors_schema = DoctorSchema(many=True)