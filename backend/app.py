from flask import Flask
from flask_cors import CORS
from extensions import api, ma
from namespaces.doctor_ns import ns as doctor_ns
from namespaces.patient_ns import ns as patient_ns
from namespaces.medicine_ns import ns as medicine_ns
from namespaces.nurse_ns import ns as nurse_ns
from namespaces.department_ns import ns as department_ns
from namespaces.service_ns import ns as service_ns
from namespaces.disease_ns import ns as disease_ns
from namespaces.equipment_ns import ns as equipment_ns

def create_app():
    app = Flask(__name__)
    CORS(app)
    ma.init_app(app)
    api.init_app(app)

    # Register namespaces
    api.add_namespace(doctor_ns)
    api.add_namespace(patient_ns)
    api.add_namespace(medicine_ns)
    api.add_namespace(nurse_ns)
    api.add_namespace(department_ns)
    api.add_namespace(service_ns)
    api.add_namespace(disease_ns)
    api.add_namespace(equipment_ns)

    @app.route("/")
    def index():
        return {"service": "Clinic API", "docs": "/docs"}
    
    return app
