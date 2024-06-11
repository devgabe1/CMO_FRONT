DELIMITER //

CREATE PROCEDURE SP_Ins_Modelo (
    descricao VARCHAR(100)
)
BEGIN
    DECLARE modeloExists INT;

    -- Verificar se a marca já existe
    SELECT COUNT(*) INTO modeloExists
    FROM modelo 
    WHERE desc_modelo = descricao;

    IF modeloExists > 0 THEN
        SELECT 'Esse modelo já existe no BD' AS message;
    ELSE
        INSERT INTO modelo (desc_modelo)
        VALUES (descricao);

        SELECT 'Modelo inserido com sucesso' AS message;
    END IF;
END //

DELIMITER ;
