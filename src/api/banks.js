import { BASE_API } from 'utils/constants';
import { merge, omit } from 'lodash';

export async function getBanksApi(token, client) {
	try {
		if (!client) client = '';

		const url = `${BASE_API}/api/v1/banks/?search=${client}`;
		const params = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function updateBankApi(token, formValue, id) {
	try {
		const url = `${BASE_API}/api/v1/banks/${id}/`;
		const params = {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formValue),
		};
		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}

		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

export async function addBankApi(token, formValue) {
	try {
		const url = `${BASE_API}/api/v1/banks/`;
		const params = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formValue),
		};
		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}

		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
export async function getBanksByIdApi(token, client) {
	try {
		if (!client) client = '';

		const url = `${BASE_API}/api/v1/banks/${client}/`;
		const params = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}
