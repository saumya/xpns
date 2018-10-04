/**
 *
 * This is the Application Entry
 * RootControllerView.comp
 * This Contains the SideMenu,Firebase and AllState
 * ref : 
 */

	import React, { Component, Fragment } from 'react'

	import AppBar from '@material-ui/core/AppBar';
	import Toolbar from '@material-ui/core/Toolbar';
	import Typography from '@material-ui/core/Typography';
	//import Button from '@material-ui/core/Button';
	import IconButton from '@material-ui/core/IconButton';
	import Drawer from '@material-ui/core/Drawer';

	import Divider from '@material-ui/core/Divider';

	import Menu from '@material-ui/core/Menu';
	import MenuItem from '@material-ui/core/MenuItem';
	import MenuList from '@material-ui/core/MenuList';

	import ListItem from '@material-ui/core/ListItem';
	import ListItemIcon from '@material-ui/core/ListItemIcon';
	import ListItemText from '@material-ui/core/ListItemText';

	import MenuIcon from '@material-ui/icons/Menu';

	import ArrowBackIcon from '@material-ui/icons/ArrowBack';
	import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
	import VisibilityIcon from '@material-ui/icons/Visibility';
	import ViewListIcon from '@material-ui/icons/ViewList';
	import AssignmentIcon from '@material-ui/icons/Assignment';
	import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
	import StarBorderIcon from '@material-ui/icons/StarBorder';
	import FilterListIcon from '@material-ui/icons/FilterList';
	import ContentAdd from '@material-ui/icons/Add';
	import ErrorIcon from '@material-ui/icons/Error';
	import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

	import MenuNames,{ getMessages } from '../utils/MenuNames'
	import FirebaseUtil from '../utils/FirebaseUtil.util'

	import FirebaseControllerView from './FirebaseControllerView.comp'

	import AuthUIComp from './AuthUIComp.react'
	import AboutAppUIComp from './AboutAppUIComp.react'

	import UICompGivePayment from './UICompGivePayment.react'
	import UIReceivePayment from './UIReceivePayment.react'

	import UIPaidTo from './UIPaidTo.component'
	import UICategory from './UICategory.component'

	import UIViewPayments from './UIViewPayments.component'
	import UIFilterPayments from './UIFilterPayments.component'
	import UIFilterIncomes from './UIFilterIncomes.component'

/*
	import MessageInfo from './MessageInfo.component'
	import UIPopupMessage from './UIPopupMessage.react'
*/



 class RootControllerView extends Component {
 	constructor(props){
		super(props)
		this.state =  {
			isError:false,
	    errorMessage:'',
	    shouldShowPopUpMessage:false,
	    sUIPopupMessage:'',
	    isFirebaseInitDone: false,
	    isSideMenuOpen: false, 
	    intSelectedMenu:0, 
	    isLoggedIn:false, 
	    shouldWait:false,
	    isAutoLoginOnRestartSuccess:false, 
	    appUserObj:{},
	    allDataSnapshot: {
	      categories:{},
	      persons:{},
	      earnings: {},
	      spendings: {},
	    },
	    totalEarnings:0,
	    totalSpending:0,
	    viewObj: {
	      newViewName: MenuNames.getAllNames().generalMenu.HOME,
			}, 
			newViewName: MenuNames.getAllNames().generalMenu.HOME,
		}
		this.sNames = MenuNames.getAllNames().generalMenu;
		this.leftMenuNames = MenuNames.getAllNames().leftMenu;
		//
		this.onFirebaseInitDone = this.onFirebaseInitDone.bind(this);
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onAuthFail = this.onAuthFail.bind(this);
		
		this.firebaseApp = null;
		this.loggedInUser = null;
		// side menu
    this.onSideMenuItemClick = this.onSideMenuItemClick.bind(this);
    //
    this.addNewCategory = this.addNewCategory.bind(this);
    this.addNewPaidTo = this.addNewPaidTo.bind(this);
 	}
 	render(){
		 
		console.group('render')
		
		console.log('isSideMenuOpen', this.state.isSideMenuOpen)
		console.log('this.state.isLoggedIn',this.state.isLoggedIn)
		console.log('this.state.newViewName',this.state.newViewName)

		console.log('this.state.appUserObj.displayName',this.state.appUserObj.displayName)
		console.log('this.state.appUserObj.email',this.state.appUserObj.email)
		console.log('this.state.appUserObj.photoURL',this.state.appUserObj.photoURL)
		
		console.log('======== snapshot ========')
		console.log('this.state.allDataSnapshot',this.state.allDataSnapshot)
		console.log('this.state.totalEarnings',this.state.totalEarnings)
		console.log('======== / snapshot ========')

		console.groupEnd()

		var displayName = '';
    var _menuCompFirstMenu = null;
    if(this.state.isLoggedIn){
      displayName = this.state.appUserObj.displayName;
			_menuCompFirstMenu = 	(  
															<div> 
																<MenuItem data-name={this.leftMenuNames.PROFILE} onClick={this.onSideMenuItemClick}> {displayName} </MenuItem>
																<MenuItem data-name={this.leftMenuNames.EXPORT} onClick={this.onSideMenuItemClick}> Export Data </MenuItem>
															</div> 
														)
    }else{
			_menuCompFirstMenu = ( 
															<div>
																<MenuItem data-name={this.leftMenuNames.LOGIN} onClick={this.onSideMenuItemClick}> Login </MenuItem>
															</div>
														)
    }

 		return(
 				<Fragment>
					<FirebaseControllerView onFirebaseInitDone={this.onFirebaseInitDone} />
					<AppBar title="XpNS" position="fixed" color="primary">

					<Toolbar>
						<IconButton style={{marginLeft: -12,marginRight: 20,}} color="secondary" aria-label="Menu" onClick={this.handleLeftMenu}>
              <MenuIcon />
            </IconButton>
						<Typography variant="title" color="inherit" style={{'flexGrow': 1,}}>
							Expense
						</Typography>
        	</Toolbar>

					</AppBar>

					<div style={{marginLeft: 0, marginTop: 50}}>
					{ ( this.state.isError ? <div>{this.state.errorMessage}</div> : null ) }
					{ ( this.state.isLoggedIn ? null : <div>Login to continue.</div> ) }
					</div>

					
					{ this.getCompAndRender() }



					<Drawer open={this.state.isSideMenuOpen}
            onClose={(isSideMenuOpen) => this.setState({isSideMenuOpen:false})} 
            anchor="left">
						
						<MenuList>
							<div style={{ marginLeft:'0.6em', marginTop:'0.6em', fontSize:'0.6em'}}>Everyday</div>
							<MenuItem data-name={this.leftMenuNames.ADDRECEIVES} onClick={this.onSideMenuItemClick}> <ArrowForwardIcon /> Add Income </MenuItem>
							<MenuItem data-name={this.leftMenuNames.ADDPAYMENTS} onClick={this.onSideMenuItemClick}> <ArrowBackIcon /> Add Expense </MenuItem>
							<Divider/>
							<div style={{ marginLeft:'0.6em', marginTop:'0.6em', fontSize:'0.6em'}}>View</div>
							<MenuItem data-name={this.leftMenuNames.VIEWINCOMES} onClick={this.onSideMenuItemClick}> <VisibilityIcon /> View Income </MenuItem>
							<MenuItem data-name={this.leftMenuNames.FILTERINCOMES} onClick={this.onSideMenuItemClick}> <ViewListIcon /> Filter Income </MenuItem>
							<MenuItem data-name={this.leftMenuNames.VIEWPAYMENTS} onClick={this.onSideMenuItemClick}> <VisibilityIcon /> View Expense </MenuItem>
							<MenuItem data-name={this.leftMenuNames.FILTERPAYMENTS} onClick={this.onSideMenuItemClick}> <ViewListIcon /> Filter Expense </MenuItem>
							<Divider/>
							<div style={{ marginLeft:'0.6em', marginTop:'0.6em', fontSize:'0.6em'}}>Settings</div>
							<MenuItem data-name={this.leftMenuNames.CATEGORY} onClick={this.onSideMenuItemClick}> <AssignmentIcon /> Category </MenuItem>
							<MenuItem data-name={this.leftMenuNames.PAIDTO} onClick={this.onSideMenuItemClick}> <AssignmentIndIcon /> Paid-To / Received-From </MenuItem>
							<Divider/>
							<MenuItem data-name={this.leftMenuNames.ABOUT} onClick={this.onSideMenuItemClick}> <StarBorderIcon /> About </MenuItem>
							<Divider/>
							<div style={{ marginLeft:'0.6em', marginTop:'0.6em', fontSize:'0.6em'}}>Once in a while</div>
							{_menuCompFirstMenu}
						</MenuList>

					</Drawer>
 				</Fragment>
 			)
	 }
	componentDidMount(){}
	componentWillUnmount(){}
	// ========= Event handlers
	handleLeftMenu = event => {
		console.log('handleLeftMenu :')
		this.setState({isSideMenuOpen: !this.state.isSideMenuOpen});
	}
	onSideMenuItemClick = event => {
		console.log('onSideMenuItemClick :')
		var el = event.target;
    var menuName = el.dataset['name'];
    console.log('onSideMenuItemClick : MenuName=',menuName);

		var that = this;
		
		//
		this.setState({ 
			newViewName : menuName, 
			isError : false, 
			errorMessage : '', 
			isSideMenuOpen : false
		});
	}

	// callbacks
	onLoginSuccess = (googleUserAccessToken,firebaseUser,googleUserId) => {
		
		console.group('onLoginSuccess :')
		console.log('onLoginSuccess :')
		console.log(googleUserAccessToken,firebaseUser,googleUserId)
		console.log('==========================')
		console.log(firebaseUser.displayName)
		console.log(firebaseUser.email)
		console.log(firebaseUser.photoURL)
		console.groupEnd()
		// getting the data
		this.loggedInUser = firebaseUser;
    const firebaseUserDB = FirebaseUtil.getFirebaseAppData(this.firebaseApp,googleUserId);
    
    //console.log(firebaseUserDB)
    var that = this;

    firebaseUserDB.dbRefPaid.db.on('value', snapshot => {
    	console.log('AppComp : Paid : DB Change');

    	if(snapshot.val()===null){
    		//that.setState( {isError:true,errorMessage:'No Data yet!'} );
    	}else{
    		var categories = snapshot.val().projects
        var persons = snapshot.val().persons
        var spendings = snapshot.val().spendings
        var earnings = snapshot.val().earnings
    	}

    	var totalSpending = 0;
      var totalEarnings = 0;
      // spendings
      for (const key in spendings) {
        if (spendings.hasOwnProperty(key)) { 
          const element = spendings[key] 
          //console.log(key,':',element);
          element.key = key;
          totalSpending += Number(element.ammount)
        }
      }
      
      // earnings : adding 'key' in each object
      for (const key2 in earnings) {
        if (earnings.hasOwnProperty(key2)) { 
          const element2 = earnings[key2] 
          //console.log(key2,':',element2);
          element2.key = key2;
          totalEarnings += Number(element2.ammount)
        }
      }

      FirebaseUtil.addKeyToEachElement(categories)
      FirebaseUtil.addKeyToEachElement(persons)

      console.log('==================')
      console.log('==================')

      this.setState({ 
      								allDataSnapshot:
	      								{ 
	                        categories : categories,
	                        persons : persons,
	                        earnings : earnings,
	                        spendings : spendings
	                      },
                      totalEarnings:totalEarnings,
                      totalSpending:totalSpending 
                    });
      return false;
    })// END firebaseUserDB.dbRefPaid.db.on()

    // ================= Utility ==================================
    firebaseUserDB.dbRefPaid.db.on('child_added', function(data) {
      console.log('AppComp : Paid : child_added : ');
    })
    // received
    firebaseUserDB.dbRefReceived.db.on('value', snapshot => {
      console.log('AppComp : Received : DB Change');
      //console.log('snapshot',snapshot.val());
      //console.log('this.state',this.state);
      console.group('Received');
      console.log('TODO: work on receiving data flow');
      console.log('snapshot',snapshot.val());
      console.groupEnd();

      if(snapshot.val()===null){
      	// first time user
      	this.setState({isError:true,errorMessage:'Welcome '+this.loggedInUser.displayName+'. Seems you are first time here, fillout your expenses to track.'})
      }
      
      //debugger;
      return false;
    });
    firebaseUserDB.dbRefReceived.db.on('child_added',function(snapshot){
      console.log('AppComp : Received : child_added : ');
    });
    // ================= /Utility ==================================

    
		//
		var newUserObj = { 
											displayName: firebaseUser.displayName,
											email: firebaseUser.email,
											photoURL: firebaseUser.photoURL 
										}
		//
		this.setState({isLoggedIn:true, appUserObj:newUserObj,isError:false})
		
	}
	onAuthFail = errorMsg => {
    console.log('onAuthFail',errorMsg)
    this.showMessage(errorMsg)
	}

	showMessage = (errorMsg) => {
		this.setState({isError:true,errorMessage:errorMsg})
	}
	hideMessage = () => {
    this.setState( {isError:false, errorMessage:''} )
  }

  deleteEntryIncome = idKey => {
    console.log('AppComp : deleteEntryIncome : idKey',idKey);
    var currentUser = this.firebaseApp.auth().currentUser;
    var currentUserId = currentUser.uid;
    var deleteDBPath = 'paid/'+currentUserId+'/earnings/'+idKey;

    var that = this
    var callbackObj = {scope:that, callBack:this.onFirebaseSuccessCallBack}

    FirebaseUtil.deleteIncomeEntry(this.firebaseApp, deleteDBPath, callbackObj)
  }
  deleteEntry = (idKey) => {
    console.log('AppComp : deleteEntry : idKey',idKey);

    var currentUser = this.firebaseApp.auth().currentUser;
    var currentUserId = currentUser.uid;
    var deleteDBPath = 'paid/'+currentUserId+'/spendings/'+idKey;

    var that = this
    var callbackObj = {scope:that, callBack:this.onFirebaseSuccessCallBack}

    FirebaseUtil.deleteExpenseEntry(this.firebaseApp, deleteDBPath, callbackObj)
  }

	// ==========  firebaseUtil CallBack ========
  onFirebaseSuccessCallBack (msgObj) {
    console.log('onFirebaseSuccessCallback')
    this.setState({shouldShowPopUpMessage:true, sUIPopupMessage:msgObj})
  }
  onFirebaseErrorCallBack (msgObj) {
    console.log('onFirebaseErrorCallBack')
  }
  // ========== / firebaseUtil CallBack ========

	addNewCategory = catName => {
		console.log('RootControllerView : addNewCategory :',catName)

		var currentUser = this.firebaseApp.auth().currentUser;
    var currentUserId = currentUser.uid;
    var userDBPath = 'paid/'+currentUserId+'/projects/';
    var that = this
    //
    FirebaseUtil.addNewCategory(this.firebaseApp, userDBPath, catName, {scope:that, callBack:this.onFirebaseSuccessCallBack})

	}
	addNewPaidTo = ptName => {
		console.log('RootControllerView : addNewPaidTo :',ptName);

    var currentUser = this.firebaseApp.auth().currentUser;
    var currentUserId = currentUser.uid;
    var userDBPath = 'paid/'+currentUserId+'/persons/';
    var that = this
    //
    FirebaseUtil.addNewPaidTo(this.firebaseApp, userDBPath, ptName, {scope:that, callBack:this.onFirebaseSuccessCallBack})
	}

	onFirebaseInitDone(firebaseAppRef){
		this.firebaseApp = firebaseAppRef;
	}

	//getCompAndRender
	getCompAndRender = () => {
		console.log('RootControllerView : getCompAndRender : ',this.state.newViewName);
		console.log('this.state.allDataSnapshot',this.state.allDataSnapshot)

		// this.firebaseApp === null, firebase is not initialized
		if(this.firebaseApp){
			console.log('RootControllerView : getCompAndRender : this.firebaseApp',this.firebaseApp.name);
		}

		var newComp = null;
		switch(this.state.newViewName){
			
			case this.leftMenuNames.LOGIN :
				newComp = <div> 
	                    {( this.state.isLoggedIn ? 
	                        null :
	                        <div style={{ marginTop:'8em', marginLeft:'4em', marginRight:'4em' }}>Without login, I can not know "who are you?", how can I track your expense!</div> 
	                      )}
	                    <AuthUIComp firebaseRef={this.firebaseApp} 
	                                loginSuccessCallback={this.onLoginSuccess} 
	                                errorCallback={this.onAuthFail} /> 
	                  </div>
			break;
			case this.leftMenuNames.ABOUT :
				newComp = <AboutAppUIComp>
                    <div> {getMessages().APP_VERSION} &#10084; your &#2855;&#2856;.</div>
                    <div>It keeps a record of things, which you do not but want to.</div>
                  </AboutAppUIComp>
      break;

      case this.leftMenuNames.ADDPAYMENTS:
				newComp = <UICompGivePayment categories={this.state.allDataSnapshot.categories} 
                                      paidtos={this.state.allDataSnapshot.persons} 
                                      onAddPayment={this.onAddPayment} />
			break;
			case this.leftMenuNames.ADDRECEIVES:
				newComp = <UIReceivePayment categories={this.state.allDataSnapshot.categories} 
                                      paidtos={this.state.allDataSnapshot.persons}
                                      addIncome={this.onAddIncome} />
			break;

			case this.leftMenuNames.VIEWINCOMES :
				newComp = <UIViewPayments allData={this.state.allDataSnapshot.earnings} 
	                                    deleteItem={this.deleteEntryIncome} 
	                                    isIncomeView={true} 
	                                    totalIncome={this.state.totalEarnings} />
			break;
			case this.leftMenuNames.VIEWPAYMENTS :
				newComp = <UIViewPayments allData={this.state.allDataSnapshot.spendings} 
                                    deleteItem={this.deleteEntry} 
                                    totalSpending={this.state.totalSpending} />
			break;

			case this.leftMenuNames.FILTERINCOMES :
				newComp = <UIFilterIncomes allData={this.state.allDataSnapshot} 
	                                      deleteItem={this.deleteEntry} 
	                                      showMessage={this.showMessage} 
	                                      hideMessage={this.hideMessage} />
			break;
			case this.leftMenuNames.FILTERPAYMENTS :
				newComp = <UIFilterPayments allData={this.state.allDataSnapshot} 
	                                      deleteItem={this.deleteEntry} 
	                                      showMessage={this.showMessage} 
	                                      hideMessage={this.hideMessage} />
			break;

			case this.leftMenuNames.PAIDTO :
        newComp = <UIPaidTo allData={this.state.allDataSnapshot.persons}
                            deleteCallBack={this.deletePaidToWithId}
                            showMessage={this.showMessage}
                            addNewPaidTo={this.addNewPaidTo} />
      break;
      case this.leftMenuNames.CATEGORY :
        newComp = <UICategory allData={this.state.allDataSnapshot.categories} 
                              deleteCallBack={this.deleteCategoryWithId}
                              showMessage={this.showMessage}
                              addNewCategory={this.addNewCategory} />
      break;

			default :
				newComp = <div>{this.state.newViewName}</div>
			break;
		}
		return newComp;
	}
	// END getCompAndRender

	onAddPayment = (categoryName,personName,dateString,amountString) => {
    //console.group('AppComp : onAddPayment')
    
    var currentUser = this.firebaseApp.auth().currentUser;
    var currentUserId = currentUser.uid;
    var currentUserDBPath = 'paid/'+currentUserId+'/spendings'
    
    /*
    console.log('currentUserId',currentUserId) // id to save
    console.log('categoryName',categoryName) // value
    console.log('personName',personName) // value
    console.log('dateString',dateString) // value : 2017-03-28
    console.log('amountString',amountString) // value
    console.groupEnd()
    */

    var that = this
    var callbackObj = {scope:that, callBack:this.onFirebaseSuccessCallBack}

    FirebaseUtil.addNewExpense(this.firebaseApp,currentUserDBPath,{
          paidById : currentUserId,
          paidTo : personName,
          paidOn : dateString,
          ammount : String(amountString),
          paidForProject : categoryName
        },callbackObj)
  }
  onAddIncome = (categoryName,personName,dateString,amountString) => {
    //console.group('AppComp : onAddIncome : ')

    var currentUser = this.firebaseApp.auth().currentUser
    var currentUserId = currentUser.uid
    var currentUserDBPath = 'paid/'+currentUserId+'/earnings'
    //console.log('AppComp : onAddIncome : ',currentUserDBPath)
    //console.groupEnd()

    var that = this
    var callbackObj = {scope:that, callBack:this.onFirebaseSuccessCallBack}
    
    FirebaseUtil.addNewEarning(this.firebaseApp,currentUserDBPath,{
          paidById : currentUserId,
          paidTo : personName,
          paidOn : dateString,
          ammount : String(amountString),
          paidForProject : categoryName
        },callbackObj)
    
  }

 }// End Class

 export default RootControllerView;
