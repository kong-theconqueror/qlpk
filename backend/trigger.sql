DROP TRIGGER IF EXISTS `trg_chuabenh_before_insert`;

DELIMITER $$

CREATE TRIGGER trg_chuabenh_before_insert
BEFORE INSERT ON ChuaBenh
FOR EACH ROW
BEGIN
    DECLARE ngayKham DATETIME;

    -- Lấy ngày khám tương ứng với bệnh án
    SELECT kb.ThoiGian INTO ngayKham
    FROM KhamBenh kb
    JOIN ChanDoan cd ON cd.MaKB = kb.MaKB
    JOIN HoSoBenhAn hs ON hs.MaCD = cd.MaCD
    WHERE hs.MaBA = NEW.MaBA
    LIMIT 1;

    -- Kiểm tra: thời gian chữa phải >= thời gian khám
    IF (ngayKham IS NOT NULL AND NEW.ThoiGian < ngayKham) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Thời gian chữa bệnh phải muộn hơn hoặc bằng thời gian khám bệnh.';
    END IF;
END$$

DELIMITER ;


DROP TRIGGER IF EXISTS `trg_check_hsba_closed_before_insert_chuabenh`;

DELIMITER $$

CREATE TRIGGER trg_check_hsba_closed_before_insert_chuabenh
BEFORE INSERT ON ChuaBenh
FOR EACH ROW
BEGIN
    DECLARE v_trangthai VARCHAR(255);
    
    -- Lấy trạng thái của Hồ sơ bệnh án
    SELECT TrangThai INTO v_trangthai
    FROM HoSoBenhAn
    WHERE MaBA = NEW.MaBA;
    
    -- Nếu không tìm thấy HSBA, báo lỗi
    IF v_trangthai IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Hồ sơ bệnh án không tồn tại.';
    END IF;
    
    -- Kiểm tra trạng thái ""đã đóng""
    IF v_trangthai = 'đã đóng' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể thêm chữa bệnh: Hồ sơ bệnh án đã đóng.';
    END IF;
END$$

DELIMITER ;


DROP TRIGGER IF EXISTS `trg_chuabenh_before_update`;

DELIMITER $$

CREATE TRIGGER trg_chuabenh_before_update
BEFORE UPDATE ON ChuaBenh
FOR EACH ROW
BEGIN
    DECLARE ngayKham DATETIME;

    -- Lấy ngày khám tương ứng với bệnh án
    SELECT kb.ThoiGian INTO ngayKham
    FROM KhamBenh kb
    JOIN ChanDoan cd ON cd.MaKB = kb.MaKB
    JOIN HoSoBenhAn hs ON hs.MaCD = cd.MaCD
    WHERE hs.MaBA = NEW.MaBA
    LIMIT 1;

    -- Kiểm tra: thời gian chữa phải >= thời gian khám
    IF (ngayKham IS NOT NULL AND NEW.ThoiGian < ngayKham) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Thời gian chữa bệnh phải muộn hơn hoặc bằng thời gian khám bệnh.';
    END IF;
END$$

DELIMITER ;


DROP TRIGGER IF EXISTS `trg_check_thoigianmo_hsba`;

DELIMITER $$

CREATE TRIGGER trg_check_thoigianmo_hsba
BEFORE INSERT ON HoSoBenhAn
FOR EACH ROW
BEGIN
    DECLARE v_thoigian_kham DATETIME;
    
    -- Lấy thời gian khám bệnh từ bảng KhamBenh thông qua ChanDoan
    SELECT kb.ThoiGian INTO v_thoigian_kham
    FROM ChanDoan cd
    JOIN KhamBenh kb ON cd.MaKB = kb.MaKB
    WHERE cd.MaCD = NEW.MaCD;
    
    -- Nếu không tìm thấy (do FK đã đảm bảo, nhưng vẫn kiểm tra an toàn)
    IF v_thoigian_kham IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không tìm thấy buổi khám bệnh tương ứng với chẩn đoán.';
    END IF;
    
    -- Kiểm tra: ThoiGianMo phải >= ThoiGian khám
    IF NEW.ThoiGianMo < v_thoigian_kham THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 
            'Thời gian mở hồ sơ bệnh án phải lớn hơn hoặc bằng thời gian khám bệnh.';
    END IF;
    
END$$

DELIMITER ;


DROP TRIGGER IF EXISTS `trg_check_mabs_hsba_match_khambenh`;

DELIMITER $$

CREATE TRIGGER trg_check_mabs_hsba_match_khambenh
BEFORE INSERT ON HoSoBenhAn
FOR EACH ROW
BEGIN
    DECLARE v_mabs_khambenh VARCHAR(255);
    
    -- Lấy MaBS từ buổi khám bệnh thông qua ChanDoan → KhamBenh
    SELECT kb.MaBS INTO v_mabs_khambenh
    FROM ChanDoan cd
    JOIN KhamBenh kb ON cd.MaKB = kb.MaKB
    WHERE cd.MaCD = NEW.MaCD;
    
    -- Nếu không tìm thấy (do FK, nhưng an toàn)
    IF v_mabs_khambenh IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không tìm thấy bác sĩ khám bệnh tương ứng với chẩn đoán.';
    END IF;
    
    -- Kiểm tra: MaBS của HSBA phải == MaBS của buổi khám
    IF NEW.MaBS IS NOT NULL AND NEW.MaBS != v_mabs_khambenh THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 
            'Bác sĩ phụ trách hồ sơ bệnh án phải là bác sĩ đã khám bệnh.';
    END IF;
    
    -- Nếu NEW.MaBS là NULL → có thể tự động gán (tùy chọn)
    -- Hoặc bắt buộc phải có → thêm điều kiện
    IF NEW.MaBS IS NULL THEN
        SET NEW.MaBS = v_mabs_khambenh; -- Tự động gán (tùy chọn)
        -- Hoặc: SIGNAL nếu muốn bắt buộc nhập
        -- SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phải chỉ định bác sĩ phụ trách.';
    END IF;
    
END$$

DELIMITER ;

DROP TRIGGER IF EXISTS `trg_check_thoigianmo_hsba_update`;

DELIMITER $$

CREATE TRIGGER trg_check_thoigianmo_hsba_update
BEFORE UPDATE ON HoSoBenhAn
FOR EACH ROW
BEGIN
    DECLARE v_thoigian_kham DATETIME;
    
    -- Lấy thời gian khám bệnh từ ChanDoan → KhamBenh
    SELECT kb.ThoiGian INTO v_thoigian_kham
    FROM ChanDoan cd
    JOIN KhamBenh kb ON cd.MaKB = kb.MaKB
    WHERE cd.MaCD = NEW.MaCD;
    
    -- Nếu không tìm thấy (do FK, nhưng an toàn)
    IF v_thoigian_kham IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không tìm thấy buổi khám bệnh tương ứng với chẩn đoán.';
    END IF;
    
    -- Kiểm tra: ThoiGianMo (mới) phải >= ThoiGian khám
    IF NEW.ThoiGianMo < v_thoigian_kham THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 
            'Thời gian mở hồ sơ bệnh án phải lớn hơn hoặc bằng thời gian khám bệnh.';
    END IF;
    
    -- (Tùy chọn) Kiểm tra ThoiGianKetThuc nếu có
    IF NEW.ThoiGianKetThuc IS NOT NULL AND NEW.ThoiGianKetThuc < NEW.ThoiGianMo THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Thời gian kết thúc phải lớn hơn thời gian mở hồ sơ.';
    END IF;
    
END$$

DELIMITER ;