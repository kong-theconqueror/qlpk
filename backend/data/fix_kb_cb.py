import pandas as pd

# === 1. Đọc dữ liệu ===
hoso = pd.read_csv("HoSoBenhAn.csv")
chandoan = pd.read_csv("ChanDoan.csv")
kham = pd.read_csv("KhamBenh.csv")
chuabenh = pd.read_csv("ChuaBenh.csv")

# === 2. Chuyển đổi định dạng thời gian ===
def to_date(x):
    for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%d-%m-%Y %H:%M:%S"):
        try:
            return pd.to_datetime(x, format=fmt)
        except:
            continue
    return pd.NaT

kham["ThoiGianKham"] = kham["ThoiGianKham"].apply(to_date)
chuabenh["ThoiGian"] = chuabenh["ThoiGian"].apply(to_date)

# === 3. Nối bốn bảng theo quy tắc ===
hoso_cd = pd.merge(hoso[["MaBA", "MaCD"]], chandoan[["MaCD", "MaKB"]], on="MaCD", how="left")
hoso_cd_kb = pd.merge(hoso_cd, kham[["MaKB", "ThoiGianKham"]], on="MaKB", how="left")
hoso_cd_kb_cb = pd.merge(hoso_cd_kb, chuabenh[["MaBA", "ThoiGian"]], on="MaBA", how="left")

# === 4. Xác định các trường hợp cần đổi thời gian ===
swap_mask = hoso_cd_kb_cb["ThoiGianKham"].notna() & hoso_cd_kb_cb["ThoiGian"].notna() & \
             (hoso_cd_kb_cb["ThoiGianKham"] > hoso_cd_kb_cb["ThoiGian"])

# === 5. Thực hiện hoán đổi trên dữ liệu gốc ===
for idx, row in hoso_cd_kb_cb[swap_mask].iterrows():
    ma_kb = row["MaKB"]
    ma_ba = row["MaBA"]

    tg_kham = row["ThoiGianKham"]
    tg_chua = row["ThoiGian"]

    # Hoán đổi trong bản gốc
    kham.loc[kham["MaKB"] == ma_kb, "ThoiGianKham"] = tg_chua
    chuabenh.loc[chuabenh["MaBA"] == ma_ba, "ThoiGian"] = tg_kham

# === 6. Lưu lại kết quả ===
kham.to_csv("KhamBenh_DieuChinh.csv", index=False, date_format="%d/%m/%Y")
chuabenh.to_csv("ChuaBenh_DieuChinh.csv", index=False, date_format="%d/%m/%Y")

print("✅ Đã điều chỉnh thành công.")
print(f"Tổng số bản ghi bị hoán đổi thời gian: {swap_mask.sum()}")
