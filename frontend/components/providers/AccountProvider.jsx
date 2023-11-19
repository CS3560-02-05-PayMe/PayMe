import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const useAccount = () => {
	return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
	const [account, setAccount] = useState(null);
	const [addressList, setAddressList] = useState([]);
	const [cardList, setCardList] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	const updateAccount = (data) => {
		setAccount(data);
		setLoggedIn(data !== null);
	};

	const updateAddressList = (list) => {
		setAddressList(list);
	};

	const updateCardList = (list) => {
		setCardList(list);
	};

	const updateLoggedIn = (status) => {
		setLoggedIn(status);
	};

	return <AccountContext.Provider value={{ account, updateAccount, addressList, updateAddressList, cardList, updateCardList, loggedIn, updateLoggedIn }}>{children}</AccountContext.Provider>;
};
