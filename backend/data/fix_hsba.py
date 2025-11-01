import pandas as pd

def to_date(x):
    for fmt in ("%d/%m/%Y", "%Y-%m-%d"):
        try:
            return pd.to_datetime(x, format=fmt)
        except:
            continue
    return pd.NaT

# fix ThoiGianMo < ThoiGianDong trong HoSoBenhAn.csv
def fix_hsba_open_close_date():
    # === 1. Đọc file CSV gốc ===
    input_path = "HoSoBenhAn.csv"   # đường dẫn tới file gốc
    df = pd.read_csv(input_path)

    # === 2. Chuẩn hóa định dạng ngày tháng ===
    df["ThoiGianMo"] = pd.to_datetime(df["ThoiGianMo"], errors="coerce", dayfirst=True)
    df["ThoiGianDong"] = pd.to_datetime(df["ThoiGianDong"], errors="coerce", dayfirst=True)

    # === 3. Tìm các hàng có thời gian mở > thời gian đóng ===
    mask = df["ThoiGianMo"] > df["ThoiGianDong"]

    # === 4. Hoán đổi giá trị cho các hàng bị sai ===
    df.loc[mask, ["ThoiGianMo", "ThoiGianDong"]] = (
        df.loc[mask, ["ThoiGianDong", "ThoiGianMo"]].values
    )

    # === 5. Lưu ra file CSV mới ===
    output_path = "HoSoBenhAn_DaSua.csv"
    df.to_csv(output_path, index=False)

    print(f"Đã sửa xong và lưu tại: {output_path}")
    print(f"Số hàng đã được hoán đổi: {mask.sum()}")


# fix ThoiGianMo = ThoiGianKham trong HoSoBenhAn.csv và KhamBenh.csv
def fix_hsba_open_diag_date():
    # === 1. Đọc dữ liệu ===
    hoso = pd.read_csv("HoSoBenhAn_DaSua.csv")
    kham = pd.read_csv("KhamBenh.csv")
    chandoan = pd.read_csv("ChanDoan.csv")

    # === 2. Chuẩn hóa định dạng ngày ===
    hoso["ThoiGianMo"] = pd.to_datetime(hoso["ThoiGianMo"], errors="coerce", dayfirst=True)
    hoso["ThoiGianDong"] = pd.to_datetime(hoso["ThoiGianDong"], errors="coerce", dayfirst=True)
    kham["ThoiGianKham"] = pd.to_datetime(kham["ThoiGianKham"], errors="coerce", dayfirst=True)

    # === 3. Ghép bảng để xác định mối quan hệ ===
    # Ghép ChanDoan với KhamBenh theo MaKB
    cd_kb = pd.merge(chandoan, kham[["MaKB", "ThoiGianKham"]], on="MaKB", how="left")

    # Ghép HoSoBenhAn với kết quả trên theo MaCD
    hoso_full = pd.merge(hoso, cd_kb[["MaCD", "ThoiGianKham"]], on="MaCD", how="left")

    # === 4. Xác định điều kiện điều chỉnh ===
    mask = hoso_full["ThoiGianKham"].notna() & (hoso_full["ThoiGianMo"] != hoso_full["ThoiGianKham"])

    # === 5. Thực hiện điều chỉnh ===
    hoso_full.loc[mask, "ThoiGianMo"] = hoso_full.loc[mask, "ThoiGianKham"]

    # === 6. Xóa cột phụ và lưu kết quả ===
    hoso_updated = hoso_full.drop(columns=["ThoiGianKham"])
    output_path = "HoSoBenhAn_DieuChinh_TheoRangBuoc.csv"
    hoso_updated.to_csv(output_path, index=False)

    print(f"✅ Đã cập nhật và lưu tại: {output_path}")
    print(f"Số hồ sơ được điều chỉnh: {mask.sum()}")

def fix_hsba_complete():
    # === 1. Đọc 4 file ===
    hoso = pd.read_csv("HoSoBenhAn.csv")
    chandoan = pd.read_csv("ChanDoan.csv")
    kham = pd.read_csv("KhamBenh_DieuChinh.csv")
    chuabenh = pd.read_csv("ChuaBenh_DieuChinh.csv")

    # === 2. Chuyển đổi kiểu thời gian ===
    hoso["ThoiGianMo"] = hoso["ThoiGianMo"].apply(to_date)
    hoso["ThoiGianDong"] = hoso["ThoiGianDong"].apply(to_date)
    kham["ThoiGianKham"] = kham["ThoiGianKham"].apply(to_date)
    chuabenh["ThoiGian"] = chuabenh["ThoiGian"].apply(to_date)

    # === 3. Nối bảng theo quy tắc ===
    # (1) HoSoBenhAn ↔ ChanDoan
    hoso_cd = pd.merge(hoso, chandoan[["MaCD", "MaKB"]], on="MaCD", how="left")

    # (2) ChanDoan ↔ KhamBenh (để lấy ThoiGianKham)
    hoso_cd_kb = pd.merge(hoso_cd, kham[["MaKB", "ThoiGianKham"]], on="MaKB", how="left")

    # (3) HoSoBenhAn ↔ ChuaBenh (để lấy thời gian chữa bệnh)
    hoso_cd_kb_cb = pd.merge(hoso_cd_kb, chuabenh[["MaBA", "ThoiGian"]], on="MaBA", how="left")

    # === 4. Cập nhật dữ liệu theo 3 bước ===

    # (1) ThoiGianMo = ThoiGianKham
    hoso_cd_kb_cb["ThoiGianMo"] = hoso_cd_kb_cb["ThoiGianKham"]

    # (2) Nếu TrangThai != "Khỏi bệnh" → ThoiGianDong = NaT
    mask_not_recovered = hoso_cd_kb_cb["TrangThai"].astype(str).str.strip().str.lower() != "khỏi bệnh"
    hoso_cd_kb_cb.loc[mask_not_recovered, "ThoiGianDong"] = pd.NaT

    # (3) Nếu TrangThai == "Khỏi bệnh" → ThoiGianDong = max(ThoiGianDong, ChuaBenh.ThoiGian)
    mask_recovered = ~mask_not_recovered
    hoso_cd_kb_cb.loc[mask_recovered, "ThoiGianDong"] = hoso_cd_kb_cb.loc[mask_recovered, ["ThoiGianDong", "ThoiGian"]].max(axis=1)

    # === 5. Xuất kết quả ===
    hoso_final = hoso_cd_kb_cb.drop(columns=["ThoiGianKham", "ThoiGian", "MaKB"])
    hoso_final.to_csv("HoSoBenhAn_ChuanHoa.csv", index=False, date_format="%d/%m/%Y")

    print("✅ Hoàn tất cập nhật dữ liệu.")
    print("📄 File kết quả: HoSoBenhAn_ChuanHoa.csv")
    print("Tổng hồ sơ 'Khỏi bệnh':", mask_recovered.sum())

# fix_hsba_open_close_date()
# fix_hsba_open_diag_date()

fix_hsba_complete()