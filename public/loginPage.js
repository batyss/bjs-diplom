'use strict';
let form = new UserForm();

form.loginFormCallback = data => {
	ApiConnector.login(data,response => {
		if (response.success === true) {
			location.reload();
		} else {
			form.setLoginErrorMessage('Ошибка авторизации');
		}
	});
};

form.registerFormCallback = data => ApiConnector.register(data,response => {
	if (response.success === true) {
			location.reload();
		} else {
			form.setRegisterErrorMessage('Ошибка регистрации');
		}
	});
