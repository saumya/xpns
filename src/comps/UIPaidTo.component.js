// Usage: Paid-To Creation/Deletion
//
import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
//
import {getMessages} from '../utils/MenuNames'

//
class UIPaidTo extends Component {
  constructor(props){
    super(props)
    this.state =  {sText:''};
    //
    //this.onPay = this.onPay.bind(this);
    //this.onButtonClick = this.onButtonClick.bind(this);
    //
  }
  render(){
    var that = this;
    var aListData = [1,2,3];
    var allListItems = []
    aListData = this.props.allData;
    for (var key in aListData) {
      var element = aListData[key];
      //console.log(key,':',element);
      allListItems.push(
        <ListItem key={key}> 
          <ListItemText primary={element.personName} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" data-key={key} onClick={this.onDeleteClick}><DeleteIcon /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }

    return(
      <Paper style={{ marginTop:'4em',marginLeft:'5%',paddingTop:'5%',paddingBottom:'2%',width:'90%',minHeight:'140px', backgroundColor:'#E8F5E9'}}>
        <Typography type="headline" component="h3"> Paid-To / Received-From </Typography>
        
        <Paper style={{width:'90%', marginLeft:'5%', minHeight:'140px', marginTop:'1em', paddingTop:'1em', backgroundColor:'#C8E6C9'}}>
          <TextField id="id-text-project" 
                      label="Name" 
                      value={this.state.sText} 
                      style={{width:'80%', marginLeft:'10%', marginTop:'0em'}} 
                      onChange={this.onTextChange} />
          <Button variant="contained" 
                style={{width:'80%', marginLeft:'10%', marginTop:'2em', marginBottom:'2em',backgroundColor:'#A5D6A7'}} 
                onClick={this.onButtonClick}> Add New </Button>
        </Paper>
        
        <Paper style={{width:'90%',marginLeft:'5%', minHeight:'140px', marginTop:'1em',paddingTop:'1em'}}>
          <Typography type="title" component="h1" style={{marginBottom:'0.5em'}}> All Paid-To / Received-From </Typography>
          <Divider />
          <List children={allListItems} />
			  </Paper>
      
      </Paper>
    )
  }

  // ============= EventHandlers
  onTextChange = (event) => { 
    //console.log('UIPaidTo : onTextChange : ');
    var tValue = event.target.value;
    this.setState({sText:tValue});
  }
  onButtonClick = (event) => {
    //console.log('UIPaidTo : onButtonClick : ');
    //this.props.addNewPaidTo(this.state.sText);

    const sTextValue = this.state.sText
    if(sTextValue===''){
      this.props.showMessage('PaidTo name' + getMessages().CAN_NOT_BE_BLANK);
    }else{
      this.props.addNewPaidTo(sTextValue);
      //clear
      this.setState({sText:''});
    }

    return false;
  }
  onDeleteClick = (event) => {
    //console.log('UIPaidTo : onDeleteClick : ');
    var k = event.currentTarget.getAttribute('data-key')
    this.props.deleteCallBack(k)
    return false;
  } 
  // ====== End == EventHandlers
 
}


export default UIPaidTo