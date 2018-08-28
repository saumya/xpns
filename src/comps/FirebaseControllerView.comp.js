/**
 *
 * Controlls the Firebase initialisation and communication
 * FirebaseControllerView.comp
 * 
 * ref : 
 */

 import React, { Component, Fragment } from 'react'

 import * as firebase from "firebase";

 import FirebaseConfig from '../utils/FirebaseConfig'


 class FirebaseControllerView extends Component {
 	constructor(props){
     super(props)
     this.firebaseApp = null;
 	}
 	render(){
 		return(
 				<div>
 					FirebaseControllerView.comp.js
 				</div>
 			)
 	}
 	componentDidMount(){
    console.group('FirebaseControllerView : componentDidMount :')
    console.log('FirebaseControllerView : componentDidMount :')
    console.groupEnd()
    // initialise Firebase
    var myApp = firebase.initializeApp(FirebaseConfig.getThisAppConfig().firebase,'Xpns-4.0.0');
    console.log('App Name',myApp.name);
    //console.log('Database',myApp.database()); //firebase.database()
    //console.log('Storage',myApp.storage()); //firebase.storage()
    this.firebaseApp = myApp;
    var that = this
   }
 	componentWillUnmount(){
    console.log('FirebaseControllerView : componentWillUnmount :')
   }
 }

 export default FirebaseControllerView;
