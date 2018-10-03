// UIPopupFilters

import React, {Component} from 'react'



import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

//import green from 'material-ui/colors/green';
//
import UICompPopupCategorySelect from './UICompPopupCategorySelect'
import UIPopupPaidTo from './UIPopupPaidTo'
//
function Transition(props) {
  return <Slide direction="right" {...props} />;
}
//
class UIPopupFilters extends Component {
  state = {
    value: undefined,  
    sCategory: 'Category',
    sPaidTo: 'Person',
    dateValue: '',
    monthValue: '',
    ui:{
      popupCategory:false,
      popupPaidTo:false
    },
    shouldFilterByCategory:false,
    shouldFilterByPaidTo:false,
    shouldFilterByDate:false,
    shouldFilterByMonth:false,
  };
  constructor(props){
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.onDone = this.onDone.bind(this)
  }
  render(){
    
    //console.log('UIPopupPaidTo : render : ');
    //console.log('selected id',this.state.value);
    //console.log('data',this.props.allData)
    var aProjects = Object.values(this.props.allData.categories)
    var aPersons = Object.values(this.props.allData.persons)
    return(
      <Dialog
        fullScreen
        open={this.props.shouldOpen}
        onRequestClose={this.handleRequestClose}
        transition={Transition}>
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
                <IconButton color="contrast" onClick={this.props.closeOnCancel} aria-label="Close">
                  <KeyboardArrowLeftIcon style={{width:'2em',height:'2em'}} />
                </IconButton>
                <Typography type="title" color="inherit" style={{flex:1}}> {this.props.headTitle} </Typography>
                <Button color="contrast" onClick={this.onDone}> Done </Button>
              </Toolbar>
          </AppBar>
        {/* <DialogTitle>All Paid-To</DialogTitle> */}
        <DialogContent>
          <Paper style={{marginTop:'1em'}}>
          
            <Typography type="title" gutterBottom 
                        color="inherit" 
                        style={{marginLeft:'2em'}}
                        align="left"> Filter by </Typography>
            
            <FormGroup style={{marginLeft:'36%'}}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={this.state.shouldFilterByCategory}
                    onChange={(event, checked) => this.setState({ shouldFilterByCategory : checked })}
                  />
                }
                label="Category"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.shouldFilterByPaidTo}
                    onChange={(event, checked) => this.setState({ shouldFilterByPaidTo : checked })}
                  />
                }
                label="Person"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.shouldFilterByDate}
                    onChange={(event, checked) => this.setState({ shouldFilterByDate : checked, shouldFilterByMonth: false })}
                  />
                }
                label="Date"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.shouldFilterByMonth}
                    onChange={(event, checked) => this.setState({ shouldFilterByDate : false, shouldFilterByMonth: checked  })}
                  />
                }
                label="Month"
              />
            </FormGroup>

            {
              (this.state.shouldFilterByCategory?
                <Button raised 
                  style={{width:'80%',marginTop:'1em',marginBottom:'1em', marginLeft:'10%', backgroundColor:'white'}} 
                  onClick={this.onClickCategorySelection}>  {this.state.sCategory}  </Button>
                :null)
            }
            {
              (this.state.shouldFilterByPaidTo?
                <Button raised 
                    style={{width:'80%',marginLeft:'10%', marginTop:'1em', marginBottom:'1em',backgroundColor:'white'}} 
                    onClick={this.onClickPersonSelection}>  {this.state.sPaidTo}  </Button>
                :null)
            }
            {
              (this.state.shouldFilterByDate?
                <div><input type="date" style={{width:'80%',marginTop:'1em', marginBottom:'1em', marginLeft:'10%', height:'3em', backgroundColor:'white'}} onChange={this.handleChangeInDate.bind(this)} /></div>
                :null)
            }
            {
              (this.state.shouldFilterByMonth?
                <div><input type="month" style={{width:'80%',marginTop:'1em', marginBottom:'1em', marginLeft:'10%', height:'3em', backgroundColor:'white'}} onChange={this.handleChangeInMonth.bind(this)} /></div>
                :null)
            }
            

          </Paper>
        </DialogContent>

        <UICompPopupCategorySelect shouldOpen={this.state.ui.popupCategory} 
                                    close={this.handleRequestClose_CategorySelect} 
                                    onItemSelect={this.onItemSelectedFromPopup_category}
                                    headTitle={'Categories'}
                                    aOptions={aProjects} />
        <UIPopupPaidTo shouldOpen={this.state.ui.popupPaidTo} 
                        close={this.handleRequestClose_PaidToSelect} 
                        onItemSelect={this.onItemSelectedFromPopup_paidTo}
                        headTitle={'Paid to'} 
                        aOptions={aPersons} />
      </Dialog>
    )
  }
  
  // Event Handlers
  handleChange = (event, value) => {
    this.setState({ value });
  }
  onDone = (event) => {
    console.log('onDone : this.state.value',this.state);
    //this.props.onItemSelect(this.state.value)
    /*
    console.group('UIPopupFilters : Filter')
    console.log('category',this.state.sCategory)
    console.log('person',this.state.sPaidTo)
    console.log('date',this.state.dateValue)
    console.groupEnd()
    */
    var filterObj = {
      shouldFilterByCategory : this.state.shouldFilterByCategory,
      shouldFilterByPaidTo : this.state.shouldFilterByPaidTo,
      shouldFilterByDate : this.state.shouldFilterByDate,
      shouldFilterByMonth: this.state.shouldFilterByMonth,
      sCategory : this.state.sCategory,
      sPaidTo : this.state.sPaidTo,
      sDate : this.state.dateValue,
      sMonth : this.state.monthValue
    }
    //
    this.props.close(filterObj);
  }
  handleRequestClose = (event) => {
    console.log('UIPopupFilters : handleRequestClose :');
  }
  onButtonClick = (event) => {
    console.log('onButtonClick');
  }
  /*
  handleChangeInDate = (event) => {
    console.log('handleChangeInDate')
  }
  */
  //
  onClickCategorySelection = event => {
    this.setState({ui:{popupCategory:true}});
  }
  onClickPersonSelection = event => {
    this.setState({ui:{popupPaidTo:true}});
  }
  handleRequestClose_CategorySelect = event => {
    this.setState({ui:{popupCategory:false}});
  }
  handleRequestClose_PaidToSelect = event => {
    this.setState({ui:{popupPaidTo:false}});
  }
  onItemSelectedFromPopup_category = item => {
    this.setState({sCategory:item})
  }
  onItemSelectedFromPopup_paidTo = item => {
    this.setState({sPaidTo:item})
  }
  handleChangeInDate = event =>{
    var dateValue = event.target.value;
    this.setState({dateValue:dateValue});
  }
  handleChangeInMonth = event => {
    var mValue = event.target.value;
    //console.log (mValue)
    this.setState({monthValue: mValue});
  }
  //
}

export default UIPopupFilters