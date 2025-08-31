from flask import Flask, render_template
from extensions import api, ma
from namespaces.bacsy_ns import ns as doctor_ns
# from resources.patient_resource import ns as patient_ns
# from resources.medicine_resource import ns as medicine_ns

def create_app():
    app = Flask(__name__, 
        static_folder='./static')
    ma.init_app(app)
    # api.init_app(app)

    # Register namespaces
    api.add_namespace(doctor_ns)
    # api.add_namespace(patient_ns)
    # api.add_namespace(medicine_ns)

    @app.route("/")
    def index():
        return {"service": "Clinic API", "docs": "/docs"}
    
    return app
