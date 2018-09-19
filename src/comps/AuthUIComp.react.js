//AuthUIComp

import React, { Component, Fragment } from 'react'

import AppBar from '@material-ui/core/Button';



class AuthUIComp extends Component {
	constructor(props){
		super(props)
		this.state = {isLoggedIn:false, isAutoLogin:false, googleUser:{displayName:'',photoURL:''}}
		this.onLoginWithGoogle = this.onLoginWithGoogle.bind(this);
	}
	componentWillReceiveProps(nextProps){
		var isLoggedIn = false
    if(nextProps.isAutoLoginSuccess===true){
      isLoggedIn = true
    }
    //this.setState({isAutoLogin:nextProps.isAutoLoginSuccess,isLoggedIn:isLoggedIn})
	}
	render(){
		var that = this;
		console.log('render : this.state',this.state);
		return(
        <div>
        	AuthUIComp
        </div>
			)
	}// END render

	onLoginWithGoogle(event){
		console.log('onLoginWithGoogle')
	}

}// END Class


// Theme
// ref: https://material-ui-next.com/customization/themes/#withtheme-component-component
//export default withTheme()(AuthUIComp);
// Style
//export default withStyles(styles)(AuthUIComp);
// Default
export default AuthUIComp;