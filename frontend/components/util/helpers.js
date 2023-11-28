// helper function to remove numerical values
export function letterify(value) {
	return value.replace(/[^a-zA-Z]/g, "");
}

// helper function to remove non-numerical values
export function numberify(value) {
	return value.replace(/\D/g, "");
}

// helper function to validate "amount" values
export function doubleify(value) {
	return (
		value
			// remove non-digit characters except for one decimal
			.replace(/[^\d.]/g, "")
			// ensure there is at most one decimal
			.replace(/(\..*)\./g, "$1")
			// allows up to two digits after the decimal point
			.replace(/(?:\.(\d{0,2}))\d*$/g, ".$1")
	);
}

export function toFloat(value) {
	return parseFloat(doubleify(value));
}

export function formatUsername(value) {
	return value.startsWith("@") ? value : `@${value}`;
}

export function formatCardNumber(value) {
	value = numberify(value);
	// ensures there is a space between every 4 digits
	return value.replace(/(\d{4})/g, "$1 ").trim();
}

export function formatExpirationDate(value) {
	value = numberify(value);

	return value.replace(/(\d{2})(\d{0,2})/g, (match, p1, p2) => `${p1}${p2 ? "/" + p2 : ""}`);
}

export function formatYearMonth(value) {
	const [month, year] = value.split("/");

	return `${year}-${month}`;
}

export function formatPhoneNumber(value) {
	value = numberify(value);

	let npa = value.slice(0, 3); // number planning area (area code)
	let nxx = value.slice(3, 6); // exchange/central office code
	let sln = value.slice(6, 10); // subscriber line number (last 4 digits)

	return npa + (nxx.length > 0 ? "-" : "") + nxx + (sln.length > 0 ? "-" : "") + sln;
}

export function fullName({ firstName, lastName }) {
	return firstName + " " + lastName;
}

export async function postPM(mapping = "/", body, ...pathVariables) {
	return fetch(formatMapping(mapping, pathVariables), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	})
		.then((response) => {
			console.log(response);
			if (response.status > 409) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
			return Promise.reject(error);
		});
}

export async function fetchPM(mapping = "/", ...pathVariables) {
	return fetch(formatMapping(mapping, pathVariables), { method: "GET" })
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
			return Promise.reject(error);
		});
}

// ???
export function formatMapping(mapping, ...pathVariables) {
	// const lastIndex = mapping.lastIndexOf("/");

	// if (lastIndex !== 21) mapping = mapping.substring(0, lastIndex);
	// return mapping;

	pathVariables[0].forEach((pathVariable) => {
		mapping = mapping.concat("/").concat(pathVariable);
	});

	console.log(mapping);
	return "http://localhost:8080" + mapping;
}

// helper function to shorten/hide card number
export function shorten(input) {
	if (!input || input?.length <= 4) return input;
	return input.slice(input.length - 4);
}

// helper function to check if form is empty
// return true if all fields are empty
export function emptyFields(...fields) {
	return fields.some((field) => field === "");
}

export function isRecipient(record, account) {
	return record.recipientID === account.accountID || record.username === account.username;
}

export function getOtherPartyUUID(record, account) {
	return isRecipient(record, account) ? record.payerID : record.recipientID;
}

export function checkSufficientBalance(balance, amount) {
	return balance >= amount;
}