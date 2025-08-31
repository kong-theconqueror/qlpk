from extensions import ma

class BacSySchema(ma.Schema):
    class Meta:
        fields = (
            "id", "full_name", "gender", "room",
            "years_of_experience", "title",
            "salary_coefficient", "specialty", "created_at"
        )
        
bacsy_schema = BacSySchema()
bacsys_schema = BacSySchema(many=True)