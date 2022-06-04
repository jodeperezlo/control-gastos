// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import { formatedDate } from '../helpers';
import SavingMoneyIcon from '../img/icono_ahorro.svg';
import HomeIcon from '../img/icono_casa.svg';
import FoodIcon from '../img/icono_comida.svg';
import SpentsIcon from '../img/icono_gastos.svg';
import LeisureIcon from '../img/icono_ocio.svg';
import HealthIcon from '../img/icono_salud.svg';
import SubscriptionsIcon from '../img/icono_suscripciones.svg';
import 'react-swipeable-list/dist/styles.css';

const ICONS_DICTIONARY = {
	ahorro: SavingMoneyIcon,
	comida: FoodIcon,
	casa: HomeIcon,
	gastos: SpentsIcon,
	ocio: LeisureIcon,
	salud: HealthIcon,
	suscripciones: SubscriptionsIcon,
};

export const Spent = ({ spent, setUpdateSpent, deleteSpent }) => {
	const { uuid, concept, description, amount, category, timestamp } = spent;

	const leadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={() => setUpdateSpent(spent)}>Edita</SwipeAction>
		</LeadingActions>
	);

	const trailingActions = () => (
		<TrailingActions>
			<SwipeAction destructive={true} onClick={() => deleteSpent(uuid)}>
				Elimina
			</SwipeAction>
		</TrailingActions>
	);

	return (
		<SwipeableList>
			<SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
				<div className='gasto sombra'>
					<div className='contenido-gasto'>
						<img src={ICONS_DICTIONARY[category]} alt='Icono del gasto' />
						<div className='descripcion-gasto'>
							<p className='categoria'>{category}</p>
							<p className='nombre-gasto'>{concept}</p>
							{description !== '' && (
								<p className='fecha-gasto'>
									<span>{description}</span>
								</p>
							)}
							<p className='fecha-gasto'>
								Agregado el: <span>{formatedDate(timestamp)}</span>
							</p>
						</div>
					</div>
					<p className='cantidad-gasto'>$ {amount}</p>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
};
