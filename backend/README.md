# eClinic-backend

# Create environment
cd backend
python -m pip install virtualenv
python -m virtualenv .env
.env/Scripts/active
pip install -r requirements.txt

# Import database
python import_db.py

# Run backend
python server.py