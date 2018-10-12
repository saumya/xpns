// UICompPopupCategorySelect

import React, {Component} from 'react'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import Slide from '@material-ui/core/Slide';


//
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
//
class UIPopupPaidTo extends Component {
  state = {
    value: undefined,
  };
  constructor(props){
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.onDone = this.onDone.bind(this)
  }
  render(){
    
    //console.log('UIPopupPaidTo : render : ');
    //console.log('selected id',this.state.value);
    var bOpen = false;
    if(this.props.shouldOpen){
      bOpen = this.props.shouldOpen;
    }

    var allCategories = this.props.aOptions;
    return(
      <Dialog
        fullScreen
        open={bOpen}
        onClose={this.handleRequestClose} 
        TransitionComponent={Transition}>
        

          <AppBar style={{position: 'relative'}}>
            <Toolbar>
                <IconButton onClick={this.props.close} aria-label="Close">
                  <CloseIcon style={{color:'white'}} />
                </IconButton>
                <Typography type="title" color="inherit" style={{flex:1}}> {this.props.headTitle} </Typography>
                <Button onClick={this.onDone} style={{color:'white'}}> Done </Button>
              </Toolbar>
          </AppBar>

        {/* <DialogTitle>All Paid-To</DialogTitle> */}
        <DialogContent>
          <RadioGroup
              ref={node => { this.radioGroup = node; }}
              aria-label="paid to"
              name="paid to"
              value={this.state.value}
              onChange={this.handleChange}>

                {allCategories.map(option => (
                  <FormControlLabel value={option.personName} key={option.key} control={<Radio />} label={option.personName} />
                ))}
            
            </RadioGroup>
        </DialogContent>
        {/*
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
        */}
      </Dialog>
    )
  }
  
  // Event Handlers
  handleChange = (event, value) => {
    this.setState({ value });
  }
  onDone = (event) => {
    //console.log('onDone : this.state.value',this.state.value);
    this.props.onItemSelect(this.state.value)
    this.props.close();
  }
  handleRequestClose(event){
    //console.log('UIPopupPaidTo:handleRequestClose:');
  }
}

export default UIPopupPaidTo