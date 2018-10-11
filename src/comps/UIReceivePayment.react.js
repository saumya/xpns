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

import * as firebase from 'firebase'
//
import UICompPopupCategorySelect from './UICompPopupCategorySelect'
import UIPopupPaidTo from './UIPopupPaidTo'
//
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
//
class UIReceivePayment extends Component{
  constructor(props){
    super(props)
    this.state = {  
                  projectValue:"default",
                  personValue:"default",
                  dateValue:"0-0-0",
                  amountValue:'',
                  ui:{
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

    var aProjects = Object.values(this.props.categories) 
    var aPersons = Object.values(this.props.paidtos)
    
    var sCategory = ''
    var sPaidTo = '';
    if(this.state.projectValue==='default'){
      sCategory = 'Category'
    }else{
      sCategory = this.state.projectValue
    }

    if(this.state.personValue==='default'){
      sPaidTo = 'Received From'
    }else{
      sPaidTo = this.state.personValue
    }

    return(
      <Paper style={{ marginTop:'4em',marginLeft:'5%',paddingTop:'5%',paddingBottom:'2%',width:'90%',minHeight:'140px', backgroundColor:'#E8F5E9'}}>
        
        <center>
        <Typography type="headline" component="h3"> Income </Typography>

        <UICompPopupCategorySelect shouldOpen={this.state.ui.popupCategory} 
                                    close={this.handleRequestCloseCategorySelect} 
                                    onItemSelect={this.onItemSelectedFromPopup_category}
                                    headTitle={'Categories'}
                                    aOptions={aProjects} />
        <UIPopupPaidTo shouldOpen={this.state.ui.popupPaidTo} 
                        close={this.handleRequestClosePaidToSelect} 
                        onItemSelect={this.onItemSelectedFromPopup_paidTo}
                        headTitle={'Received From'} 
                        aOptions={aPersons} />
        <Button variant="contained" 
                style={{width:'80%', marginTop:'2em',backgroundColor:'white'}} 
                onClick={this.onButtonClickCategory}> { sCategory } </Button>
        <Button variant="contained" 
                style={{width:'80%', marginTop:'2em', marginBottom:'2em', backgroundColor:'white'}} 
                onClick={this.onButtonClickPaidTo}> { sPaidTo } </Button>
        <div><input className="datePickerClass" type="date" onChange={this.handleChangeInDate.bind(this)} /></div>
        <TextField id="id-text-payment" 
                    label="Amount" 
                    value={this.state.amountValue}
                    onChange={this.onTextChange}
                    style={{width:'60%', marginTop:'0em'}} />
        <Button variant="contained" color="primary" 
                style={{width:'80%', marginTop:'2em', marginBottom:'1em'}} 
                onClick={this.onAddIncome}> Add Income </Button>
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

    if(t2==='CATEGORY'){
      //console.log('this.state',this.state);
      this.setState({ui:{popupCategory:true}});
    }else if(t2==='RECEIVED FROM'){
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
  onTextChange = event => {
    //console.log('onTextChange : =================');
    var s = event.target.value
    //var n = Number(s)
    //console.log('text',n)
    this.setState({amountValue:s})
    //console.log('onTextChange : =================');
  }
  //
  handleChangeInDate(event){
    //console.log('handleChangeInDate : ======================= ');
    //console.log('event',event);
    //console.log('date',date);
    //this.setState({dateValue:date});
    //console.log(event.target.value);

    var dateValue = event.target.value;
    //console.log('dateValue',dateValue);
    this.setState({dateValue:dateValue});
    //console.log('handleChangeInDate : ======================= ');
    return false;
  }
  handleRequestCloseCategorySelect(event){
    console.log('handleRequestCloseCategorySelect');
    this.setState({ui:{popupCategory:false}});
  }
  handleRequestClosePaidToSelect = event => {
    console.log('handleRequestClosePaidToSelect : ');
    this.setState({ui:{popupPaidTo:false}});
  }
  handleRequestClose(event){
    console.log('handleRequestClose');
  } 
  // ====== End == EventHandlers
  // === Callback ===
  onItemSelectedFromPopup_category = (itemID) => {
    console.log('================================')
    console.log('onItemSelectedFromPopup_category : ',itemID)
    console.log('================================')
    this.state.projectValue = itemID
    return false
  }
  onItemSelectedFromPopup_paidTo = (itemID) => {
    console.log('================================')
    console.log('onItemSelectedFromPopup_paidTo : ',itemID)
    console.log('================================')
    this.state.personValue = itemID;
    return false
  }
  // === / Callback ===

  onAddIncome = event => {
    
    //console.group('onAddIncome')
    //console.log(this.state.projectValue)
    //console.log(this.state.personValue)
    //console.log(this.state.dateValue)
    //console.log(this.state.amountValue)
    //console.groupEnd()
    
    var amountString = this.state.amountValue
    var numAmount = eval(amountString)
    
    //console.log('ammount',numAmount)
    //console.groupEnd()

    //TODO: Fix the UI, Show a Dialogue displaying the ammount
    this.props.addIncome(this.state.projectValue,this.state.personValue,this.state.dateValue,numAmount)

    // clear the amount field
    this.setState({amountValue:''})
  }
 
}


export default UIReceivePayment;