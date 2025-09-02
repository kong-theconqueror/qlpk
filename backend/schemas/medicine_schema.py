from extensions import ma

class MedicineSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "unit_price", "unit", "created_at")

medicine_schema = MedicineSchema()
medicines_schema = MedicineSchema(many=True)