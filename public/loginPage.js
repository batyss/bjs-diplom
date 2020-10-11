'use strict';
let form = new UserForm();

form.loginFormCallback = data => {
	ApiConnector.login(data,response => {
		if (response.success) {
			location.reload();
		} else {
			form.setLoginErrorMessage(response.error);
		}
	});
};

form.registerFormCallback = data => ApiConnector.register(data,response => {
	if (response.success) {
			location.reload();
		} else {
			form.setRegisterErrorMessage(response.error);
		}
	});