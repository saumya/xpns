//
// ref: Unicode Symbols: https://unicode-table.com/en/#oriya
//
import React, { Component, Fragment } from 'react';
//material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

const UIViewPayments = ({ allData, deleteItem, isIncomeView, totalIncome, totalSpending }) => {

  if(allData===undefined){ return (<Fragment> <div>Nothing Yet!</div> </Fragment>) }

  //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  var aAllData = Object.values(allData)
  var aSortedData = aAllData.sort(function(a,b){
    var d1 = new Date(a.paidOn);
    var d2 = new Date(b.paidOn);
    var t1 = d1.getTime();
    var t2 = d2.getTime();
    if(t1>t2){
      return -1;
    }else{
      return 1;
    }
  });

  /*
  //total
  var total = 0
  var item;
  for(item in aSortedData){
    //console.log('item',aSortedData[item]);
    total += Number(aSortedData[item].ammount);
  }
  //console.log('total',total);
  */
  //console.log(aAllData)
  
  var sMargin = '1em';
  /*
  if(isIncomeView){
    sMargin = '1em'
  }else{
    sMargin = '4.5em'
  }
  */
  //
  return(
    <Fragment>
    {
      (isIncomeView?
        <Paper style={{marginTop:'4.5em', width:'90%', marginLeft:'5%', paddingTop:'1em', paddingBottom:'1em', backgroundColor:'#E8F5E9'}}>
          Total {totalIncome}
        </Paper>
        :
        <Paper style={{marginTop:'4.5em', width:'90%', marginLeft:'5%', paddingTop:'1em', paddingBottom:'1em', backgroundColor:'#FFEBEE'}}>
          Total {totalSpending}
        </Paper>
      )
    }
    <Paper style={{marginTop:sMargin , width:'90%', marginLeft:'5%'}}>
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
            {
            <IconButton onClick={function(){console.log('Delete:'+element.key), deleteItem(element.key)}}>
              <DeleteIcon />
            </IconButton>
            }
          </div>
          </li>
        )
      })
    }
    </Paper>
    </Fragment>
  )
}



export default UIViewPayments