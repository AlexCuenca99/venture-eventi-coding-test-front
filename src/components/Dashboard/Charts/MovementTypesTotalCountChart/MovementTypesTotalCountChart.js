import React from 'react';
import { Header } from 'semantic-ui-react';
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

export function MovementTypesTotalCountChart(props) {
	const { movementsReport, title } = props;

	return (
		<>
			<Header as="h3" size="medium">
				{title}
			</Header>
			<ResponsiveContainer width="100%" height={200}>
				<LineChart
					data={movementsReport}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="amount" stroke="#8884d8" />
					<Line type="monotone" dataKey="count" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}
