from extensions import ma

class PatientSchema(ma.Schema):
    class Meta:
        fields = ("id", "full_name", "dob", "gender", "phone", "email",
                  "address", "primary_doctor_id", "created_at")
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)