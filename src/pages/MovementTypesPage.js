import React, { useEffect, useState } from 'react';
import { useMovements } from 'hooks';
import { Button, Header, Menu } from 'semantic-ui-react';

import {
	MovementsTypesTable,
	ModalBasic,
	AddEditMovementTypeForm,
} from 'components';

export function MovementTypesPage() {
	const { getMovementsTypes, loading, movementsTypes, deleteMovementType } =
		useMovements();

	const [titleModal, setTitleModal] = useState('');
	const [contentModal, setContentModal] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const openCloseModal = () => setShowModal((prev) => !prev);
	const onRefetch = () => setRefetch((prev) => !prev);

	useEffect(() => {
		getMovementsTypes();
	}, [refetch]);

	const handleAddMovementType = () => {
		setTitleModal('Crear nuevo tipo de movimiento');
		setContentModal(
			<AddEditMovementTypeForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
			/>
		);
		openCloseModal();
	};
	const handleUpdateMovementType = (data) => {
		setTitleModal('Editar tipo de movimiento');
		setContentModal(
			<AddEditMovementTypeForm
				movementType={data}
				onClose={openCloseModal}
				onRefetch={onRefetch}
			/>
		);
		openCloseModal();
	};

	const handleDeleteMovementType = async (data) => {
		try {
			await deleteMovementType(data.id);
			onRefetch();
			openCloseModal();
		} catch (error) {
			throw error;
		}
	};

	return (
		<>
			<Menu borderless>
				<Menu.Item>
					<Header>Crear tipo de movimiento</Header>
				</Menu.Item>
				<Menu.Item position="right">
					<Button onClick={handleAddMovementType} primary>
						Crear tipo de movimiento
					</Button>
				</Menu.Item>
			</Menu>
			<MovementsTypesTable
				movementsTypes={movementsTypes}
				handleUpdateMovementType={handleUpdateMovementType}
				handleDeleteMovementType={handleDeleteMovementType}
			/>

			<ModalBasic
				show={showModal}
				title={titleModal}
				onClose={openCloseModal}
			>
				{contentModal}
			</ModalBasic>
		</>
	);
}
