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
            CREATE TABLE IF NOT EXISTS BacSy (
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
            CREATE TABLE IF NOT EXISTS Thuoc (
                id VARCHAR(10) PRIMARY KEY,           -- VD: TH001
                name VARCHAR(255) NOT NULL,           -- Tên thuốc
                description VARCHAR(500),             -- Công dụng
                unit_price DECIMAL(12,2) DEFAULT 0,   -- Giá theo đơn vị
                unit VARCHAR(50),                     -- Đơn vị (viên, ống, ml...)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
    conn.close()