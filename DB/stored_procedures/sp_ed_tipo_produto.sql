DROP PROCEDURE IF EXISTS sp_ed_tipoProduto;
DELIMITER //

CREATE PROCEDURE sp_ed_tipoProduto (
    IN id INTEGER,
    IN desc_tipo VARCHAR(100),
    IN oper CHAR(1)
   -- OUT mensagem VARCHAR(50)
)
BEGIN
    IF oper = 'U' THEN
        UPDATE TipoProduto
        SET desc_tipo = desc_tipo
        WHERE id_tipo = id;
    ELSEIF oper = 'D' THEN
        DELETE FROM TipoProduto
        WHERE id_tipo = id;
    END IF;

   -- SET mensagem = 'Operação realizada com sucesso';
END //

DELIMITER ;
