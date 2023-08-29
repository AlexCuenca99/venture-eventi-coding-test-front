import React, { useEffect, useState } from 'react';

import { useMovements } from 'hooks';
import { Grid, Header, Segment } from 'semantic-ui-react';

import {
	MovementTypesTotalCountChart,
	MovementsTotalCountChart,
} from 'components';

export function Homepage() {
	const {
		getMovementTypesReport,
		getMovementsIntervalReport,
		movementsReport,
		movementsIntervalReport,
	} = useMovements();

	const [minInterval, setMinInterval] = useState('');
	const [maxInterval, setMaxInterval] = useState('');

	useEffect(() => {
		document.title = 'Inicio';
		getMovementTypesReport();
	}, []);

	useEffect(() => {
		getMovementsIntervalReport(minInterval, maxInterval);
	}, [minInterval, maxInterval]);

	return (
		<Grid stackable columns="equal">
			<Grid.Row>
				<Header as="h2" content="Inicio" />
			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<Segment>
						<MovementTypesTotalCountChart
							movementsReport={movementsReport}
							title={
								'Cantidad de transacciones por tipo de movimiento'
							}
						/>
					</Segment>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<Segment>
						<MovementsTotalCountChart
							movementsIntervalReport={movementsIntervalReport}
							title="Cantidad de transacciones por intervalo"
							setMinInterval={setMinInterval}
							setMaxInterval={setMaxInterval}
						/>
					</Segment>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
