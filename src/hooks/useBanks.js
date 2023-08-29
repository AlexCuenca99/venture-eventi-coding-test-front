import { useState } from 'react';
import {
	getBanksApi,
	getBanksByIdApi,
	updateBankApi,
	addBankApi,
} from 'api/banks';
import { useAuth } from 'hooks';

export function useBanks() {
	const { auth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [banks, setBanks] = useState([]);

	const getBanks = async (client) => {
		try {
			setLoading(true);
			const response = await getBanksApi(auth.token, client);
			setBanks(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const getBanksById = async (id) => {
		try {
			setLoading(true);
			const response = await getBanksByIdApi(auth.token, id);
			setBanks(response);
			setLoading(false);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const updateBank = async (formValue, id) => {
		try {
			setLoading(true);
			const response = await updateBankApi(auth.token, formValue, id);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const addBank = async (formValue) => {
		try {
			setLoading(true);
			const response = await addBankApi(auth.token, formValue);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	return {
		loading,
		banks,
		getBanks,
		getBanksById,
		updateBank,
		addBank,
	};
}
