DELIMITER //

CREATE PROCEDURE SP_Ins_Produto (
    IN descricao VARCHAR(100),
    IN idCliente INTEGER,
    IN idTipo INTEGER,
    IN idMarca INTEGER,
    IN idModelo INTEGER,
    IN numeroSerie VARCHAR(50),
    IN capacidadeProduto INTEGER,
    IN problemaProduto VARCHAR(1000),
    IN dataCadastro DATETIME
)
BEGIN
    DECLARE produtoExists INT;

    -- Verificar se o produto já existe pela descrição
    SELECT COUNT(*) INTO produtoExists
    FROM Produto 
    WHERE desc_produto = descricao;

    IF produtoExists > 0 THEN
        SELECT 'Esse produto já existe no BD' AS message;
    ELSE
        INSERT INTO Produto (
            desc_produto, id_cliente, id_tipo, id_marca, id_modelo, nr_serie, 
            capacidade, problema, dt_cadastro
        )
        VALUES (
            descricao, idCliente, idTipo, idMarca, idModelo, numeroSerie, 
            capacidadeProduto, problemaProduto, dataCadastro
        );

        SELECT 'Produto inserido com sucesso' AS message;
    END IF;
END //

DELIMITER ;
