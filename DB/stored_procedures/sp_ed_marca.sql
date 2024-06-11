drop procedure if exists sp_ed_marca;
DELIMITER //

CREATE PROCEDURE sp_ed_marca (
    IN id INTEGER,
    IN descr VARCHAR(100),
    IN logo VArchar(100),
    IN url varchar(100),
    IN atv BOOLEAN,
    IN oper CHAR(1),
    OUT mensagem VARCHAR(50)
)
BEGIN
    IF oper = 'U' THEN
        UPDATE marca
        SET desc_marca = descr,
        logo_marca = logo,
        url_marca = url,
        fl_marca = atv
        WHERE id_marca = id;
		SELECT 'Marca atualizada com sucesso' AS message;
    ELSEIF oper = 'D' THEN
        UPDATE marca
        Set fl_marca = FALSE
        WHERE id_marca = id;
        SELECT 'Marca desativada com sucesso' AS message;
    END IF;
END //

DELIMITER ;
