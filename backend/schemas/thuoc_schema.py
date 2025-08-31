from extensions import ma

class ThuocSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "unit_price", "unit", "created_at")

thuoc_schema = ThuocSchema()
thuocs_schema = ThuocSchema(many=True)