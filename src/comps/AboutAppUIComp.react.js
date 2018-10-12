//
// AboutAppUIComp
// ref: Unicode Symbols: https://unicode-table.com/en/#oriya
//


import React, { Component, Fragment } from 'react';

import { MuiThemeProvider, createMuiTheme, withTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from '../logo.svg';

import TweenMax from "gsap/TweenMax";



//const AboutAppUIComp = ({ children }) =>
class AboutAppUIComp extends Component{
	constructor(children){
		super(children)
		// reference to the DOM node
	  this.myElement = document.getElementsByClassName("App-logo");;
	  // reference to the animation
	  //this.myTween = null;
	}
	componentDidMount(){
		//this.myTween = TweenMax.to(this.myElement, 1, {x: 100, y: 100});
		//this.myTween = TweenMax.to(this.myElement, 1, {rotation: 360, scale:1.5});
		TweenMax.to(this.myElement, 2, { rotation:360, scale:1.5 });
		TweenMax.to(this.myElement, 3, { delay:2, rotation:0, scale:1.0 });
		TweenMax.to(this.myElement, 15, { delay:6, rotation:360, scale:1.5 });
	}
	render(){
		return(
			<Fragment>
				<center> 
				  <header className="App-header-about" style={{marginTop:"3em"}}>
				    <img src={logo} className="App-logo" alt="logo" width="200px" />
				    <h1 className="App-title">Expense</h1>
				    { this.children }
				  </header>
			  </center>
		  </Fragment>
		)
	}

	
  
	
	
}

export default AboutAppUIComp;