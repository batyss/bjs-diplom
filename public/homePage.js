'use strict';
let button = new LogoutButton();
button.action = () => ApiConnector.logout(response => {
	if (response) {
			location.reload();
		} 
});

ApiConnector.current(response => {
	if (response) {
		ProfileWidget.showProfile(response.data);
	} 
});

let board = new RatesBoard();

function requestRates() {
	ApiConnector.getStocks(response => {
		if (response) {
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
		try {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Кошелёк пополнен!');
		} catch(e) {
		 	manager.setMessage(response, e);
		}
	});
};

manager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		try {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Конвертация прошла успешно!');
		} catch(e) {
		 	manager.setMessage(response, e);
		}
	});
};

manager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		try {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response,'Средства переведены!');
		} catch(e) {
		 	manager.setMessage(response, e);
		}
	});
};

let favorite = new FavoritesWidget();
ApiConnector.getFavorites(response => {
	if (response) {
		favorite.clearTable();
		favorite.fillTable(response.data);
		manager.updateUsersList(response.data);
	}
});

favorite.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		try {
			favorite.clearTable();
			favorite.fillTable(response.data);
			manager.updateUsersList(response.data);
			manager.setMessage(response,'Новый контакт добавлен!');
		} catch(e) {
		 	manager.setMessage(response, e);
		}
	});
};

favorite.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		try {
			favorite.clearTable();
			favorite.fillTable(response.data);
			manager.updateUsersList(response.data);
			manager.setMessage(response,'Контакт успешно удален!');
		} catch(e) {
		 	manager.setMessage(response, e);
		}
	});
};