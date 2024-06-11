SELECT desc_marca, 
       logo_marca,
       url_marca
	FROM Marca
 WHERE fl_marca = TRUE;
 
 SELECT titulo_servico,
        desc_servico,
        img_servico,
        url_servico
	FROM Servico
 WHERE fl_servico = TRUE
 ORDER BY ordem_apresentacao;