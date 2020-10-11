'use strict';
let button = new LogoutButton();
button.action = () => ApiConnector.logout(response => {
	if (response.success) {
			location.reload();
		} 
});

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} 
});

let board = new RatesBoard();

function requestRates() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			board.clearTable();
			board.fillTable(response.data);
		}
	});
}

requestRates();

setInterval(requestRates,60000);

let manager = new MoneyManager();
manager.addMoneyCallback = data => {
	ApiConnector.addMoney(data,response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Кошелёк пополнен!');
		} else {
		 	manager.setMessage(response, response.error);
		}
	});
};

manager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Конвертация прошла успешно!');
		} else {
		 	manager.setMessage(response, response.error);
		}
	});
};

manager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Средства переведены!');
		} else {
		 	manager.setMessage(response, response.error);
		}
	});
};

let favorite = new FavoritesWidget();
ApiConnector.getFavorites(response => {
	if (response.success) {
		favorite.clearTable();
		favorite.fillTable(response.data);
		manager.updateUsersList(response.data);
	}
});

favorite.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			manager.updateUsersList(response.data);
			manager.setMessage(response,'Новый контакт добавлен!');
		} else {
		 	manager.setMessage(response, response.error);
		}
	});
};

favorite.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			manager.updateUsersList(response.data);
			manager.setMessage(response,'Контакт успешно удален!');
		} else {
		 	manager.setMessage(response, response.error);
		}
	});
};