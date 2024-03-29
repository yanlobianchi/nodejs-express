module.exports = function(req) {
	req.assert('nome', 'Informe o nome.').notEmpty();
	if (req.body.email !== '') {
		req.assert('email', 'E-mail inválido.').isEmail();
	}
	var validacoesErros = req.validationErrors() || [];
	if (validacoesErros.length > 0) {
		validacoesErros.forEach(function(e) {
			req.flash('erro', e.msg);
		});
		return false;
	}
	return true;
};
