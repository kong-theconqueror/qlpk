import os
import csv
import random
from datetime import datetime, time
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

def run_query(sql, params=None, fetch="all"):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params or ())
            if sql.strip().lower().startswith("select") or sql.strip().lower().startswith("call"):
                return cur.fetchone() if fetch == "one" else cur.fetchall()
            conn.commit()
            return {"rowcount": cur.rowcount, "last_id": cur.lastrowid}
    finally:
        conn.close()
        
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

def drop_db(sql_file):
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
        print("Xóa DB xong !!!")
    conn.close()

def declare_procedure_db(sql_file):
    conn = get_conn()
    with conn.cursor() as cur, open(sql_file, encoding="utf-8") as f:
        sql_content = f.read()

        # Tách các câu lệnh bằng DELIMITER custom nếu có
        statements = sql_content.replace("DELIMITER $$", "").replace("DELIMITER ;", "").split("$$")
        for stmt in statements:
            stmt = stmt.strip()
            if stmt:
                cur.execute(stmt)
                print(f"Executed statement:\n{stmt[:100]}...")  # in 100 ký tự đầu
    
    print(f"Khởi tạo PROCEDURE {sql_file} xong !!!")    
    conn.commit()
    conn.close()

def declare_trigger_db(sql_file):
    conn = get_conn()
    with conn.cursor() as cur, open(sql_file, encoding="utf-8") as f:
        sql_content = f.read()

        # Tách các câu lệnh bằng DELIMITER custom nếu có
        statements = sql_content.replace("DELIMITER $$", "").replace("DELIMITER ;", "").split("$$")
        for stmt in statements:
            stmt = stmt.strip()
            if stmt:
                cur.execute(stmt)
                print(f"Executed statement:\n{stmt[:100]}...")  # in 100 ký tự đầu
    
    print(f"Khởi tạo TRIGGER {sql_file} xong !!!")    
    conn.commit()
    conn.close()
    
def import_data():
    current_directory = os.getcwd()
    print(current_directory)
    import_khoa(os.path.join(current_directory, 'data','Khoa.csv'))
    import_bacsy(os.path.join(current_directory, 'data','BacSi.csv'))
    import_benh(os.path.join(current_directory, 'data','Benh.csv'))
    import_yta(os.path.join(current_directory, 'data','YTa.csv'))
    import_thuoc(os.path.join(current_directory, 'data','Thuoc.csv'))
    import_thietbiyte(os.path.join(current_directory, 'data','ThietBiYTe.csv'))
    import_benhnhan(os.path.join(current_directory, 'data','BenhNhan.csv'))

    import_khambenh(os.path.join(current_directory, 'data','KhamBenh.csv'))
    import_chandoan(os.path.join(current_directory, 'data','ChanDoan.csv'))
    import_hosobenhan(os.path.join(current_directory, 'data','HoSoBenhAn.csv'))
    import_chuabenh(os.path.join(current_directory, 'data','ChuaBenh.csv'))

    import_dichvu(os.path.join(current_directory, 'data','DichVu.csv'))
    import_dichvukb(os.path.join(current_directory, 'data','DichVuKB.csv'))
    import_dichvucb(os.path.join(current_directory, 'data','DichVuCB.csv'))
    
    import_phancongkb(os.path.join(current_directory, 'data','PhanCongKB.csv'))
    import_phancongcb(os.path.join(current_directory, 'data','PhanCongCB.csv'))

    import_sudungthietbikb(os.path.join(current_directory, 'data','SuDungThietBiKB.csv'))
    import_sudungthietbicb(os.path.join(current_directory, 'data','SuDungThietBiCB.csv'))

    import_donthuoc(os.path.join(current_directory, 'data','DonThuoc.csv'))
    import_lieudung(os.path.join(current_directory, 'data','LieuDung.csv'))

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
                row['MaYT'],
                row['TenYT'],
                row['GioiTinh'],
                row['BoPhan'],
                row['NamKinhNghiem'],
                row['HeSoLuong']
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
            print(f"Imported YTa {row['MaYT']} - {row['TenYT']}")
    conn.close()

# Import Thuoc to DB
def import_thuoc(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row["MaThuoc"],
                row["TenThuoc"],
                row["MoTa"],
                float(row["DonGia"]) if row["DonGia"] else 0,
                row["DonViTinh"]
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
            print(f"Imported Thuoc {row['MaThuoc']} - {row['TenThuoc']}")
    conn.close()

# Import ThietBiYTe to DB
def import_thietbiyte(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaThietBi'],
                row['TenThietBi'],
                row['DonViTinh'],
                row['DonGia']
            )
            # Insert, tránh trùng khóa chính
            sql = """
                INSERT INTO ThietBiYTe (MaThietBi, TenThietBi, DonViTinh, DonGia)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaThietBi = VALUES(MaThietBi),
                    TenThietBi = VALUES(TenThietBi),
                    DonViTinh = VALUES(DonViTinh),
                    DonGia = VALUES(DonGia)
            """
            cur.execute(sql, data)
            print(f"Imported ThietBi {row['MaThietBi']} - {row['TenThietBi']}")
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
                row['MaDichVu'],
                row['TenDichVu'],
                row['MoTa'],
                row['DonGia']
            )
            sql = """
                INSERT INTO DichVu (MaDichVu, TenDichVu, MoTa, DonGia)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaDichVu = VALUES(MaDichVu),
                    TenDichVu = VALUES(TenDichVu),
                    MoTa = VALUES(MoTa),
                    DonGia = VALUES(DonGia)
            """
            cur.execute(sql, data)
            print(f"Imported DichVu {row['MaDichVu']} - {row['TenDichVu']}")
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
                row['SoLanChua']
            )
            sql = """
                INSERT INTO ChanDoan (MaCD, MaKB, MaBenh, MucDo, SoLanChuaBenhDuDoan)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaKB = VALUES(MaKB),
                    MaBenh = VALUES(MaBenh),
                    MucDo = VALUES(MucDo),
                    SoLanChuaBenhDuDoan = VALUES(SoLanChuaBenhDuDoan)
            """
            cur.execute(sql, data)
            print(f"Imported ChanDoan {row['MaCD']} - {row['MaBenh']}")
    conn.close()

# Import HoSoBenhAn to DB
def import_hosobenhan(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            start_date = datetime.strptime(row['ThoiGianMo'], "%d/%m/%Y").date()
            end_date = datetime.strptime(row['ThoiGianDong'], "%d/%m/%Y").date() if row['ThoiGianDong'] else None
            data = (
                row['MaBA'],
                row['MaCD'],
                row['MaBN'],
                row['MaBS'],
                row['TrangThai'],
                start_date,
                end_date
            )
            sql = """
                INSERT INTO HoSoBenhAn (MaBA, MaCD, MaBN, MaBS, TrangThai, ThoiGianMo, ThoiGianKetThuc)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaCD = VALUES(MaCD),
                    MaBN = VALUES(MaBN),
                    MaBS = VALUES(MaBS),
                    TrangThai = VALUES(TrangThai),
                    ThoiGianMo = VALUES(ThoiGianMo),
                    ThoiGianKetThuc = VALUES(ThoiGianKetThuc)
            """
            cur.execute(sql, data)
            print(f"Imported ChanDoan {row['MaBA']} - {row['TrangThai']}")
    conn.close()

# Import ChuaBenh to DB
def import_chuabenh(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            date = datetime.strptime(row['ThoiGian'], "%d/%m/%Y").date() if row['ThoiGian'] else None
            data = (
                row['MaCB'],
                row['MaBA'],
                row['MaBenh'],
                row['HinhThucChua'],
                date
            )
            sql = """
                INSERT INTO ChuaBenh (MaCB, MaBA, MaBenh, HinhThucChuaBenh, ThoiGian)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaBA = VALUES(MaBA),
                    MaBenh = VALUES(MaBenh),
                    HinhThucChuaBenh = VALUES(HinhThucChuaBenh),
                    ThoiGian = VALUES(ThoiGian)
            """
            cur.execute(sql, data)
            print(f"Imported ChuaBenh {row['MaCB']} - {row['HinhThucChua']}")
    conn.close()

# Import SuDungThietBiCB to DB
def import_sudungthietbicb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaThietBi'],
                row['MaCB'],
                row['SoLuong'],
                row['DonGiaApDung']
            )
            sql = """
                INSERT INTO SuDungThietBiCB (MaThietBi, MaCB, SoLuong, DonGiaApDung)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaThietBi = VALUES(MaThietBi),
                    MaCB = VALUES(MaCB),
                    SoLuong = VALUES(SoLuong),
                    DonGiaApDung = VALUES(DonGiaApDung)
            """
            cur.execute(sql, data)
            print(f"Imported SuDungThietBiCB {row['MaThietBi']} - {row['MaCB']}")
    conn.close()

# Import SuDungThietBiKB to DB
def import_sudungthietbikb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaThietBi'],
                row['MaKB'],
                row['SoLuong'],
                row['DonGiaApDung']
            )
            sql = """
                INSERT INTO SuDungThietBiKB (MaThietBi, MaKB, SoLuong, DonGiaApDung)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaThietBi = VALUES(MaThietBi),
                    MaKB = VALUES(MaKB),
                    SoLuong = VALUES(SoLuong),
                    DonGiaApDung = VALUES(DonGiaApDung)
            """
            cur.execute(sql, data)
            print(f"Imported SuDungThietBiKB {row['MaThietBi']} - {row['MaKB']}")
    conn.close()

# Import PhanCongKB to DB
def import_phancongkb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaKB'],
                row['MaYT']
            )
            sql = """
                INSERT INTO PhanCongKB (MaKB, MaYT)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                    MaYT = VALUES(MaYT)
            """
            cur.execute(sql, data)
            print(f"Imported PhanCongKB {row['MaKB']} - {row['MaYT']}")
    conn.close()

# Import PhanCongCB to DB
def import_phancongcb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaCB'],
                row['MaYT']
            )
            sql = """
                INSERT INTO PhanCongCB (MaCB, MaYT)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                    MaYT = VALUES(MaYT)
            """
            cur.execute(sql, data)
            print(f"Imported PhanCongCB {row['MaCB']} - {row['MaYT']}")
    conn.close()

# Import DichVuKB to DB
def import_dichvukb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaDichVu'],
                row['MaKB'],
                row['SoLuong'],
                row['DonGiaApDung']
            )
            sql = """
                INSERT INTO DichVuKB (MaDichVu, MaKB, SoLuong, DonGiaApDung)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    SoLuong = VALUES(SoLuong),
                    SoLuong = VALUES(SoLuong),
                    DonGiaApDung = VALUES(DonGiaApDung)
            """
            cur.execute(sql, data)
            print(f"Imported DichVuKB {row['MaDichVu']} - {row['MaKB']}")
    conn.close()

# Import DichVuCB to DB
def import_dichvucb(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaDichVu'],
                row['MaCB'],
                row['SoLuong'],
                row['DonGiaApDung']
            )
            sql = """
                INSERT INTO DichVuCB (MaDichVu, MaCB, SoLuong, DonGiaApDung)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    SoLuong = VALUES(SoLuong),
                    DonGiaApDung = VALUES(DonGiaApDung)
            """
            cur.execute(sql, data)
            print(f"Imported DichVuCB {row['MaDichVu']} - {row['MaCB']}")
    conn.close()

# Import DonThuoc to DB
def import_donthuoc(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ngay_lap = None
            # Chuyển đổi ngày giờ
            if row['NgayLapDon']:
                try:
                    # Chỉ lấy ngày
                    ngay_date = datetime.strptime(row['NgayLapDon'], "%Y-%m-%d").date()
                    
                    # Sinh ngẫu nhiên giờ hành chính (08:00 -> 17:30)
                    start_time = 8 * 60      # 08:00 tính bằng phút
                    end_time = 17 * 60 + 30  # 17:30 tính bằng phút
                    random_minutes = random.randint(start_time, end_time)
                    
                    # Ghép ngày + giờ ngẫu nhiên
                    hours, minutes = divmod(random_minutes, 60)
                    ngay_lap = datetime.combine(ngay_date, time(hours, minutes, 0))
                except ValueError:
                    # Nếu dữ liệu đã có datetime thì parse trực tiếp
                    ngay_lap = datetime.strptime(row['NgayLapDon'], "%Y-%m-%d %H:%M:%S")

            data = (
                row['MaDonThuoc'],
                row['MaCB'],
                ngay_lap
            )
            sql = """
                INSERT INTO DonThuoc (MaDonThuoc, MaCB, NgayLapDon)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    MaCB = VALUES(MaCB),
                    NgayLapDon = VALUES(NgayLapDon)
            """
            cur.execute(sql, data)
            print(f"Imported DonThuoc {row['MaDonThuoc']} - {row['NgayLapDon']}")
    conn.close()

# Import LieuDung to DB
def import_lieudung(csv_file):
    conn = get_conn()
    with conn.cursor() as cur, open(csv_file, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data = (
                row['MaDonThuoc'],
                row['MaThuoc'],
                int(row['SoLuong']) if row['SoLuong'] else None,
                row['LieuDung']
            )
            sql = """
                INSERT INTO LieuDung (MaDonThuoc, MaThuoc, SoLuong, LieuDung)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    SoLuong = VALUES(SoLuong),
                    LieuDung = VALUES(LieuDung)
            """
            cur.execute(sql, data)
            print(f"Imported LieuDung {row['MaDonThuoc']} - {row['MaThuoc']}")
    conn.commit()
    conn.close()

