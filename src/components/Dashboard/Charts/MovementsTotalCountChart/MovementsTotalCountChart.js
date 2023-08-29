import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Form, Header, Input } from 'semantic-ui-react';

export function MovementsTotalCountChart(props) {
	const { movementsIntervalReport, setMinInterval, setMaxInterval, title } =
		props;

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		validateOnMount: true,
		validateOnChange: false,
		validateOnBlur: true,
		onSubmit: (values) => {
			setMinInterval(values.min_value);
			setMaxInterval(values.max_value);
		},
	});

	return (
		<>
			<Header as="h3" size="medium">
				{title}
			</Header>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group inline>
					<Form.Field width={3}>
						<Input
							label={{ basic: true, content: '$' }}
							labelPosition="right"
							type="number"
							value={formik.values.min_value}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Valor mínimo"
							name="min_value"
							error={
								formik.errors.min_value &&
								formik.touched.min_value
							}
						/>
					</Form.Field>

					<Form.Field width={3}>
						<Input
							label={{ basic: true, content: '$' }}
							labelPosition="right"
							type="number"
							value={formik.values.max_value}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Valor máximo"
							name="max_value"
							error={
								formik.errors.max_value &&
								formik.touched.max_value
							}
						/>
					</Form.Field>
					<Form.Button content="Buscar" primary type="submit" />
				</Form.Group>
			</Form>
			<ResponsiveContainer width="100%" height={200}>
				<LineChart
					width={730}
					height={250}
					data={movementsIntervalReport}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

function initialValues() {
	return {
		min_value: '',
		max_value: '',
	};
}

function validationSchema() {
	return {
		min_value: Yup.number().required('El valor mínimo es requerido'),
		max_value: Yup.number().required('El valor maximo es requerido'),
	};
}
