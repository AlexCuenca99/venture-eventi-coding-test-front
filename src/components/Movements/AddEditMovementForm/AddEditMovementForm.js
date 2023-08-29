import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useMovements } from 'hooks';
import { Button, Form } from 'semantic-ui-react';
import { map } from 'lodash';

export function AddEditMovementForm(props) {
	const { movement, onClose, onRefetch, selectedBank } = props;

	const [options, setOptions] = useState([]);
	const { updateMovement, getMovementsTypes, movementsTypes, addMovement } =
		useMovements();

	useEffect(() => {
		getMovementsTypes();
	}, []);

	useEffect(() => {
		setOptions(movementTypes(movementsTypes));
	}, [movementsTypes]);

	const formik = useFormik({
		initialValues: initialValues(movement),
		validationSchema: Yup.object(validationSchema()),
		validateOnBlur: true,
		validateOnChange: false,

		onSubmit: async (formValue) => {
			if (movement) {
				await updateMovement(formValue, movement.id);
				onClose();
				onRefetch();
			} else {
				await addMovement({ ...formValue, bank: selectedBank.id });
				onClose();
				onRefetch();
			}
		},
	});
	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Dropdown
				placeholder="Tipo"
				fluid
				selection
				search
				options={options}
				value={formik.values.mo_type}
				error={formik.errors.mo_type}
				onChange={(_, data) =>
					formik.setFieldValue('mo_type', data.value)
				}
			/>
			<Form.Input
				name="value"
				placeholder="Valor de movimiento"
				value={formik.values.value}
				onChange={formik.handleChange}
				error={formik.errors.value}
			/>
			<Button
				type="submit"
				primary
				fluid
				content={movement ? 'Actualizar' : 'Crear'}
			/>
		</Form>
	);
}

function initialValues(data) {
	return {
		mo_type: data?.mo_type || '',
		value: data?.value || '',
	};
}

function validationSchema() {
	return {
		mo_type: Yup.string().required(),
		value: Yup.number().required(),
	};
}

function movementTypes(data) {
	return map(data, (item) => ({
		key: item.id,
		value: item.id,
		text: item.name,
	}));
}
