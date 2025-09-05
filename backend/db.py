import os
import csv
from datetime import datetime
import pymysql
from pymysql.cursors import DictCursor
from config import DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME

def get_conn():
    return pymysql.connect(
        host=DB_HOST, port=DB_PORT,
        user=DB_USER, password=DB_PASSWORD,
        database=DB_NAME, cursorclass=DictCursor,
        autocommit=True, charset="utf8mb4"
    )

def init_db():
    conn = get_conn()
    with conn.cursor() as cur:
        # Doctor
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Doctor (
                id VARCHAR(10) PRIMARY KEY,              -- VD: BS0001
                full_name VARCHAR(255) NOT NULL,         -- Họ tên
                gender ENUM('Nam','Nữ','Khác') NOT NULL, -- Giới tính
                room VARCHAR(50),                        -- Phòng
                years_of_experience INT DEFAULT 0,       -- Số năm kinh nghiệm
                title VARCHAR(255),                      -- Chức danh (Bác sĩ, Bác sĩ chính, ...)
                salary_coefficient DECIMAL(5,2) DEFAULT 1.00, -- Hệ số lương
                specialty VARCHAR(100),                  -- Chuyên khoa
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Nurse
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Nurse (
                id VARCHAR(20) PRIMARY KEY,                   -- Mã y tá
                full_name VARCHAR(255) NOT NULL,              -- Họ tên
                gender ENUM('Nam','Nữ') NOT NULL,             -- Giới tính
                years_of_experience INT NOT NULL,             -- Số năm kinh nghiệm
                title VARCHAR(100) NOT NULL,                  -- Chức danh (Y tá, Y tá chính,...)
                salary_coefficient DECIMAL(5,2) NOT NULL,     -- Hệ số lương
                specialty VARCHAR(50) NOT NULL,               -- Mã khoa chuyên môn (FK -> khoa.ma_khoa)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Patient
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Patient (
                id VARCHAR(20) PRIMARY KEY,               -- Mã bệnh nhân
                full_name VARCHAR(255) NOT NULL,          -- Họ và tên
                birth DATE NOT NULL,                      -- Ngày sinh
                gender ENUM('Nam','Nữ') NOT NULL,         -- Giới tính
                phone_num VARCHAR(20),                    -- Số điện thoại
                address VARCHAR(255),                     -- Địa chỉ
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Medicine
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Medicine (
                id VARCHAR(10) PRIMARY KEY,           -- VD: TH001
                name VARCHAR(255) NOT NULL,           -- Tên thuốc
                description VARCHAR(500),             -- Công dụng
                unit_price DECIMAL(12,2) DEFAULT 0,   -- Giá theo đơn vị
                unit VARCHAR(50),                     -- Đơn vị (viên, ống, ml...)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Disease
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Disease (
                id_benh INT PRIMARY KEY,                   -- Mã bệnh (số nguyên)
                ten_benh VARCHAR(255) NOT NULL,            -- Tên bệnh
                mo_ta VARCHAR(500),                        -- Mô tả
                ma_khoa VARCHAR(50) NOT NULL,              -- Mã khoa (liên kết với bảng khoa nếu có)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) 
        """)

        # Department
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Department (
                ma_khoa VARCHAR(20) PRIMARY KEY,               -- Mã khoa (VD: KH-NI)
                ten_khoa VARCHAR(255) NOT NULL,                -- Tên khoa
                mo_ta VARCHAR(500),                            -- Mô tả
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Equipment 
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Equipment (
                id_thiet_bi INT PRIMARY KEY,                        -- Mã thiết bị
                ten_thiet_bi VARCHAR(255) NOT NULL,                 -- Tên thiết bị
                chi_phi_su_dung DECIMAL(15,2) NOT NULL,             -- Chi phí sử dụng (VNĐ)
                trang_thai ENUM('Sẵn sàng','Đang sử dụng','Bảo trì') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Service 
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Service (
                id_dich_vu INT PRIMARY KEY AUTO_INCREMENT,    -- Mã dịch vụ
                ten_dich_vu VARCHAR(255) NOT NULL,            -- Tên dịch vụ
                don_gia DECIMAL(15,2) NOT NULL,               -- Đơn giá
                mo_ta TEXT,                                   -- Mô tả dịch vụ
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

    conn.close()


def import_data():
    current_directory = os.getcwd()
    print(current_directory)
    import_doctors(os.path.join(current_directory, 'data','bac si.csv'))
    import_nurses(os.path.join(current_directory, 'data','y ta.csv'))
    import_medicines(os.path.join(current_directory, 'data','thuoc.csv'))
    import_equipments(os.path.join(current_directory, 'data','thiet_bi.csv'))
    import_diseases(os.path.join(current_directory, 'data','benh.csv'))
    import_departments(os.path.join(current_directory, 'data','khoa_chua_benh.csv'))
    import_services(os.path.join(current_directory, 'data','dich_vu.csv'))
    import_patients(os.path.join(current_directory, 'data','benh_nhan.csv'))

# Import doctor to DB
def import_doctors(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Chuẩn bị dữ liệu
            data = (
                row["id"],
                row["full_name"],
                row["gender"],
                row["room"],
                int(row["years_of_experience"]) if row["years_of_experience"] else 0,
                row["title"],
                float(row["salary_coefficient"]) if row["salary_coefficient"] else 1.0,
                row["specialty"]
            )
            # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO doctor(id, full_name, gender, room, years_of_experience, title, salary_coefficient, specialty)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s)
                ON DUPLICATE KEY UPDATE
                    full_name=VALUES(full_name),
                    gender=VALUES(gender),
                    room=VALUES(room),
                    years_of_experience=VALUES(years_of_experience),
                    title=VALUES(title),
                    salary_coefficient=VALUES(salary_coefficient),
                    specialty=VALUES(specialty)
            """
            cur.execute(sql, data)
            print(f"Imported doctor {row['id']} - {row['full_name']}")
    conn.close()

# Import nurse to DB
def import_nurses(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Chuẩn bị dữ liệu
            data = (
                row['id'],
                row['full_name'],
                row['gender'],
                row['years_of_experience'],
                row['title'],
                row['Salary coefficient'],
                row['specialty']
            )
            # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO nurse (id, full_name, gender, years_of_experience, title, salary_coefficient, specialty)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    full_name = VALUES(full_name),
                    gender = VALUES(gender),
                    years_of_experience = VALUES(years_of_experience),
                    title = VALUES(title),
                    salary_coefficient = VALUES(salary_coefficient),
                    specialty = VALUES(specialty)
            """
            cur.execute(sql, data)
            print(f"Imported nurse {row['id']} - {row['full_name']}")
    conn.close()

# Import medicine to DB
def import_medicines(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row["id"],
                row["name"],
                row["description"],
                float(row["unit_price"]) if row["unit_price"] else 0,
                row["unit"]
            )
            sql = """
                INSERT INTO medicine(id, name, description, unit_price, unit)
                VALUES(%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    name=VALUES(name),
                    description=VALUES(description),
                    unit_price=VALUES(unit_price),
                    unit=VALUES(unit)
            """
            cur.execute(sql, data)
            print(f"Imported medicine {row['id']} - {row['name']}")
    conn.close()

# Import equipment to DB
def import_equipments(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['id_thiet_bi'],
                row['ten_thiet_bi'],
                row['chi_phi_su_dung'],
                row['trang_thai']
            )
            sql = """
                INSERT INTO equipment (id_thiet_bi, ten_thiet_bi, chi_phi_su_dung, trang_thai)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    ten_thiet_bi = VALUES(ten_thiet_bi),
                    chi_phi_su_dung = VALUES(chi_phi_su_dung),
                    trang_thai = VALUES(trang_thai)
            """
            cur.execute(sql, data)
            print(f"Imported equipment {row['id_thiet_bi']} - {row['ten_thiet_bi']}")
    conn.close()

# Import disease to DB
def import_diseases(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['id_benh'],
                row['ten_benh'],
                row['mo_ta'],
                row['ma_khoa']
            )
            sql = """
                INSERT INTO disease (id_benh, ten_benh, mo_ta, ma_khoa)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    ten_benh = VALUES(ten_benh),
                    mo_ta = VALUES(mo_ta),
                    ma_khoa = VALUES(ma_khoa)
            """
            cur.execute(sql, data)
            print(f"Imported disease {row['id_benh']} - {row['ten_benh']}")
    conn.close()

# Import department to DB
def import_departments(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['ma_khoa'],
                row['ten_khoa'],
                row['mo_ta']
            )
            sql = """
                INSERT INTO department (ma_khoa, ten_khoa, mo_ta)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    ten_khoa = VALUES(ten_khoa),
                    mo_ta = VALUES(mo_ta)
            """
            cur.execute(sql, data)
            print(f"Imported department {row['ma_khoa']} - {row['ten_khoa']}")
    conn.close()

# Import service to DB
def import_services(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['id_dich_vu'],
                row['ten_dich_vu'],
                row['don_gia'],
                row['mo_ta']
            )
            sql = """
                INSERT INTO service (id_dich_vu, ten_dich_vu, don_gia, mo_ta)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    ten_dich_vu = VALUES(ten_dich_vu),
                    don_gia = VALUES(don_gia),
                    mo_ta = VALUES(mo_ta)
            """
            cur.execute(sql, data)
            print(f"Imported service {row['id_dich_vu']} - {row['ten_dich_vu']}")
    conn.close()

# Import patient to DB
def import_patients(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            birth_date = datetime.strptime(row['birth'], "%d/%m/%Y").date()
            data = (
                row['id'],
                row['full_name'],
                birth_date,
                row['gender'],
                row['phone_num'],
                row['address']
            )
            sql = """
                INSERT INTO patient (id, full_name, birth, gender, phone_num, address)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    full_name = VALUES(full_name),
                    birth = VALUES(birth),
                    gender = VALUES(gender),
                    phone_num = VALUES(phone_num),
                    address = VALUES(address)
            """
            cur.execute(sql, data)
            print(f"Imported patient {row['id']} - {row['full_name']}")
    conn.close()

