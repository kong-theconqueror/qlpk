DELIMITER $$

CREATE PROCEDURE TinhDoanhThuNam(IN p_nam INT)
BEGIN
  SELECT 
    m.Thang,
    COALESCE(SUM(CASE WHEN src.loai='dvkb' THEN src.tien END),0) AS DoanhThu_DichVuKB,
    COALESCE(SUM(CASE WHEN src.loai='tbkb' THEN src.tien END),0) AS DoanhThu_ThietBiKB,
    COALESCE(SUM(CASE WHEN src.loai='dvcb' THEN src.tien END),0) AS DoanhThu_DichVuCB,
    COALESCE(SUM(CASE WHEN src.loai='tbcb' THEN src.tien END),0) AS DoanhThu_ThietBiCB,
    COALESCE(SUM(CASE WHEN src.loai='thuoc' THEN src.tien END),0) AS DoanhThu_Thuoc,
    COALESCE(SUM(src.tien),0) AS TongDoanhThu
  FROM (
    SELECT 1 AS Thang UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
    SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
    SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
  ) m
  LEFT JOIN (
    -- dịch vụ khám
    SELECT MONTH(kb.ThoiGian) AS Thang, 'dvkb' AS loai,
           SUM(dvkb.SoLuong * dvkb.DonGiaApDung) AS tien
    FROM KhamBenh kb
    JOIN DichVuKB dvkb ON kb.MaKB = dvkb.MaKB
    WHERE YEAR(kb.ThoiGian) = p_nam
    GROUP BY MONTH(kb.ThoiGian)
    
    UNION ALL
    -- thiết bị khám
    SELECT MONTH(kb.ThoiGian), 'tbkb',
           SUM(sdkb.SoLuong * sdkb.DonGiaApDung)
    FROM KhamBenh kb
    JOIN SuDungThietBiKB sdkb ON kb.MaKB = sdkb.MaKB
    WHERE YEAR(kb.ThoiGian) = p_nam
    GROUP BY MONTH(kb.ThoiGian)
    
    UNION ALL
    -- dịch vụ chữa
    SELECT MONTH(cb.ThoiGian), 'dvcb',
           SUM(dvcb.SoLuong * dvcb.DonGiaApDung)
    FROM ChuaBenh cb
    JOIN DichVuCB dvcb ON cb.MaCB = dvcb.MaCB
    WHERE YEAR(cb.ThoiGian) = p_nam
    GROUP BY MONTH(cb.ThoiGian)
    
    UNION ALL
    -- thiết bị chữa
    SELECT MONTH(cb.ThoiGian), 'tbcb',
           SUM(sdcb.SoLuong * sdcb.DonGiaApDung)
    FROM ChuaBenh cb
    JOIN SuDungThietBiCB sdcb ON cb.MaCB = sdcb.MaCB
    WHERE YEAR(cb.ThoiGian) = p_nam
    GROUP BY MONTH(cb.ThoiGian)
    
    UNION ALL
    -- thuốc
    SELECT MONTH(dt.NgayLapDon), 'thuoc',
           SUM(ld.SoLuong * t.DonGia)
    FROM DonThuoc dt
    JOIN LieuDung ld ON dt.MaDonThuoc = ld.MaDonThuoc
    JOIN Thuoc t ON ld.MaThuoc = t.MaThuoc
    WHERE YEAR(dt.NgayLapDon) = p_nam
    GROUP BY MONTH(dt.NgayLapDon)
  ) src ON m.Thang = src.Thang
  GROUP BY m.Thang
  ORDER BY m.Thang;
END$$

DELIMITER ;