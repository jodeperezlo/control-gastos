// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);
