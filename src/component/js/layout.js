import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

function Template(props){
	return(
		<>
			<ul>
				<li><a href='/tweet'>Tweet</a></li>
				<li><a href='/input'>Input</a></li>
				<li><a href='/suport'>Support</a></li>
			</ul>
		</>
	)
}
export default Template;