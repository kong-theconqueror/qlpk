from marshmallow import Schema, fields

class PatientSchema(Schema):
    id = fields.String()
    full_name = fields.String()
    birth = fields.Date()
    gender = fields.String()
    phone_num = fields.String()
    address = fields.String()
        
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)