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
			manager.setMessage(response.success,'Кошелёк пополнен!');
		} else {
		 	manager.setMessage(response.success, response.error);
		}
	});
};

manager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response.success,'Конвертация прошла успешно!');
		} else {
		 	manager.setMessage(response.success, response.error);
		}
	});
};

manager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response.success,'Средства переведены!');
		} else {
		 	manager.setMessage(response.success, response.error);
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
			favorite.setMessage(response.success,'Новый контакт добавлен!');
		} else {
		 	favorite.setMessage(response.success, response.error);
		}
	});
};

favorite.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			manager.updateUsersList(response.data);
			favorite.setMessage(response.success,'Контакт успешно удален!');
		} else {
		 	favorite.setMessage(response.success, response.error);
		}
	});
};