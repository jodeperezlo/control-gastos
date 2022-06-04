// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { BudgetControl } from './BudgetControl';
import { NewBudget } from './NewBudget';

export const Header = ({
	budget,
	spents,
	setSpents,
	setBudget,
	isValidBudget,
	setIsValidBudget,
}) => {
	return (
		<div>
			<header>
				<h1>Planifica tus Gastos</h1>

				{isValidBudget ? (
					<BudgetControl
						budget={budget}
						spents={spents}
						setBudget={setBudget}
						setSpents={setSpents}
						setIsValidBudget={setIsValidBudget}
					/>
				) : (
					<NewBudget
						budget={budget}
						setBudget={setBudget}
						setIsValidBudget={setIsValidBudget}
					/>
				)}
			</header>
		</div>
	);
};
