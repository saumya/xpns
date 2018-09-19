//AuthUIComp

import React, { Component, Fragment } from 'react'

import Button from '@material-ui/core/Button';



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
        <Fragment>
        	<div style={{ marginTop:'4em', }}>
            <Button variant="contained" color="primary" style={{ paddingTop:'1em', margin:'1em' }} onClick={this.onLoginWithGoogle}> Login With Google </Button> 
          </div>
        </Fragment>
			)
	}// END render

	onLoginWithGoogle(event){
		console.log('AuthUIComp:onLoginWithGoogle');
		var that = this;
		var firebaseRef = this.props.firebaseRef;// 'this' refers to the class because of the 'bind()' we did in the 'constructor'
	}

}// END Class


// Theme
// ref: https://material-ui-next.com/customization/themes/#withtheme-component-component
//export default withTheme()(AuthUIComp);
// Style
//export default withStyles(styles)(AuthUIComp);
// Default
export default AuthUIComp;