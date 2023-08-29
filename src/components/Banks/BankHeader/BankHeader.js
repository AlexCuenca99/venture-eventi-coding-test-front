import { useFormik } from 'formik';
import { find, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useBanks } from 'hooks';

export function BankHeader(props) {
	const { updateBank, addBank, getBanks, banks } = useBanks();

	const { setSelectedBank, selectedBank } = props;
	const [banksOptions, setBanksOptions] = useState([]);

	useEffect(() => {
		getBanks();
	}, []);

	useEffect(() => {
		setBanksOptions(formatBankOptions(banks));
	}, [banks]);

	const formik = useFormik({
		initialValues: initialValues(selectedBank),
		validationSchema: Yup.object(validationSchema()),
		validateOnChange: false,
		validateOnBlur: true,
		validateOnMount: true,

		onSubmit: async (formValue) => {
			try {
				if (selectedBank) {
					await updateBank(formValue, selectedBank.id);
				} else await addBank(formValue);
			} catch (error) {
				throw error;
			}
		},
	});

	const handleBankFilter = (_, data) => {
		var response = find(banks, { id: data.value })
			? find(banks, { id: data.value })
			: null;

		setSelectedBank(response);
	};

	useEffect(() => {
		formik.setFieldValue('client', selectedBank?.client || '');
		formik.setFieldValue('date', selectedBank?.date || '');
		formik.setFieldValue('number', selectedBank?.number || '');

		formik.validateForm();
	}, [selectedBank]);

	return (
		<>
			<Segment>
				<h3>Seleccione un cliente</h3>
				<Dropdown
					clearable
					search
					selection
					options={banksOptions}
					placeholder="Seleccione un usuario"
					onChange={handleBankFilter}
				/>
			</Segment>

			<Form onSubmit={formik.handleSubmit}>
				<Form.Group>
					<Form.Input
						label="Nombre del cliente"
						type="text"
						placeholder="Nombre del cliente"
						required
						name="client"
						value={formik.values.client}
						onChange={formik.handleChange}
						error={formik.errors.client && formik.touched.client}
					/>
					<Form.Input
						type="date"
						label="Fecha de creacion"
						required
						name="date"
						value={formik.values.date}
						onChange={formik.handleChange}
						error={formik.errors.date && formik.touched.date}
					/>
					<Form.Input
						type="text"
						label="Numero de cuenta"
						required
						name="number"
						value={formik.values.number}
						onChange={formik.handleChange}
						error={formik.errors.number && formik.touched.number}
					/>
					<Form.Button type="submit" primary>
						{selectedBank ? 'Actualizar' : 'Crear'}
					</Form.Button>
				</Form.Group>
			</Form>
		</>
	);
}

function formatBankOptions(data) {
	return map(data, (item, index) => ({
		key: index,
		text: item.client,
		value: item.id,
	}));
}

function validationSchema() {
	return {
		client: Yup.string().required().max(100, 'Maximo 100'),
		number: Yup.number().required(),
		date: Yup.date().required(),
	};
}

function initialValues(data) {
	return {
		client: data?.client || '',
		number: data?.number || '',
		date: data?.date || '',
	};
}
