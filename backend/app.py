from flask import Flask
from flask_cors import CORS
from extensions import api, ma

from namespaces.khambenh_ns import ns as khambenh_ns
from namespaces.chuabenh_ns import ns as chuabenh_ns
from namespaces.hosobenhan_ns import ns as hosobenhan_ns

from namespaces.luong_ns import ns as luong_ns
from namespaces.doanhthu_ns import ns as doanhthu_ns

from namespaces.bacsy_ns import ns as bacsy_ns
from namespaces.benhnhan_ns import ns as benhnhan_ns
from namespaces.thuoc_ns import ns as thuoc_ns
from namespaces.yta_ns import ns as yta_ns
from namespaces.khoa_ns import ns as khoa_ns
from namespaces.dichvu_ns import ns as dichvu_ns
from namespaces.benh_ns import ns as benh_ns
from namespaces.thietbiyte_ns import ns as cosovatchat_ns

def create_app():
    app = Flask(__name__)
    CORS(app)
    ma.init_app(app)
    api.init_app(app)

    # Register namespaces
    api.add_namespace(khambenh_ns)
    api.add_namespace(chuabenh_ns)
    api.add_namespace(benhnhan_ns)
    api.add_namespace(hosobenhan_ns)

    api.add_namespace(luong_ns)
    api.add_namespace(doanhthu_ns)

    api.add_namespace(bacsy_ns)
    api.add_namespace(thuoc_ns)
    api.add_namespace(yta_ns)
    api.add_namespace(khoa_ns)
    api.add_namespace(dichvu_ns)
    api.add_namespace(benh_ns)
    api.add_namespace(cosovatchat_ns)

    @app.route("/")
    def index():
        return {"service": "Clinic API", "docs": "/docs"}
    
    return app
