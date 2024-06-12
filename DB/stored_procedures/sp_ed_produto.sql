DROP PROCEDURE IF EXISTS sp_ed_produto;
DELIMITER //

CREATE PROCEDURE sp_ed_produto (
    IN id INTEGER,
    IN descricao VARCHAR(100),
    IN idCliente INTEGER,
    IN idTipo INTEGER,
    IN idMarca INTEGER,
    IN idModelo INTEGER,
    IN numeroSerie VARCHAR(50),
    IN capacidadeProduto INTEGER,
    IN problemaProduto VARCHAR(1000),
    IN dataCadastro DATETIME,
    IN atv BOOLEAN,
    IN oper CHAR(1)
)
BEGIN
    IF oper = 'U' THEN
        UPDATE Produto
        SET desc_produto = descricao,
            id_cliente = idCliente,
            id_tipo = idTipo,
            id_marca = idMarca,
            id_modelo = idModelo,
            nr_serie = numeroSerie,
            capacidade = capacidadeProduto,
            problema = problemaProduto,
            dt_cadastro = dataCadastro,
            fl_produto = atv
        WHERE id_produto = id;
        SELECT 'Produto atualizado com sucesso' AS message;
    ELSEIF oper = 'D' THEN
        UPDATE Produto
        SET fl_produto = FALSE
        WHERE id_produto = id;
        SELECT 'Produto desativado com sucesso' AS message;
    END IF;
END //

DELIMITER ;
