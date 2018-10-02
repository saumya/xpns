//
// AboutAppUIComp
// ref: Unicode Symbols: https://unicode-table.com/en/#oriya
//


import React, { Component, Fragment } from 'react';

import { MuiThemeProvider, createMuiTheme, withTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from '../logo.svg';



const AboutAppUIComp = ({ children }) =>
	<Fragment>
		<center> 
		  <header className="App-header-about" style={{marginTop:"3em"}}>
		    <img src={logo} className="App-logo" alt="logo" width="200px" />
		    <h1 className="App-title">Expense</h1>
		    { children }
		  </header>
	  </center>
  </Fragment>


export default AboutAppUIComp;