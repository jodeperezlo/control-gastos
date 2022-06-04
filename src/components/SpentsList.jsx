// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Spent } from './Spent';

export const SpentsList = ({
	spents,
	filter,
	filteredSpents,
	setUpdateSpent,
	deleteSpent,
}) => {
	return (
		<div className='listado-gastos contenedor listado-gastos-sombra'>
			{filter ? (
				<>
					<h2>
						{filteredSpents.length
							? `Lista de tus gastos de la categoría de ${filter}`
							: 'Aún no agregas ningún gasto en esta categoría'}
					</h2>
					{filteredSpents.map((spent) => (
						<Spent
							key={spent.uuid}
							spent={spent}
							setUpdateSpent={setUpdateSpent}
							deleteSpent={deleteSpent}
						/>
					))}
				</>
			) : (
				<>
					<h2>
						{spents.length ? 'Lista de todos tus gastos' : 'Aún no agregas ningún gasto'}
					</h2>
					{spents.map((spent) => (
						<Spent
							key={spent.uuid}
							spent={spent}
							setUpdateSpent={setUpdateSpent}
							deleteSpent={deleteSpent}
						/>
					))}
				</>
			)}
		</div>
	);
};
