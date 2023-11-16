export function numberify(value) {
	return value.replace(/\D/g, "");
}

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

export function formatCardNumber(value) {
	value = numberify(value);

	return value.replace(/(\d{4})/g, "$1 ").trim();
}

export function formatExpirationDate(value) {
	value = numberify(value);

	return value.replace(/(\d{2})(\d{0,2})/g, (match, p1, p2) => `${p1}${p2 ? "/" + p2 : ""}`);
}

export function formatPhoneNumber(value) {
	value = numberify(value);

	let npa = value.slice(0, 3); // number planning area (area code)
	let nxx = value.slice(3, 6); // exchange/central office code
	let sln = value.slice(6, 10); // subscriber line number (last 4 digits)

	return npa + (nxx.length > 0 ? "-" : "") + nxx + (sln.length > 0 ? "-" : "") + sln;
}
