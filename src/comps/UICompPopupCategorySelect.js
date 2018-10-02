// UICompPopupCategorySelect

import React, {Component} from 'react'


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import Slide from '@material-ui/core/Slide';

//
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
//
class UICompPopupCategorySelect extends Component {
  state = {
    value: undefined,
  };
  constructor(props){
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.onDone = this.onDone.bind(this)
  }
  render(){
    //console.log('UICompPopupCategorySelect : render : ');
    //console.log('selected id',this.state.value);
    var allCategories = this.props.aOptions;
    return(
      <Dialog
        fullScreen
        open={this.props.shouldOpen}
        onRequestClose={this.handleRequestClose}
        transition={Transition}>
        
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
                <IconButton color="contrast" onClick={this.props.close} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography type="title" color="inherit" style={{flex:1}}> {this.props.headTitle} </Typography>
                <Button color="contrast" onClick={this.onDone}> Done </Button>
              </Toolbar>
          </AppBar>

        {/* <DialogTitle>All Categories</DialogTitle> */}
        <DialogContent>
          <RadioGroup
              ref={node => { this.radioGroup = node; }}
              aria-label="category"
              name="category"
              value={this.state.value}
              onChange={this.handleChange}>

                {allCategories.map(option => (
                  <FormControlLabel value={option.projectName} key={option.key} control={<Radio />} label={option.projectName} />
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
    console.log('onDone: TODO: Add the logic here before closing.');
    this.props.onItemSelect(this.state.value)
    this.props.close();
  }
  handleRequestClose(event){
    console.log('UICompPopupCategorySelect:handleRequestClose:');
  }
}

export default UICompPopupCategorySelect