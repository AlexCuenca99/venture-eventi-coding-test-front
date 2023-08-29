import React, { useEffect, useState } from 'react';
import { useBanks, useMovements } from 'hooks';
import {
	BankHeader,
	BankMovementsTable,
	AddEditMovementForm,
	ModalBasic,
} from 'components';
import { Button } from 'semantic-ui-react';

export function AccountMovementsPage() {
	const { movements, getMovements, deleteMovement } = useMovements();

	const [titleModal, setTitleModal] = useState('');
	const [contentModal, setContentModal] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [selectedBank, setSelectedBank] = useState(null);

	const openCloseModal = () => setShowModal((prev) => !prev);

	const onRefetch = () => setRefetch((prev) => !prev);

	useEffect(() => {
		getMovements(selectedBank?.id);
	}, [selectedBank, refetch]);

	const handleAddMovement = () => {
		setTitleModal('Editar mesa');
		setContentModal(
			<AddEditMovementForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
				selectedBank={selectedBank}
			/>
		);
		openCloseModal();
	};

	const handleUpdateMovement = (data) => {
		setTitleModal('Editar mesa');
		setContentModal(
			<AddEditMovementForm
				onClose={openCloseModal}
				onRefetch={onRefetch}
				movement={data}
			/>
		);
		openCloseModal();
	};

	const handleDeleteMovement = async (data) => {
		try {
			await deleteMovement(data.id);
			onRefetch();
		} catch (error) {
			throw error;
		}
	};

	return (
		<div>
			<BankHeader
				setSelectedBank={setSelectedBank}
				selectedBank={selectedBank}
			/>
			<Button
				onClick={handleAddMovement}
				disabled={!selectedBank?.id && true}
			>
				Crear movimiento
			</Button>
			<BankMovementsTable
				movements={movements}
				updateMovement={handleUpdateMovement}
				deleteMovement={handleDeleteMovement}
			/>
			<ModalBasic
				show={showModal}
				onClose={openCloseModal}
				title={titleModal}
				children={contentModal}
			/>
		</div>
	);
}
