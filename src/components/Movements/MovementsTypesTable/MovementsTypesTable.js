import { map } from 'lodash';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

export function MovementsTypesTable(props) {
	const {
		movementsTypes,
		handleUpdateMovementType,
		handleDeleteMovementType,
	} = props;
	console.log(movementsTypes);
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Codigo</Table.HeaderCell>
					<Table.HeaderCell>Nombre</Table.HeaderCell>
					<Table.HeaderCell>Descripcion</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{map(movementsTypes, (movementType, _) => (
					<Table.Row key={movementType.id}>
						<Table.Cell>{movementType.code}</Table.Cell>
						<Table.Cell>{movementType.name}</Table.Cell>
						<Table.Cell>{movementType.description}</Table.Cell>
						<Actions
							movementType={movementType}
							handleDeleteMovementType={handleDeleteMovementType}
							handleUpdateMovementType={handleUpdateMovementType}
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { movementType, handleDeleteMovementType, handleUpdateMovementType } =
		props;

	return (
		<Table.Cell collapsing>
			<Button.Group basic size="small">
				<Button
					icon={<MdEdit size={17} />}
					onClick={() => handleUpdateMovementType(movementType)}
				/>
				<Button
					icon={<MdDeleteForever size={17} />}
					onClick={() => handleDeleteMovementType(movementType)}
				/>
			</Button.Group>
		</Table.Cell>
	);
}
