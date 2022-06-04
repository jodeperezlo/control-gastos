// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';

export const Filters = ({ filter, setFilter }) => {
	return (
		<div className='filtros sombra contenedor'>
			<form>
				<div className='campo'>
					<label htmlFor='filter'>Filtra tus gastos</label>
					<select value={filter} onChange={(e) => setFilter(e.target.value)}>
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
			</form>
		</div>
	);
};
