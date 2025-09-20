DELIMITER $$

CREATE PROCEDURE ThongKeBenh(IN p_thang INT, IN p_nam INT)
BEGIN
    SELECT 
        b.MaBenh,
        b.TenBenh,
        COUNT(DISTINCT kb.MaBN) AS SoBenhNhan
    FROM ChanDoan cd
    JOIN Benh b ON cd.MaBenh = b.MaBenh
    JOIN KhamBenh kb ON cd.MaKB = kb.MaKB
    WHERE MONTH(kb.ThoiGian) = p_thang
    AND YEAR(kb.ThoiGian) = p_nam
    GROUP BY b.MaBenh, b.TenBenh
    ORDER BY SoBenhNhan DESC;
END$$

DELIMITER ;