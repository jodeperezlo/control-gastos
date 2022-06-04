// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';

export const Message = ({ children, type }) => {
	return <div className={`alerta ${type}`}>{children}</div>;
};
