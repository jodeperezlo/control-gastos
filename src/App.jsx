// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { SpentsList } from './components/SpentsList';
import { Modal } from './components/Modal';
import { generateID } from './helpers';
import NewSpentIcon from './img/nuevo-gasto.svg';
import 'sweetalert2/src/sweetalert2.scss';

const App = () => {
	const [spents, setSpents] = useState(
		localStorage.getItem('spents') ? JSON.parse(localStorage.getItem('spents')) : []
	);
	const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) || 0);
	const [isValidBudget, setIsValidBudget] = useState(false);
	const [modal, setModal] = useState(false);
	const [animateModal, setAnimateModal] = useState(false);
	const [updateSpent, setUpdateSpent] = useState({});
	const [filter, setFilter] = useState('');
	const [filteredSpents, setFilteredSpents] = useState([]);

	useEffect(() => {
		if (Object.keys(updateSpent).length > 0) {
			setModal(true);

			setTimeout(() => {
				setAnimateModal(true);
			}, 300);
		}
	}, [updateSpent]);

	useEffect(() => {
		localStorage.setItem('budget', budget || 0);
	}, [budget]);

	useEffect(() => {
		localStorage.setItem('spents', JSON.stringify(spents));
	}, [spents]);

	useEffect(() => {
		if (filter) {
			setFilteredSpents(spents.filter((spent) => spent.category === filter));
		}
	}, [filter]);

	useEffect(() => {
		const budgetLS = Number(localStorage.getItem('budget'));
		if (budgetLS > 0) {
			setIsValidBudget(true);
		}
	}, []);

	useEffect(() => {
		const spentsLS = JSON.parse(localStorage.getItem('spents'));
		if (spentsLS) {
			setSpents(spentsLS);
		}
	}, []);

	const handleNewSpent = () => {
		setModal(true);
		setUpdateSpent({});

		setTimeout(() => {
			setAnimateModal(true);
		}, 300);
	};

	const saveSpent = (spent) => {
		if (spent.uuid) {
			const updatedSpents = spents.map((spentState) =>
				spentState.uuid === spent.uuid ? spent : spentState
			);
			setSpents(updatedSpents);
		} else {
			spent.uuid = generateID();
			spent.timestamp = Date.now();
			setSpents([...spents, spent]);
		}

		setAnimateModal(false);
		setTimeout(() => {
			setModal(false);
			setUpdateSpent({});
		}, 500);
	};

	const deleteSpent = (uuid) => {
		const updatedSpents = spents.filter((spentState) => spentState.uuid !== uuid);
		setSpents(updatedSpents);
	};

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				spents={spents}
				budget={budget}
				setSpents={setSpents}
				setBudget={setBudget}
				isValidBudget={isValidBudget}
				setIsValidBudget={setIsValidBudget}
			/>

			{isValidBudget && (
				<>
					<main>
						<Filters filter={filter} setFilter={setFilter} />
						<SpentsList
							spents={spents}
							setUpdateSpent={setUpdateSpent}
							deleteSpent={deleteSpent}
							filter={filter}
							filteredSpents={filteredSpents}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img src={NewSpentIcon} alt='Nuevo gasto' onClick={handleNewSpent} />
					</div>
				</>
			)}

			{modal && (
				<Modal
					updateSpent={updateSpent}
					setModal={setModal}
					animateModal={animateModal}
					setAnimateModal={setAnimateModal}
					saveSpent={saveSpent}
					setUpdateSpent={setUpdateSpent}
				/>
			)}
		</div>
	);
};

export default App;
