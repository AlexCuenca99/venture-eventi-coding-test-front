import { map } from 'lodash';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

export function BankMovementsTable(props) {
	const { movements, updateMovement, deleteMovement } = props;
	console.log(movements);
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Tipo movimiento</Table.HeaderCell>
					<Table.HeaderCell>Valor</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{map(movements, (movement, _) => (
					<Table.Row key={movement.id}>
						<Table.Cell>{movement.mo_type_display}</Table.Cell>
						<Table.Cell>{movement.value}</Table.Cell>
						<Actions
							movement={movement}
							updateMovement={updateMovement}
							deleteMovement={deleteMovement}
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { movement, updateMovement, deleteMovement } = props;

	return (
		<Table.Cell collapsing>
			<Button.Group basic size="small">
				<Button
					icon={<MdEdit size={17} />}
					onClick={() => updateMovement(movement)}
				/>
				<Button
					icon={<MdDeleteForever size={17} />}
					onClick={() => deleteMovement(movement)}
				/>
			</Button.Group>
		</Table.Cell>
	);
}
