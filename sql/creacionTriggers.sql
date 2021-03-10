-- TRIGGERS

--user trigger, encripta la password
delimiter //
CREATE TRIGGER `trUserInsert` BEFORE INSERT ON userDR FOR EACH ROW
BEGIN
	IF NEW.pass IS NOT NULL THEN
		SET NEW.pass = SHA2(NEW.pass,0);
    END IF;
END //
delimiter ;
delimiter //
CREATE TRIGGER `trUserUpdate` BEFORE UPDATE ON userDR FOR EACH ROW
BEGIN
	IF NEW.pass IS NOT NULL THEN
		SET NEW.pass = SHA2(NEW.pass,0);
    END IF;
END //
delimiter ;