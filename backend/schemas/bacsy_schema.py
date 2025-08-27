from extensions import ma

class BacSySchema(ma.Schema):
    class Meta:
        fields = ("id", "full_name", "specialty", "phone", "email", "created_at")

bacsy_schema = BacSySchema()
bacsys_schema = BacSySchema(many=True)