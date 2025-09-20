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
        # Khoa
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Khoa (
                MaKhoa      VARCHAR(20) PRIMARY KEY,
                TenKhoa     VARCHAR(100),
                MoTa        TEXT
            )
        """)

        # BacSy
        cur.execute("""
            CREATE TABLE IF NOT EXISTS BacSy (
                MaBS        VARCHAR(20) PRIMARY KEY,
                TenBS       VARCHAR,
                MaKhoa      VARCHAR NOT NULL,
                GioiTinh    VARCHAR,
                PhongKham   VARCHAR,
                NamKinhNghiem  INTEGER,
                HeSoLuong   DECIMAL(5,2),
                CONSTRAINT fk_BacSy_Khoa
                    FOREIGN KEY (MaKhoa) REFERENCES Khoa(MaKhoa)
            );
        """)
                
        # BenhNhan
        cur.execute("""
            CREATE TABLE IF NOT EXISTS BenhNhan (
                MaBN        VARCHAR PRIMARY KEY,
                TenBN       VARCHAR,
                GioiTinh    VARCHAR,        
                NgaySinh    DATE,
                DiaChi      VARCHAR,
                SDT         VARCHAR
            );
        """)

        # YTa
        cur.execute("""
            CREATE TABLE IF NOT EXISTS YTa (
                MaYT        VARCHAR PRIMARY KEY,
                TenYT       VARCHAR,
                GioiTinh    VARCHAR,
                BoPhan      VARCHAR,
                NamKinhNghiem  INTEGER,
                HeSoLuong   DECIMAL(5,2)
            );
        """)

        # Benh
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Benh (
                MaBenh      VARCHAR PRIMARY KEY,
                TenBenh     VARCHAR,
                MoTa        VARCHAR
            );
        """)

        # Thuoc
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Thuoc (
                MaThuoc     VARCHAR PRIMARY KEY,
                TenThuoc    VARCHAR,
                MoTa        VARCHAR,
                DonViTinh   VARCHAR,
                DonGia      INTEGER
            );

        """)

        # CoSoVatChat 
        cur.execute("""
            CREATE TABLE IF NOT EXISTS CoSoVatChat (
                MaThietBi   VARCHAR PRIMARY KEY,
                TenThietBi  VARCHAR,
                TrangThai   VARCHAR)
            );
        """)

        # DichVu 
        cur.execute("""
            CREATE TABLE IF NOT EXISTS  DichVu (
                MaDichVu    VARCHAR PRIMARY KEY,
                TenDichVu   VARCHAR,
                MoTa        VARCHAR,
                DonGia      INTEGER
            );
        """)

    conn.close()

def init_db_from_file(sql_file):
    conn = get_conn()
    with conn.cursor() as cur:
        # Đọc file .sql
        with open(sql_file, "r", encoding="utf-8") as f:
            sql_commands = f.read()
            # Tách các câu lệnh bằng dấu chấm phẩy (;)
            for command in sql_commands.split(";"):
                command = command.strip()
                if command:  # bỏ qua dòng trống
                    try:
                        cur.execute(command)
                    except Exception as e:
                        print(f"Lỗi khi chạy lệnh: {command}\n{e}")
        print("Khởi tạo DB xong !!!")
    conn.close()

def import_data():
    current_directory = os.getcwd()
    print(current_directory)
    import_khoa(os.path.join(current_directory, 'data','khoa.csv'))
    import_bacsy(os.path.join(current_directory, 'data','bac si.csv'))
    import_yta(os.path.join(current_directory, 'data','y ta.csv'))
    import_thuoc(os.path.join(current_directory, 'data','thuoc.csv'))
    # import_thietbiyte(os.path.join(current_directory, 'data','thiet_bi.csv'))
    import_benh(os.path.join(current_directory, 'data','benh.csv'))
    # import_dich_vu(os.path.join(current_directory, 'data','dich_vu.csv'))
    import_benhnhan(os.path.join(current_directory, 'data','benh_nhan.csv'))
    import_khambenh(os.path.join(current_directory, 'data','kham_benh.csv'))
    # import_chandoan(os.path.join(current_directory, 'data','chan_doan.csv'))

# Import Khoa to DB
def import_khoa(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaKhoa'],
                row['TenKhoa'],
                row['MoTa']
            )
            sql = """
                INSERT INTO Khoa (MaKhoa, TenKhoa, MoTa)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    TenKhoa = VALUES(TenKhoa),
                    MoTa = VALUES(MoTa)
            """
            cur.execute(sql, data)
            print(f"Imported Khoa {row['MaKhoa']} - {row['TenKhoa']}")
    conn.close()

# Import BacSy to DB
def import_bacsy(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Chuẩn bị dữ liệu đúng với bảng BacSy
            data = (
                row["MaBS"],
                row["MaKhoa"],
                row["TenBS"],
                row["GioiTinh"],
                row["PhongKham"],
                int(row["NamKinhNghiem"]) if row["NamKinhNghiem"] else 0,
                float(row["HeSoLuong"]) if row["HeSoLuong"] else 1.0
            )
            
            # Câu lệnh Insert, tránh trùng khóa chính (sử dụng ON DUPLICATE KEY UPDATE)
            sql = """
                INSERT INTO BacSy(MaBS, MaKhoa, TenBS, GioiTinh, PhongKham, NamKinhNghiem, HeSoLuong)
                VALUES(%s,%s,%s,%s,%s,%s,%s)
                ON DUPLICATE KEY UPDATE
                    MaKhoa=VALUES(MaKhoa),
                    TenBS=VALUES(TenBS),
                    GioiTinh=VALUES(GioiTinh),
                    PhongKham=VALUES(PhongKham),
                    NamKinhNghiem=VALUES(NamKinhNghiem),
                    HeSoLuong=VALUES(HeSoLuong)
            """
            
            cur.execute(sql, data)
            print(f"Imported BacSy {row['MaBS']} - {row['TenBS']}")
    
    conn.commit()
    conn.close()

# Import YTa to DB
def import_yta(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Chuẩn bị dữ liệu
            data = (
                row['id'],
                row['full_name'],
                row['gender'],
                row['title'],
                row['years_of_experience'],
                row['Salary coefficient']
            )
             # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO YTa(MaYT, TenYT, GioiTinh, BoPhan, NamKinhNghiem, HeSoLuong)
                VALUES(%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    TenYT = VALUES(TenYT),
                    GioiTinh = VALUES(GioiTinh),
                    BoPhan = VALUES(BoPhan),
                    NamKinhNghiem = VALUES(NamKinhNghiem),
                    HeSoLuong = VALUES(HeSoLuong)
            """
            cur.execute(sql, data)
            # print(f"Imported nurse {row['MaYT']} - {row['TenYT']}")
            print(f"Imported YTa {row['id']} - {row['full_name']}")
    conn.close()

# Import Thuoc to DB
def import_thuoc(csv_file):
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
            # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO Thuoc(MaThuoc, TenThuoc, MoTa, DonGia, DonViTinh)
                VALUES(%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    TenThuoc = VALUES(TenThuoc),
                    MoTa = VALUES(MoTa),
                    DonGia = VALUES(DonGia),
                    DonViTinh = VALUES(DonViTinh)
            """
            cur.execute(sql, data)
            # print(f"Imported medicine {row['MaThuoc']} - {row['TenThuoc']}")
            print(f"Imported Thuoc {row['id']} - {row['name']}")
    conn.close()

# Import ThietBiYTe to DB
def import_thietbiyte(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['id_thiet_bi'],
                row['ten_thiet_bi'],
                row['trang_thai']
            )
            # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO CoSoVatChat (MaThietBi, TenThietBi, TrangThai)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaThietBi = VALUES(MaThietBi),
                    TenThietBi = VALUES(TenThietBi),
                    TrangThai = VALUES(TrangThai)
            """
            cur.execute(sql, data)
            # print(f"Imported CoSoVatChat {row['MaCSVC']} - {row['TenCSVC']}")
            print(f"Imported ThietBi {row['id_thiet_bi']} - {row['ten_thiet_bi']}")
    conn.close()

# Import Benh to DB
def import_benh(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaBenh'],
                row['TenBenh'],
                row['MoTa']
            )
            sql = """
                INSERT INTO Benh (MaBenh, TenBenh, MoTa)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaBenh = VALUES(MaBenh),
                    TenBenh = VALUES(TenBenh),
                    MoTa = VALUES(MoTa)
            """
            cur.execute(sql, data)
            print(f"Imported Benh {row['MaBenh']} - {row['TenBenh']}")
    conn.close()

# Import DichVu to DB
def import_dichvu(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['id_dich_vu'],
                row['ten_dich_vu'],
                row['mo_ta'],
                row['don_gia'],
                row['don_gia'],
            )
            sql = """
                INSERT INTO DichVu (MaDichVu, TenDichVu, MoTa, MaThietBi, DonGia)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaDichVu = VALUES(MaDichVu),
                    TenDichVu = VALUES(TenDichVu),
                    MoTa = VALUES(MoTa),
                    MaThietBi = VALUES(MaThietBi),
                    DonGia = VALUES(DonGia)
            """
            cur.execute(sql, data)
            print(f"Imported DichVu {row['id_dich_vu']} - {row['ten_dich_vu']}")
    conn.close()

# Import BenhNhan to DB
def import_benhnhan(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            birth_date = datetime.strptime(row['NgaySinh'], "%d/%m/%Y").date()
            data = (
                row['MaBN'],
                row['TenBN'],
                row['GioiTinh'],
                birth_date,
                row['DiaChi'],
                row['SDT']
            )
            sql = """
                INSERT INTO BenhNhan (MaBN, TenBN, GioiTinh, NgaySinh, DiaChi, SDT)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    TenBN = VALUES(TenBN),
                    GioiTinh = VALUES(GioiTinh),
                    NgaySinh = VALUES(NgaySinh),
                    DiaChi = VALUES(DiaChi),
                    SDT = VALUES(SDT)
            """
            cur.execute(sql, data)
            print(f"Imported BenhNhan {row['MaBN']} - {row['TenBN']}")
    conn.close()

# Import KhamBenh to DB
def import_khambenh(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            thoigiankham = datetime.strptime(row['ThoiGianKham'], "%d/%m/%Y").date()
            data = (
                row['MaKB'],
                row['MaBS'],
                row['MaBN'],
                thoigiankham
            )
            sql = """
                INSERT INTO KhamBenh (MaKB, MaBS, MaBN, ThoiGian)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaBS = VALUES(MaBS),
                    MaBN = VALUES(MaBN),
                    ThoiGian = VALUES(ThoiGian)
            """
            cur.execute(sql, data)
            print(f"Imported KhamBenh {row['MaKB']} - {row['ThoiGianKham']}")
    conn.close()

# Import ChanDoan to DB
def import_chandoan(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaCD'],
                row['MaKB'],
                row['MaBenh'],
                row['MucDo'],
                row['SoLanChuaBenhDuDoan']
            )
            sql = """
                INSERT INTO ChanDoan (MaCD, MaKB, MaBenh, MucDo, SoLanChuaBenhDuDoan)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaKB = VALUES(MaKB),
                    MaBenh = VALUES(MaBenh),
                    MucDo = VALUES(MucDo),
                    SoLanChuaBenhDuDoan = VALUES(SoLanChuaBenhDuDoan)
            """
            cur.execute(sql, data)
            print(f"Imported ChanDoan {row['MaCD']} - {row['MaBenh']}")
    conn.close()