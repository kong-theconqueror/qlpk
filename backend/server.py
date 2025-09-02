from app import create_app
from db import init_db, import_data
import config

if __name__ == '__main__':
    init_db()
    # import_data()

    app = create_app()
    app.run(host="0.0.0.0", port=config.PORT, debug=config.DEBUG)
    