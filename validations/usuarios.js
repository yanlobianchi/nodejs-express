var url = require('url');

module.exports = function(req) {
	var createUrl = url.parse(req.url).pathname === "/usuarios/create";
	req.assert('nome', 'Informe o seu nome.').notEmpty();
	if (createUrl) {
		req.assert('email', 'E-mail inválido.').isEmail();
		req.assert('password', 'A senha deve conter de 6 a 10 caracteres.').len(6, 10);
	}
	var validateErros = req.validationErrors() || [];
	
	//verificar se a senha confere
	if (req.body.password !== req.body.password_confirmar) {
		validateErros.push({msg: 'Senha não confere.'});
	}
	if (validateErros.length > 0) {
		validateErros.forEach(function(e) {
			req.flash('erro', e.msg);
		});
		return false;
	} else {
		return true;
	}
};
