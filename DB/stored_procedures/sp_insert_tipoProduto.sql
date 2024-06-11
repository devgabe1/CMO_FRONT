DELIMITER //

CREATE PROCEDURE SP_Ins_TipoProduto (
    descricao VARCHAR(100)
)
BEGIN
    DECLARE tipoExists INT;

    -- Verificar se a marca já existe
    SELECT COUNT(*) INTO tipoExists
    FROM tipoproduto 
    WHERE desc_tipo = descricao;

    IF tipoExists > 0 THEN
        SELECT 'Esse tipo já existe no BD' AS message;
    ELSE
        INSERT INTO tipoproduto (desc_tipo)
        VALUES (descricao);

        SELECT 'Tipo inserido com sucesso' AS message;
    END IF;
END //

DELIMITER ;
