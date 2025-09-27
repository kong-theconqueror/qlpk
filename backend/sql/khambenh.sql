SELECT 
    kb.MaKB,
    kb.MaBN,
    bn.TenBN,
    kb.MaBS,
    bs.TenBS, 
    k.TenKhoa,
    kb.ThoiGian
FROM KhamBenh kb, BenhNhan bn, BacSy bs, Khoa k
WHERE DATE(kb.ThoiGian) = %s
	AND bn.MaBN = kb.MaBN
	AND bs.MaBS = kb.MaBS
    AND k.MaKhoa = bs.MaKhoa
ORDER BY bn.TenBN, kb.ThoiGian ASC;

SELECT 
    kb.MaKB,
    kb.ThoiGian,
    kb.MaBN,
    bn.TenBN,
    kb.MaBS,
    bs.TenBS,
    cd.MaBenh,
    b.TenBenh,
    cd.SoLanChuaBenhDuDoan,
    GROUP_CONCAT(DISTINCT CONCAT('{MaYTa:', yt.MaYT, ', TenYT:', yt.TenYT, '}') SEPARATOR '|') AS YTaThamGia,
    GROUP_CONCAT(DISTINCT CONCAT('{MaDV:', dv.MaDichVu, ', TenDV:', dv.TenDichVu, ', SL:', dvkb.SoLuong, ', Giá:', dvkb.DonGiaApDung, '}') SEPARATOR '| ') AS DichVuSuDung,
    GROUP_CONCAT(DISTINCT CONCAT('{MaThietBi:', tb.MaThietBi, ', TenThietBi:', tb.TenThietBi, ', SL:', tbkb.SoLuong, ', Giá:', tbkb.DonGiaApDung, '}') SEPARATOR '| ') AS ThietBiSuDung
FROM HoSoBenhAn h
JOIN ChanDoan cd ON h.MaCD = cd.MaCD
JOIN Benh b ON cd.MaBenh = b.MaBenh
JOIN KhamBenh kb ON cd.MaKB = kb.MaKB
JOIN BenhNhan bn ON kb.MaBN = bn.MaBN
JOIN BacSy bs ON kb.MaBS = bs.MaBS

LEFT JOIN PhanCongKB pc ON kb.MaKB = pc.MaKB
LEFT JOIN YTa yt ON pc.MaYT = yt.MaYT

LEFT JOIN DichVuKB dvkb ON kb.MaKB = dvkb.MaKB
LEFT JOIN DichVu dv ON dvkb.MaDichVu = dv.MaDichVu

LEFT JOIN SuDungThietBiKB tbkb ON kb.MaKB = tbkb.MaKB
LEFT JOIN ThietBiYTe tb ON tbkb.MaThietBi = tb.MaThietBi

WHERE h.MaBA = 'BA-CD1323-4591'
GROUP BY kb.MaKB
ORDER BY kb.ThoiGian DESC;