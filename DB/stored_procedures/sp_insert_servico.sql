
DELIMITER //

CREATE PROCEDURE SP_Ins_Servico (
    IN titulo VARCHAR(100),
    IN descricao VARCHAR(500),
    IN img VARCHAR(100),
    IN ordem INTEGER,
    IN url VARCHAR(100),
   -- OUT id INTEGER
)
BEGIN
    DECLARE servicoExists INT;

    -- Verificar se o serviço já existe pelo título
    SELECT COUNT(*) INTO servicoExists
    FROM Servico 
    WHERE titulo_servico = titulo;

    IF servicoExists > 0 THEN
        SELECT 'Esse serviço já existe no BD' AS message;
    ELSE
        INSERT INTO Servico (titulo_servico, desc_servico, img_servico, ordem_apresentacao, url_servico)
        VALUES (titulo, descricao, img, ordem, url);

        SELECT 'Serviço inserido com sucesso' AS message;
        -- SET id = NEW.id_servico;
    END IF;
END //

DELIMITER ;
