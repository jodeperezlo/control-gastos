// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetControl = ({ budget, spents, setBudget, setSpents, setIsValidBudget }) => {
	const [available, setAvailable] = useState(0);
	const [spent, setSpent] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		const totalSpents = spents.reduce((total, spent) => total + spent.amount, 0);
		const totalAvailable = budget - totalSpents;
		const totalPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

		setSpent(totalSpents);
		setAvailable(totalAvailable);
		setPercentage(totalPercentage);
	}, [spents]);

	const amountFormated = (amount) => {
		return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
	};

	const handleResetApp = () => {
		Swal.fire({
			title: '¿Estás seguro de que deseas reiniciar la aplicación?',
			text: 'Se borrará toda la información y no podrá recuperarse.',
			icon: 'warning',
			showCancelButton: true,
			reverseButtons: true,
			background: '#f5f5f5',
			confirmButtonColor: '#BB201D',
			cancelButtonColor: '#64748b',
			confirmButtonText: 'Sí, elimina la información',
			cancelButtonText: 'No, conserva los datos',
		}).then((result) => {
			if (result.isConfirmed) {
				setIsValidBudget(false);
				setBudget(0);
				setSpents([]);
				Swal.fire({
					title: '¡Listo!',
					text: 'Se ha reiniciado la aplicación. Inicia de nuevo ingresando tu presupuesto actual.',
					icon: 'success',
					background: '#f5f5f5',
					confirmButtonColor: '#3b82f6',
					confirmButtonText: 'De acuerdo',
				});
			}
		});
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div className='grafica'>
				<CircularProgressbar
					styles={buildStyles({
						pathColor:
							percentage > 85 && percentage < 100
								? '#CAB12F'
								: percentage > 100
								? '#BB201D'
								: '#3b82f6',
						textColor:
							percentage > 85 && percentage < 100
								? '#CAB12F'
								: percentage > 100
								? '#BB201D'
								: '#3b82f6',
						trailColor: '#f5f5f5',
					})}
					value={percentage}
					text={`${percentage}% Gastado`}
				/>
			</div>
			<div className='contenido-presupuesto'>
				<button className='reset-app' type='button' onClick={handleResetApp}>
					Reinicia la app
				</button>
				<p>
					<span>Presupuesto inicial:</span> {amountFormated(budget)}
				</p>
				<p>
					<span
						className={`${
							percentage > 85 && percentage < 100
								? 'warning'
								: percentage > 100
								? 'negativo'
								: ''
						}`}
					>
						Dinero disponible:
					</span>{' '}
					{amountFormated(available)}
				</p>
				<p>
					<span>Dinero gastado:</span> {amountFormated(spent)}
				</p>
			</div>
		</div>
	);
};
