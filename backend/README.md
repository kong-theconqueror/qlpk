# eClinic-backend


# Install
install XAMPP
install NodeJS
install Python3

# Create environment
cd backend
python -m pip install virtualenv
python -m virtualenv .env
.env/Scripts/activate
pip install -r requirements.txt

# Create database
Open XAMPP
Start MySQL, PHP service
Access MySQL Admin
Create new db: clinic_db

# Import database
python init_db.py
python import_db.py

# Run backend
python server.py
