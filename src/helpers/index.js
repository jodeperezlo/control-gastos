// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const generateID = () => {
	const random = Math.random().toString(36).substring(2, 15);
	const timestamp = Date.now().toString(36);
	return `${random}${timestamp}`;
};

export const formatedDate = (date) => {
	const d = new Date(date);
	const options = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	};
	return d.toLocaleDateString('es-MX', options);
};
