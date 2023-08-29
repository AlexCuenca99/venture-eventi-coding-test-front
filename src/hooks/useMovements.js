import { useState } from 'react';
import {
	getMovementsTypesApi,
	getMovementsApi,
	updateMovementApi,
	addMovementApi,
	deleteMovementApi,
	getMovementTypesReportApi,
	getMovementsIntervalReportApi,
	addMovementTypeApi,
	updateMovementTypeApi,
	deleteMovementTypeApi,
} from 'api/movements';
import { useAuth } from 'hooks';

export function useMovements() {
	const { auth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [movementsTypes, setMovementsTypes] = useState([]);
	const [movements, setMovements] = useState([]);
	const [movementsReport, setMovementsReport] = useState([]);
	const [movementsIntervalReport, setMovementsIntervalReport] = useState([]);

	const getMovementsTypes = async () => {
		try {
			setLoading(true);
			const response = await getMovementsTypesApi(auth.token);
			setMovementsTypes(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const addMovementType = async (formValue) => {
		try {
			setLoading(true);
			const response = await addMovementTypeApi(auth.token, formValue);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const updateMovementType = async (formValue, id) => {
		try {
			setLoading(true);
			const response = await updateMovementTypeApi(
				auth.token,
				id,
				formValue
			);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const deleteMovementType = async (id) => {
		try {
			setLoading(true);
			const response = await deleteMovementTypeApi(auth.token, id);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};
	const getMovements = async (bank) => {
		try {
			setLoading(true);
			const response = await getMovementsApi(auth.token, bank);
			setMovements(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const updateMovement = async (formValue, id) => {
		try {
			setLoading(true);
			const response = await updateMovementApi(auth.token, formValue, id);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const addMovement = async (formValue) => {
		try {
			setLoading(true);
			const response = await addMovementApi(auth.token, formValue);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const deleteMovement = async (id) => {
		try {
			setLoading(true);
			const response = await deleteMovementApi(auth.token, id);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const getMovementTypesReport = async () => {
		try {
			setLoading(true);
			const response = await getMovementTypesReportApi(auth.token);
			setMovementsReport(response);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};
	const getMovementsIntervalReport = async (minInterval, maxInterval) => {
		try {
			setLoading(true);
			const response = await getMovementsIntervalReportApi(
				auth.token,
				minInterval,
				maxInterval
			);
			setMovementsIntervalReport(response);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};
	return {
		loading,
		movementsTypes,
		movements,
		movementsReport,
		movementsIntervalReport,

		getMovementsTypes,
		getMovements,
		updateMovement,
		addMovement,
		deleteMovement,
		getMovementTypesReport,
		getMovementsIntervalReport,
		addMovementType,
		updateMovementType,
		deleteMovementType,
	};
}
