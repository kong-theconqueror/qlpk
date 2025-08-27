from flask_restx import Api
from flask_marshmallow import Marshmallow

api = Api(
    version="1.0",
    title="Clinic Management API",
    description="API quản lý bác sĩ, bệnh nhân, thuốc",
    doc="/docs"
)
ma = Marshmallow()