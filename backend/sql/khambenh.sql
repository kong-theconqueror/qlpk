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