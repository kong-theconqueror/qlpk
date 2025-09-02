import os
import csv
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
        # cur.execute("""
        #     CREATE TABLE IF NOT EXISTS BenhNhan (
        #         id INT AUTO_INCREMENT PRIMARY KEY,
        #         full_name VARCHAR(255) NOT NULL,
        #         dob DATE, gender ENUM('male','female','other'),
        #         phone VARCHAR(50), email VARCHAR(255), address VARCHAR(500),
        #         primary_doctor_id INT,
        #         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        #         FOREIGN KEY (primary_doctor_id) REFERENCES BacSy(id)
        #         ON UPDATE CASCADE ON DELETE SET NULL
        #     )
        # """)
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
    conn.close()


def import_data():
    current_directory = os.getcwd()
    print(current_directory)
    import_doctor(os.path.join(current_directory, 'data','bac si.csv'))
    import_medicines(os.path.join(current_directory, 'data','thuoc.csv'))

# Import doctor to DB
def import_doctor(csv_file):
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