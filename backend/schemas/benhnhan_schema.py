from extensions import ma

class BenhNhanSchema(ma.Schema):
    class Meta:
        fields = ("id", "full_name", "dob", "gender", "phone", "email",
                  "address", "primary_doctor_id", "created_at")
benhnhan_schema = BenhNhanSchema()
benhnhans_schema = BenhNhanSchema(many=True)