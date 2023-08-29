import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';

import { useMovements } from 'hooks';

export function AddEditMovementTypeForm(props) {
	const { movementType, onClose, onRefetch } = props;

	const { addMovementType, updateMovementType } = useMovements();

	const formik = useFormik({
		initialValues: initialValues(movementType),
		validationSchema: Yup.object(validationSchema()),
		validateOnMount: true,
		validateOnChange: false,
		validateOnBlur: true,

		onSubmit: async (formValue) => {
			try {
				if (movementType)
					await updateMovementType(formValue, movementType.id);
				else await addMovementType(formValue);
				onClose();
				onRefetch();
			} catch (error) {
				onClose();
				throw error;
			}
		},
	});
	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Input
				label="Codigo"
				name="code"
				placeholder="Ingrese el codigo"
				onChange={formik.handleChange}
				error={formik.errors.code && formik.touched.code}
				onBlur={formik.handleBlur}
				value={formik.values.code}
			/>
			<Form.Input
				label="Nombre"
				name="name"
				placeholder="Ingrese el nombre"
				onChange={formik.handleChange}
				error={formik.errors.name && formik.touched.name}
				onBlur={formik.handleBlur}
				value={formik.values.name}
			/>
			<Form.Input
				label="Descripcion"
				name="description"
				placeholder="Ingrese la descripcion"
				onChange={formik.handleChange}
				error={formik.errors.name && formik.touched.description}
				onBlur={formik.handleBlur}
				value={formik.values.description}
			/>
			<Form.Button
				type="submit"
				primary
				fluid
				disabled={formik.isSubmitting || !formik.isValid}
			>
				{movementType ? 'Actualizar' : 'Crear'}
			</Form.Button>
		</Form>
	);
}

function initialValues(data) {
	return {
		code: data ? data.code : '',
		name: data ? data.name : '',
		description: data ? data.description : '',
	};
}

function validationSchema() {
	return {
		code: Yup.string().required('El codigo es requerido'),
		name: Yup.string().required('El nombre es requerido'),
		description: Yup.string().required('La descripcion es requerida'),
	};
}
