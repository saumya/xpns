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

	import FirebaseControllerView from './FirebaseControllerView.comp'


 class RootControllerView extends Component {
 	constructor(props){
		super(props)
		this.state =  {
			isSideMenuOpen:false,
		}
		this.sNames = MenuNames.getAllNames().generalMenu;
    this.leftMenuNames = MenuNames.getAllNames().leftMenu;
 	}
 	render(){
		 console.log('isSideMenuOpen', this.state.isSideMenuOpen)
 		return(
 				<Fragment>
					<FirebaseControllerView />
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
						</MenuList>

					</Drawer>
 				</Fragment>
 			)
	 }
	componentDidMount(){}
	componentWillUnmount(){}
	// ========= Event handlers
	handleLeftMenu = event => {
		this.setState({isSideMenuOpen: !this.state.isSideMenuOpen});
	}
	onSideMenuItemClick = event => {}

 }// End Class

 export default RootControllerView;
