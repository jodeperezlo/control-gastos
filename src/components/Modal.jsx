// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState, useEffect } from 'react';
import { Message } from './Message';
import CloseIcon from '../img/cerrar.svg';

export const Modal = ({
	updateSpent,
	setModal,
	animateModal,
	setAnimateModal,
	saveSpent,
	setUpdateSpent,
}) => {
	const [concept, setConcept] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [message, setMessage] = useState('');
	const [uuid, setUuid] = useState('');
	const [timestamp, setTimestamp] = useState('');

	useEffect(() => {
		if (Object.keys(updateSpent).length > 0) {
			setConcept(updateSpent.concept);
			setDescription(updateSpent.description);
			setAmount(updateSpent.amount);
			setCategory(updateSpent.category);
			setUuid(updateSpent.uuid);
			setTimestamp(updateSpent.timestamp);
		}
	}, []);

	const handleCloseModal = () => {
		setAnimateModal(false);
		setTimeout(() => {
			setModal(false);
			setUpdateSpent({});
		}, 500);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage('');

		if ([concept, amount, category].includes('')) {
			setMessage(
				'Es necesario que completes todos los campos (excepto la descripción) para poder agregar el nuevo gasto.'
			);
			return;
		}
		saveSpent({ concept, description, amount, category, uuid, timestamp });
		handleCloseModal();
		setConcept('');
		setDescription('');
		setAmount('');
		setCategory('');
	};

	return (
		<div className='modal'>
			<div className='cerrar-modal' onClick={handleCloseModal}>
				<img src={CloseIcon} alt='Cierra el modal' />
			</div>

			<form
				className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
				onSubmit={handleSubmit}
			>
				<legend>{updateSpent.uuid ? 'Edita el gasto' : 'Nuevo Gasto'}</legend>

				<div className='campo'>
					<label htmlFor='concept'>Concepto</label>
					<input
						type='text'
						id='concept'
						name='concept'
						placeholder='Escribe un nombre para el gasto'
						value={concept}
						onChange={(e) => {
							setConcept(e.target.value);
							setMessage('');
						}}
					/>
				</div>
				<div className='campo'>
					<label htmlFor='description'>
						Descripción <span>(Opcional)</span>
					</label>
					<textarea
						id='description'
						name='description'
						rows='3'
						placeholder='Escribe más detalles acerca del gasto'
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
							setMessage('');
						}}
					/>
				</div>
				<div className='campo'>
					<label htmlFor='amount'>Monto</label>
					<input
						type='number'
						id='amount'
						name='amount'
						placeholder='Escribe el monto del gasto: ej. 100'
						value={amount}
						onChange={(e) => {
							setAmount(Number(e.target.value));
							setMessage('');
						}}
					/>
				</div>
				<div className='campo'>
					<label htmlFor='category'>Categoría</label>
					<select
						id='category'
						name='category'
						value={category}
						onChange={(e) => {
							setCategory(e.target.value);
							setMessage('');
						}}
					>
						<option value=''>--- Elige una opción --- </option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='hogar'>Hogar</option>
						<option value='gastos'>Gastos varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>

				{message && <Message type='error'>{message}</Message>}

				<input
					type='submit'
					value={updateSpent.uuid ? 'Guarda los cambios' : 'Agrega el gasto'}
				/>
			</form>
		</div>
	);
};
