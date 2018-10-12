//
import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme, withTheme, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import Slide from '@material-ui/core/Slide';

//ref: http://react-day-picker.js.org/docs/getting-started
// Not needed as we are using the native <input type'date'/>
//import DayPicker from 'react-day-picker';
//import DayPickerInput from 'react-day-picker/DayPickerInput';
//import 'react-day-picker/lib/style.css';

//ref: https://github.com/fraserxu/react-dropdown
//import Dropdown from 'react-dropdown' 

import * as firebase from 'firebase'
//
import UICompPopupCategorySelect from './UICompPopupCategorySelect'
import UIPopupPaidTo from './UIPopupPaidTo'
//
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

//
class UICompGivePayment extends Component{
  constructor(props){
    super(props)
    this.state = {  
                  projectValue : "default",
                  personValue : "default",
                  dateValue : "0-0-0",
                  amountValue : '',
                  ui : {
                    popupCategory:false,
                    popupPaidTo:false,
                  },
                };
    //
    //this.onPay = this.onPay.bind(this);
    this.handleRequestCloseCategorySelect = this.handleRequestCloseCategorySelect.bind(this);
    this.handleChangeInDate = this.handleChangeInDate.bind(this);
    //this.onButtonClick = this.onButtonClick.bind(this);
    //
  }
  render(){
    var that = this;
    
    /*
    console.log('render:',this.state.ui);
    console.log('categories',this.props.categories);
    console.log('paidtos',this.props.paidtos);
    */

    var aProjects = Object.values(this.props.categories) 
    var aPersons = Object.values(this.props.paidtos)
    //var allProjectItems = [1,2,3,4,5,6,7,8,9]
    //var allPersonItems = ['qpple','apple','orange','banana','love','life']

    //var aProjects = this.props.AppContainerData.aListData.projects;
    //var aPersons = this.props.AppContainerData.aListData.persons;
    var sCategory = ''
    var sPaidTo = '';
    //console.log('this.state.projectValue',this.state.projectValue)
    if(this.state.projectValue==='default'){
      sCategory = 'Category'
    }else{
      sCategory = this.state.projectValue
    }

    if(this.state.personValue==='default'){
      sPaidTo = 'Paid To'
    }else{
      sPaidTo = this.state.personValue
    }

    return(
      <Paper style={{ marginTop:'4em',marginLeft:'5%',paddingTop:'5%',paddingBottom:'2%',width:'90%',minHeight:'140px', backgroundColor:'#FFEBEE'}}>
        <center>
        <Typography type="headline" component="h3"> Expense </Typography>

        {/*<h5>Choose Category</h5> <DropDownMenu autoWidth={false} style={{width:'80%', marginLeft:'1%'}} children={allProjectItems} value={this.state.projectValue} onChange={this.handleProjectChange.bind(this)}>    
        </DropDownMenu>*/}
        {/*<h5>Choose Paid-To</h5> <DropDownMenu autoWidth={false} style={{width:'80%',marginLeft:'1%'}} children={allPersonItems} value={this.state.personValue} onChange={this.handlePersonChange.bind(this)}>
        </DropDownMenu>*/}
        {/*<DatePicker hintText="Date of payment" onChange={this.handleChangeInDate.bind(this)} /> */}
        
        {/* ThirdParty Components/
        <Dropdown className='dropDownClass' style={{marginBottom:'1em'}} options={allProjectItems} placeholder="Choose Category" />
        <Dropdown className='dropDownClass' style={{marginBottom:'1em'}} options={allPersonItems} placeholder="Choose Paid-To" />
        <DayPickerInput style={{width:'80%'}}/>
        */}
        <UICompPopupCategorySelect shouldOpen={this.state.ui.popupCategory} 
                                    close={this.handleRequestCloseCategorySelect} 
                                    onItemSelect={this.onItemSelectedFromPopup_category}
                                    headTitle={'Categories'}
                                    aOptions={aProjects} />
        <UIPopupPaidTo shouldOpen={this.state.ui.popupPaidTo} 
                        close={this.handleRequestClosePaidToSelect} 
                        onItemSelect={this.onItemSelectedFromPopup_paidTo}
                        headTitle={'Paid to'} 
                        aOptions={aPersons} />
        <Button variant="contained" 
                style={{width:'80%', marginTop:'2em',backgroundColor:'white'}} 
                onClick={this.onButtonClickCategory}> { sCategory } </Button>
        <Button variant="contained" 
                style={{width:'80%', marginTop:'2em', marginBottom:'2em',backgroundColor:'white'}} 
                onClick={this.onButtonClickPaidTo}> { sPaidTo } </Button>
        <div><input className="datePickerClass" type="date" onChange={this.handleChangeInDate.bind(this)} /></div>
        <TextField id="id-text-payment" 
                    label="Amount" 
                    value={this.state.amountValue}
                    onChange={this.onTextChange} 
                    style={{width:'60%', marginTop:'0em'}} />
        <Button variant="contained" color="primary" 
                style={{width:'80%', marginTop:'2em', marginBottom:'1em'}} 
                onClick={this.onAddPaymentClick}> Add Payment </Button>
        </center>
      </Paper>
    )
  }

  // ============= EventHandlers
  /*
  onButtonClick = (event) =>{
    //console.log('onPay:');
    console.group('onButtonClick');
    //console.log('event',event);
    const t1 = event.target.textContent;
    const t2 = event.target.innerText;
    const t3 = event.target.innerHTML;
    console.log('textContent',t1,' : innerText',t2,' : innerHTML',t3);
    console.groupEnd();
    
    console.log('t1',t1.length);
    console.log('t2',t2.length);
    console.log('t3',t3.length);
    
    if(t2==='CATEGORY'){
      //console.log(t1,'=======');
      this.setState({ui:{popupCategory:true}});
    }else if(t2==='PAID TO'){
      //console.log(t1,'xxxxxx');
      this.setState({ui:{popupPaidTo:true}});
    }
    //
    return false;
  }
  */
  onButtonClickCategory = event =>{
    this.setState({ui:{popupCategory:true}})
  }
  onButtonClickPaidTo = event =>{
    this.setState({ui:{popupPaidTo:true}})
  }
  onAddPaymentClick = event => {
    //console.group('onAddPaymentClick')
    //console.log(this.state.projectValue)
    //console.log(this.state.personValue)
    //console.log(this.state.dateValue)
    //console.log(this.state.amountValue)
    //console.groupEnd()
    
    var amountString = this.state.amountValue
    var numAmount = eval(amountString) // since this could be 1+2+5
    
    //console.log('ammount',numAmount)
    //console.groupEnd()
    //TODO: Fix the UI, Show a Dialogue displaying the ammount
    //this.props.onAddPayment(this.state.projectValue,this.state.personValue,this.state.dateValue,this.state.amountValue)
    
    this.props.onAddPayment(this.state.projectValue,this.state.personValue,this.state.dateValue,numAmount)
    // clear the amount field
    this.setState({amountValue:''})
  }
  //
  onTextChange = event => {
    //console.log('onTextChange : =================');
    var s = event.target.value
    //var n = Number(s)
    //console.log('text',n)
    this.setState({amountValue:s})
    //console.log('onTextChange : =================');
  }
  handleChangeInDate(event){
    //console.log('handleChangeInDate : ======================= ');
    //console.log('event',event);
    //console.log('date',date);
    //this.setState({dateValue:date});
    //console.log(event.target.value);

    var dateValue = event.target.value;
    //console.log('dateValue',dateValue);
    this.setState({dateValue:dateValue});
    //console.log('dateValue',dateValue);
    //console.log('handleChangeInDate : ======================= ');
    return false;
  }
  handleRequestCloseCategorySelect(event){
    //console.log('UICompGivePayment : handleRequestCloseCategorySelect : ');
    this.setState({ui:{popupCategory:false}});
  }
  handleRequestClosePaidToSelect = event => {
    //console.log('UICompGivePayment : handleRequestClosePaidToSelect : ');
    this.setState({ui:{popupPaidTo:false}});
  }
  handleRequestClose(event){
    //console.log('UICompGivePayment : handleRequestClose : ');
  } 
  // ====== End == EventHandlers
  // === Callback ===
  onItemSelectedFromPopup_category = (itemID) => {
    //console.log('================================')
    //console.log('onItemSelectedFromPopup_category : ',itemID)
    //console.log('================================')
    this.state.projectValue = itemID
    return false
  }
  onItemSelectedFromPopup_paidTo = (itemID) => {
    //console.log('================================')
    //console.log('onItemSelectedFromPopup_paidTo : ',itemID)
    //console.log('================================')
    this.state.personValue = itemID;
    return false
  }
  // === / Callback ===
 
}


export default UICompGivePayment;