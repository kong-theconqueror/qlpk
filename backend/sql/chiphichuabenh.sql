SELECT 
    cb.MaCB,
    cb.MaBA,
    bn.MaBN,
    bn.TenBN,
    b.TenBenh,
    cb.HinhThucChuaBenh,
    cb.ThoiGian,

    -- Tổng tiền dịch vụ chữa bệnh
    IFNULL(SUM(DISTINCT dvcb.SoLuong * dvcb.DonGiaApDung), 0) AS TongTienDichVu,

    -- Tổng tiền thiết bị sử dụng trong chữa bệnh
    IFNULL(SUM(DISTINCT sdcb.SoLuong * sdcb.DonGiaApDung), 0) AS TongTienThietBi,

    -- Tổng tiền thuốc trong đơn thuốc của lần chữa bệnh
    IFNULL(SUM(DISTINCT ld.SoLuong * t.DonGia), 0) AS TongTienThuoc,

    -- Tổng cộng chi phí chữa bệnh
    (
        IFNULL(SUM(DISTINCT dvcb.SoLuong * dvcb.DonGiaApDung), 0) +
        IFNULL(SUM(DISTINCT sdcb.SoLuong * sdcb.DonGiaApDung), 0) +
        IFNULL(SUM(DISTINCT ld.SoLuong * t.DonGia), 0)
    ) AS TongChiPhiChuaBenh

FROM ChuaBenh cb
JOIN HoSoBenhAn hba ON cb.MaBA = hba.MaBA
JOIN BenhNhan bn ON hba.MaBN = bn.MaBN
JOIN Benh b ON cb.MaBenh = b.MaBenh

-- Dịch vụ chữa bệnh
LEFT JOIN DichVuCB dvcb ON cb.MaCB = dvcb.MaCB

-- Thiết bị sử dụng trong chữa bệnh
LEFT JOIN SuDungThietBiCB sdcb ON cb.MaCB = sdcb.MaCB

-- Thuốc (qua đơn thuốc)
LEFT JOIN DonThuoc dt ON cb.MaCB = dt.MaCB
LEFT JOIN LieuDung ld ON dt.MaDonThuoc = ld.MaDonThuoc
LEFT JOIN Thuoc t ON ld.MaThuoc = t.MaThuoc

WHERE bn.MaBN = 'XXXXXX'
GROUP BY cb.MaCB
ORDER BY cb.ThoiGian ASC;
