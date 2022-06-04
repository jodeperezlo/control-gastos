// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState } from 'react';
import { Message } from './Message';

export const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
	const [message, setMessage] = useState('');

	const handlePresupuesto = (e) => {
		e.preventDefault();
		if (!budget || budget <= 0) {
			setMessage(
				'El presupuesto que intentas definir no es válido. Ingresa un número mayor a 0.'
			);
			return;
		}
		setMessage('');
		setIsValidBudget(true);
	};
	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form onSubmit={handlePresupuesto} className='formulario'>
				<div className='campo'>
					<label htmlFor='budget'>Define tu presupuesto inicial</label>
					<input
						className='nuevo-presupuesto'
						type='number'
						id='budget'
						placeholder='Escribe tu presupuesto para iniciar'
						value={budget}
						onChange={(e) => setBudget(Number(e.target.value))}
					/>
				</div>
				<input type='submit' value='Guarda tu presupuesto' />
				{message && <Message type='error'>{message}</Message>}
			</form>
		</div>
	);
};
