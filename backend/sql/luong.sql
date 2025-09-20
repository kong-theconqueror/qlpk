DELIMITER $$

CREATE PROCEDURE TinhLuongBacSi(IN p_thang INT, IN p_nam INT)
BEGIN
    SELECT 
        b.MaBS,
        b.TenBS,
        p_nam AS Nam,
        p_thang AS Thang,
        b.HeSoLuong,
        2340000 AS LuongCoBan,
        COALESCE(COUNT(h.MaBA), 0) AS ChuaKhoi,
        b.HeSoLuong * 2340000 + COALESCE(COUNT(h.MaBA), 0) * 1000000 AS TongLuong
    FROM BacSy b
    LEFT JOIN HoSoBenhAn h 
            ON b.MaBS = h.MaBS 
            AND h.ThoiGianKetThuc IS NOT NULL
            AND YEAR(h.ThoiGianKetThuc) = p_nam
            AND MONTH(h.ThoiGianKetThuc) = p_thang
    GROUP BY b.MaBS, b.TenBS, b.HeSoLuong
    ORDER BY TongLuong DESC;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE TinhLuongYTa(IN p_thang INT, IN p_nam INT)
BEGIN
    SELECT 
        yt.MaYT,
        yt.TenYT,
        yt.HeSoLuong,
        2340000 AS LuongCoBan,
        COALESCE(pc.SoLanHoTro, 0) AS HoTro,
        yt.HeSoLuong * 2340000 + COALESCE(pc.SoLanHoTro, 0) * 200000 AS TongLuong
    FROM YTa yt
    LEFT JOIN (
        SELECT MaYT, COUNT(*) AS SoLanHoTro
        FROM (
            -- hỗ trợ khám bệnh
            SELECT pkb.MaYT, kb.ThoiGian
            FROM PhanCongKB pkb
            JOIN KhamBenh kb ON pkb.MaKB = kb.MaKB
            WHERE MONTH(kb.ThoiGian) = p_thang AND YEAR(kb.ThoiGian) = p_nam
            UNION ALL
            -- hỗ trợ chữa bệnh
            SELECT pcb.MaYT, cb.ThoiGian
            FROM PhanCongCB pcb
            JOIN ChuaBenh cb ON pcb.MaCB = cb.MaCB
            WHERE MONTH(cb.ThoiGian) = p_thang AND YEAR(cb.ThoiGian) = p_nam
        ) AS tmp
        GROUP BY MaYT
    ) pc ON yt.MaYT = pc.MaYT
    ORDER BY TongLuong DESC;
END$$

DELIMITER ;