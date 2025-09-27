SELECT 
    cb.MaCB,
    cb.ThoiGian,
    -- Y tá
    GROUP_CONCAT(DISTINCT CONCAT('{"MaYTa":"', yt.MaYT, '", "TenYT":"', yt.TenYT, '"}') SEPARATOR '|') AS YTaThamGia,
    
    -- Thiết bị
    GROUP_CONCAT(DISTINCT CONCAT('{"MaThietBi":"', tb.MaThietBi, '", "TenThietBi":"', tb.TenThietBi, '", "SL":', tbcb.SoLuong, ', "DonGia":', tbcb.DonGiaApDung, '}') SEPARATOR '| ') AS ThietBiSuDung,
    
    -- Dịch vụ
    GROUP_CONCAT(DISTINCT CONCAT('{"MaDV":"', dv.MaDichVu, '", "TenDV":"', dv.TenDichVu, '", "SL":', dvcb.SoLuong, ', "DonGia":', dvcb.DonGiaApDung, '}') SEPARATOR '| ') AS DichVuSuDung,
    
    -- Thuốc
    GROUP_CONCAT(DISTINCT CONCAT('{"MaThuoc":"', th.MaThuoc, '", "TenThuoc":"', th.TenThuoc, '", "LieuDung":"', ld.LieuDung, '", "SL":', ld.SoLuong, ', "DonGia":', th.DonGia, '}') SEPARATOR ' | ') AS ThuocSuDung

FROM HoSoBenhAn ba
JOIN ChuaBenh cb ON ba.MaBA = cb.MaBA

-- Y tá
LEFT JOIN PhanCongCB pccb ON cb.MaCB = pccb.MaCB
LEFT JOIN YTa yt ON pccb.MaYT = yt.MaYT

-- Thiết bị
LEFT JOIN SuDungThietBiCB tbcb ON cb.MaCB = tbcb.MaCB
LEFT JOIN ThietBiYTe tb ON tbcb.MaThietBi = tb.MaThietBi

-- Dịch vụ
LEFT JOIN DichVuCB dvcb ON cb.MaCB = dvcb.MaCB
LEFT JOIN DichVu dv ON dvcb.MaDichVu = dv.MaDichVu

-- Thuốc
LEFT JOIN DonThuoc dt ON cb.MaCB = dt.MaCB
LEFT JOIN LieuDung ld ON dt.MaDonThuoc = ld.MaDonThuoc
LEFT JOIN Thuoc th ON ld.MaThuoc = th.MaThuoc

WHERE ba.MaBA = 'BA-CD1039-4522'
GROUP BY cb.MaCB
ORDER BY cb.ThoiGian ASC;
