import { merge, omit } from 'lodash';
import { BASE_API } from 'utils/constants';

export async function getMovementsTypesApi(token) {
	try {
		const url = `${BASE_API}/api/v1/movements-types/`;
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

export async function addMovementTypeApi(token, formValue) {
	try {
		const url = `${BASE_API}/api/v1/movements-types/`;
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

export async function updateMovementTypeApi(token, id, formValue) {
	try {
		const url = `${BASE_API}/api/v1/movements-types/${id}/`;
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

export async function deleteMovementTypeApi(token, id) {
	try {
		const url = `${BASE_API}/api/v1/movements-types/${id}/`;
		const params = {
			method: 'DELETE',
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
		return true;
	} catch (error) {
		throw error;
	}
}

export async function getMovementsApi(token, bank) {
	try {
		if (!bank) return [];

		const url = `${BASE_API}/api/v1/movements/?bank=${bank}`;
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

export async function updateMovementApi(token, formValue, id) {
	try {
		const url = `${BASE_API}/api/v1/movements/${id}/`;
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

export async function addMovementApi(token, formValue) {
	try {
		const url = `${BASE_API}/api/v1/movements/`;
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

export async function deleteMovementApi(token, id) {
	try {
		const url = `${BASE_API}/api/v1/movements/${id}`;
		const params = {
			method: 'DELETE',
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

		return true;
	} catch (error) {
		throw error;
	}
}

export async function getMovementTypesReportApi(token) {
	try {
		const url = `${BASE_API}/api/v1/reports/movement-types/`;
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

export async function getMovementsIntervalReportApi(
	token,
	minInterval,
	maxInterval
) {
	try {
		const url =
			minInterval && maxInterval
				? `${BASE_API}/api/v1/reports/movements-interval/?value__gte=${minInterval}&value__lte=${maxInterval}`
				: `${BASE_API}/api/v1/reports/movements-interval/`;

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
