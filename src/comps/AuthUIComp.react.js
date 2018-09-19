//AuthUIComp

import React, { Component, Fragment } from 'react'

import Button from '@material-ui/core/Button';

import * as firebase from 'firebase'



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
		var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    // ref: https://firebase.google.com/docs/auth/web/google-signin?authuser=0 
    //desktop : popup
    firebaseRef.auth().signInWithPopup(provider).then(function(result) {
    //mobile : redirect
    //firebaseRef.auth().signInWithRedirect(provider).then(function(result) {
      var token = result.credential.accessToken; //Google AccessToken
      var user = result.user; //SignedIn User
      /*
      var database = firebase.database(); //DB Service
      var currentUserDBPath = 'paid/'+result.user.uid; 
      var databaseRef = firebase.database().ref(currentUserDBPath);
      */
      var gUID = result.user.uid;
      //console.log('photourl',result.user.photoURL);
      var gUser = { displayName : result.user.displayName,
                    email : result.user.email,
                    photoURL : result.user.photoURL
                  }
      that.setState({ isLoggedIn:true, googleUser:gUser });
      //console.log('Google AccessToken',token);
      //console.log('User',user);
      that.props.loginSuccessCallback(token,gUser,gUID);
    }).catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.group('Auth Error');
        console.log('ERROR',error);
        console.log('errorCode',errorCode);
        console.log('errorMessage',errorMessage);
        console.log('email',email);
        console.log('credential',credential);
        console.groupEnd();

        that.props.errorCallback(errorMessage);
    });
	}// onLoginWithGoogle

}// END Class


// Theme
// ref: https://material-ui-next.com/customization/themes/#withtheme-component-component
//export default withTheme()(AuthUIComp);
// Style
//export default withStyles(styles)(AuthUIComp);
// Default
export default AuthUIComp;