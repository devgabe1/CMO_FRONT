DELIMITER //

CREATE PROCEDURE SP_Ins_Marca (
     descricao VARCHAR(100),
     url VARCHAR(100),
     logo VARCHAR(100),
     flag BOOLEAN
)
BEGIN
    DECLARE marcaExists INT;

    -- Verificar se a marca já existe
    SELECT COUNT(*) INTO marcaExists
    FROM Marca 
    WHERE desc_marca = descricao;

    IF marcaExists > 0 THEN
        SELECT 'Essa marca já existe no BD' AS message;
    ELSE
        INSERT INTO Marca (desc_marca, logo_marca, url_marca, fl_marca)
        VALUES (descricao, logo, url, flag);

        SELECT 'Marca inserida com sucesso' AS message;
    END IF;
END //

DELIMITER ;
