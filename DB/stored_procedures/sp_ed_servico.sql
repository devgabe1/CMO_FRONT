DROP PROCEDURE IF EXISTS sp_ed_servico;
DELIMITER //
CREATE PROCEDURE sp_ed_servico (
	IN id INTEGER,
    IN tit VARCHAR(50),
    IN descr VARCHAR(200),
    IN img VARCHAR(200),
	IN ord INTEGER,
    IN url varchar(100),
    IN atv BOOLEAN,
    IN oper CHAR(1)
    -- OUT mensagem VARCHAR(50)
    )
BEGIN
	IF(oper = 'U') THEN
    UPDATE servico
    SET titulo_servico = tit,
		desc_servico = descr,
        img_servico = img,
        fl_servico = atv,
        url_servico = url,
        ordem_apresentacao = ord
        WHERE id_servico = id;
	ELSE
		UPDATE servico
		SET fl_servico = FALSE
		WHERE id_servico = id;
        END IF;
	-- SET mensagem = 'Operação realizada com sucesso';
END //
delimiter ;