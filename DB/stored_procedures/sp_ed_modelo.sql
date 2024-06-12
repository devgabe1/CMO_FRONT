DROP PROCEDURE IF EXISTS sp_ed_modelo;
DELIMITER //

CREATE PROCEDURE sp_ed_modelo (
    IN id INTEGER,
    IN desc_modelo VARCHAR(100),
    IN oper CHAR(1)
    -- OUT mensagem VARCHAR(50)
)
BEGIN
    IF oper = 'U' THEN
        UPDATE Modelo
        SET desc_modelo = desc_modelo
        WHERE id_modelo = id;
    ELSEIF oper = 'D' THEN
        DELETE FROM Modelo
        WHERE id_modelo = id;
    END IF;

   -- SET mensagem = 'Operação realizada com sucesso';
END //

DELIMITER ;
