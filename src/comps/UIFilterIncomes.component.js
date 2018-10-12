//
// ref: Unicode Symbols: https://unicode-table.com/en/#oriya
//
import React, { Component, Fragment } from 'react';
//material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

//import green from 'material-ui/colors/green';

import FilterListIcon from '@material-ui/icons/FilterList';

/*
import DeleteIcon from 'material-ui-icons/Delete';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
*/

import UIPopupFilters from './UIPopupFilters.component'
import FirebaseUtil,{filterDataBy} from '../utils/FirebaseUtil.util';

class UIFilterIncomes extends Component {

  constructor(props){
    super(props)
    this.state = {
      ui:{ isFilterUIOpen:false },
      isFilterOn:false,
      aFilteredData:[],
      filteredTotal:0,
      filterByInfo:''
    }
  }

  render(){
    //const UIFilterIncomes = ({ allData, deleteItem }) => {
    //console.log('allData',allData);
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    var aAllData = Object.values(this.props.allData.earnings)
    var aSortedData = []
    
    if(this.state.isFilterOn){
      aSortedData = FirebaseUtil.getSortedDataObj(this.state.aFilteredData)
    }else{
      aSortedData = FirebaseUtil.getSortedDataObj(aAllData)
    }
    
    //
    return(
      <Fragment>
        {
          
            <Paper style={{marginTop:'4.5em',paddingTop:'1em',paddingBottom:'1em',width:'90%',marginLeft:'5%', backgroundColor:'#E8F5E9'}}>
              <Typography type="headline" component="h5">
                {''+this.state.filteredTotal+''}
              </Typography>
              <Typography component="p">
                {''+this.state.filterByInfo}
              </Typography>
              {/*<div style={{marginTop:'1em',marginBottom:'1em', fontSize:'0.5em'}}>{'Filters='+this.state.filterByInfo}</div>*/}
            </Paper>
           
        }
      <Paper style={{marginTop:'1.0em', marginBottom:'2em', width:'90%', marginLeft:'5%'}}>
        <UIPopupFilters shouldOpen = {this.state.ui.isFilterUIOpen} 
                        headTitle = {'Filters'} 
                        allData = {this.props.allData}
                        closeOnCancel = {this.handleCloseOnCancelFilterUI} 
                        close = {this.handleCloseFilterUI}  />
      {/*
        <div style={{position:'static', top:'4em',right:'0'}} color="primary">
          <Typography type="title" color="inherit">
            Total {total+'.00/-'} 
          </Typography>
        </div>
      */}
      {
        aSortedData.map((element,index) =>{
          //console.log(index,data);
          return (
            <li style={{listStyleType:"none",marginLeft:"0px",paddingTop:"10px", height:"60px", borderBottom:"0.5px solid #EEEEEE"}} key={element.key}>
            <div style={{textAlign:"left",fontSize:"0.8em", paddingLeft:"10px"}}>
              <div style={{fontWeight:"bold"}}>{element.paidTo}</div>
              <div style={{fontWeight:"200"}}>{element.paidOn}</div>
              <div style={{fontWeight:"200"}}>{element.paidForProject}</div>
            </div>
            <div style={{position:"relative",top:"-50px",right:"0px",textAlign:"right"}}>
              {''+element.ammount+''}
              <span style={{paddingLeft:"10px"}} />
              {/*
              <IconButton onClick={function(){console.log('Delete:'+element.key), deleteItem(element.key)}}>
                <DeleteIcon />
              </IconButton>
              */}
            </div>
            </li>
          )
        })
      }
      </Paper>
      <div style={{position:'fixed', bottom:"4em", right:"4em"}}>
        <Button mini color="primary" 
                aria-label="filter" 
                onClick={this.onFilterOpenClick}
                style={{position:'fixed', marginLeft:'0em'}}>
          <FilterListIcon/>
        </Button>
      </div>
      </Fragment>
    )
  }
  //
  onFilterOpenClick = (event) => {
    //console.log('onFilterOpenClick')
    this.setState({ui:{isFilterUIOpen:!this.state.ui.isFilterUIOpen}});
  }

  handleCloseOnCancelFilterUI = (event) => {
    //console.log('UIFilterPayments : closeOnCancel')
    this.setState({ui:{isFilterUIOpen: false}})
  }
  handleCloseFilterUI = (filterObj) => {
    //console.log('UIFilterPayments : handleCloseFilterUI')
    //console.group('Filter & Close : WIP ');
    //console.log(filterObj.sCategory)
    //console.log(filterObj.sPaidTo)
    //console.log(filterObj.sDate)
    //console.log('filterObj',filterObj)
    //console.groupEnd()
    // shouldFilterByCategory, shouldFilterByPaidTo, shouldFilterByDate
    
    // Show message
    var msg = 'Please wait. I am filtering your data.'
    this.props.showMessage(msg)
    this.setState({ui:{isFilterUIOpen: false}})
    //
    //console.log('============== filter =====')

    var shouldFilter = false;
    if(filterObj.shouldFilterByCategory || filterObj.shouldFilterByPaidTo || filterObj.shouldFilterByDate || filterObj.shouldFilterByMonth){
      shouldFilter = true
    }else{
      shouldFilter = false
    }
    //
    var aSpendings = Object.values(this.props.allData.earnings)
    var filteredCategoryDataObj, filteredPersonObj, filteredDateObj, filteredMonthObj = {}
    var filteredCategoryData,filteredPersonData,filteredDateData, resultDataArray = []
    var filteredTotal = 0
    var filterByInfo = ''
    //
    if(filterObj.shouldFilterByCategory){
      if(filterObj.shouldFilterByPaidTo){
        if(filterObj.shouldFilterByDate){
          //console.log('========= FILTER ======== Category + PaidTo + Date')
          filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
          filteredCategoryData = filteredCategoryDataObj.filteredArray
          
          filteredPersonObj = FirebaseUtil.filterByPaidToName(filteredCategoryData,filterObj.sPaidTo)
          filteredPersonData = filteredPersonObj.filteredArray
          
          filteredDateObj = FirebaseUtil.filterBydate(filteredPersonData,filterObj.sDate)
          resultDataArray = filteredDateObj.filteredArray
          
          filterByInfo = filterObj.sCategory+' + '+filterObj.sPaidTo+' + '+filterObj.sDate
          //DONE
        }else if(filterObj.shouldFilterByMonth){
          //console.log('========= FILTER ======== Category + PaidTo + Month')
          filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
          filteredCategoryData = filteredCategoryDataObj.filteredArray
          
          filteredPersonObj = FirebaseUtil.filterByPaidToName(filteredCategoryData,filterObj.sPaidTo)
          filteredPersonData = filteredPersonObj.filteredArray
          
          filteredMonthObj = FirebaseUtil.filterByMonth(filteredPersonData,filterObj.sMonth)
          resultDataArray = filteredMonthObj.filteredArray

          filterByInfo = filterObj.sCategory+' + '+filterObj.sPaidTo+' + '+filterObj.sMonth
        }else{
          //console.log('========= FILTER ======== Category + PaidTo')
          filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
          filteredCategoryData = filteredCategoryDataObj.filteredArray
          
          filteredPersonObj = FirebaseUtil.filterByPaidToName(filteredCategoryData,filterObj.sPaidTo,{name:'paidForProject',value:filterObj.sCategory})
          resultDataArray = filteredPersonObj.filteredArray
          
          filterByInfo = filterObj.sCategory+' + '+filterObj.sPaidTo
          //DONE
        }
      }else if(filterObj.shouldFilterByDate){
        //console.log('========= FILTER ======== Category + Date')
        filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
        filteredCategoryData = filteredCategoryDataObj.filteredArray
        
        filteredDateObj = FirebaseUtil.filterBydate(filteredCategoryData,filterObj.sDate)
        resultDataArray = filteredDateObj.filteredArray
        
        filterByInfo = filterObj.sCategory+' + '+filterObj.sDate
        //DONE
      }else if(filterObj.shouldFilterByMonth){
        //console.log('========= FILTER ======== Category + Month')
        filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
        filteredCategoryData = filteredCategoryDataObj.filteredArray
        
        filteredMonthObj = FirebaseUtil.filterByMonth(filteredCategoryData,filterObj.sMonth)
        resultDataArray = filteredMonthObj.filteredArray
        
        filterByInfo = filterObj.sCategory+' + '+filterObj.sMonth
      }else{
        //console.log('========= FILTER ======== Category')
        filteredCategoryDataObj = FirebaseUtil.filterByCategoryName(aSpendings,filterObj.sCategory)
        resultDataArray = filteredCategoryDataObj.filteredArray
        
        filterByInfo = filterObj.sCategory
        //DONE
      }
    }else if(filterObj.shouldFilterByPaidTo){
      if(filterObj.shouldFilterByDate){
        //console.log('========= FILTER ======== PaidTo + Date')
        filteredPersonObj = FirebaseUtil.filterByPaidToName(aSpendings,filterObj.sPaidTo)
        filteredPersonData = filteredPersonObj.filteredArray
        
        filteredDateObj = FirebaseUtil.filterBydate(filteredPersonData,filterObj.sDate)
        resultDataArray = filteredDateObj.filteredArray
        
        filterByInfo = filterObj.sPaidTo+' + '+filterObj.sDate
        //DONE
      }else if(filterObj.shouldFilterByMonth){
        //console.log('========= FILTER ======== PaidTo + Month')
        filteredPersonObj = FirebaseUtil.filterByPaidToName(aSpendings,filterObj.sPaidTo)
        filteredPersonData = filteredPersonObj.filteredArray
        
        filteredMonthObj = FirebaseUtil.filterByMonth(filteredPersonData,filterObj.sMonth)
        resultDataArray = filteredMonthObj.filteredArray
        
        filterByInfo = filterObj.sPaidTo+' + '+filterObj.sMonth
      }else{
        //console.log('========= FILTER ======== PaidTo')
        filteredPersonObj = FirebaseUtil.filterByPaidToName(aSpendings,filterObj.sPaidTo)
        resultDataArray = filteredPersonObj.filteredArray
        
        filterByInfo = filterObj.sPaidTo
        //DONE
      }
    }else if(filterObj.shouldFilterByDate){
      //console.log('========= FILTER ======== Date')
      filteredDateObj = FirebaseUtil.filterBydate(aSpendings,filterObj.sDate)
      resultDataArray = filteredDateObj.filteredArray
      
      filterByInfo = filterObj.sDate
      //DONE
    }else if(filterObj.shouldFilterByMonth){
      //console.log('========= FILTER ======== Month')
      filteredMonthObj = FirebaseUtil.filterByMonth(aSpendings,filterObj.sMonth)
      resultDataArray = filteredMonthObj.filteredArray

      //console.log('resultDataArray',resultDataArray)

      filterByInfo = filterObj.sMonth
    }
    // Filtered Total
    var nResult=0;
    for(nResult=0;nResult<resultDataArray.length;nResult++){
      filteredTotal += Number( resultDataArray[nResult].ammount )
    }
    // Hide the message
    this.props.hideMessage()
    // render again
    this.setState({ isFilterOn : shouldFilter, 
                    aFilteredData : resultDataArray,
                    filteredTotal,
                    filterByInfo
                  });
  }




}



export default UIFilterIncomes