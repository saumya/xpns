//

import React, { Fragment } from 'react';
//import logo from './logo.svg';
//import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import RootControllerView from './comps/RootControllerView.comp'


const theme = createMuiTheme({
	palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
});


function App() {
  return (
    	<Fragment>
    		<CssBaseline /> 
    		<MuiThemeProvider theme={theme}>
    			<RootControllerView /> 
    		</MuiThemeProvider>
    	</Fragment>
  	);
}

//export default App;
export default withTheme()(App);
