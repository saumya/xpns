//
// FirebaseUtil.util
//
// ref: https://firebase.googleblog.com/2016/01/keeping-our-promises-and-callbacks_76.html
//


class FirebaseUtil {
  constructor(name) {
    this.name = name;
  }
  hello() {
    return 'Hello ' + this.name + '!';
  }
  // Static functions
  // Basically functions :) YEAH.
  static getFirebaseAppData(firebaseApp,googleUserId){
    console.log('FirebaseUtil.util:getFirebaseAppData:');
    var result = null;
    //
    const firebaseDB = firebaseApp.database();
    const loggedInUserDB_path_paid = 'paid/'+googleUserId;
    const loggedInUserDB_path_received = 'received/'+googleUserId;
    const dbRefPaid = firebaseDB.ref(loggedInUserDB_path_paid);
    const dbRefReceived = firebaseDB.ref(loggedInUserDB_path_received)
    //console.log(loggedInUserDB_path_paid,':',dbRefPaid);
    //console.log(loggedInUserDB_path_received,':',dbRefReceived);
    var result = {
      dbRefPaid:{ 
        path:loggedInUserDB_path_paid,
        db:dbRefPaid
      },
      dbRefReceived:{
        path:loggedInUserDB_path_received,
        db:dbRefReceived
      },
    }
    //
    return result
  }

  static addNewCategory(firebaseApp, dbPath, newProjectName, callbackObj){
    var databaseRef = firebaseApp.database().ref(dbPath);
    var newProjectRef = databaseRef.push();
    //newProjectRef.set({projectName:newProjectName});
    newProjectRef.set({projectName:newProjectName}).then(function(){
      callbackObj.callBack.call(callbackObj.scope, newProjectName+" Added as a Category")
    },function(error){
      console.log('Error : ',error)
    });
  }
  static deleteCategory(firebaseApp, dbPath, callbackObj){
    var databaseRef = firebaseApp.database().ref(dbPath);
    databaseRef.remove(function (error) {
      if (!error) {
        //alert('Successfully Deleted.');
        callbackObj.callBack.call(callbackObj.scope, " Category Deleted")
      }else{
        alert('Error!');
      }
    });
  }

  static addNewPaidTo(firebaseApp, dbPath, newPersonName, callbackObj){
    var databaseRef = firebaseApp.database().ref(dbPath);
    var newPersonRef = databaseRef.push();
    //newPersonRef.set({personName:newPersonName});
    newPersonRef.set({personName:newPersonName}).then(function(){
      callbackObj.callBack.call(callbackObj.scope, newPersonName+" Added as a PaidTo/ReceivedFrom")
    },function(error){
      console.log('Error : ',error)
    })
  }
  static deletePaidTo(firebaseApp, dbPath, callbackObj){
    var databaseRef = firebaseApp.database().ref(dbPath);
    databaseRef.remove(function (error) {
      if (!error) {
        //alert('Successfully Deleted.');
        callbackObj.callBack.call(callbackObj.scope, " PaidTo/ReceivedFrom Deleted")
      }else{
        alert('Error!');
      }
    });
  }

  static addNewExpense(firebaseApp, dbPath, expenseObj, callbackObj){
    console.log('addNewExpense :',expenseObj)
    //console.log('expenseObj',expenseObj)
    var databaseRef = firebaseApp.database().ref(dbPath);
    var newPaidRef = databaseRef.push()
    //newPaidRef.set(expenseObj)
    //alert('Successfully Added.Expense.');
    newPaidRef.set(expenseObj).then(function(){
      var msg = (' Expense Entry Added.');
      callbackObj.callBack.call( callbackObj.scope, msg )
    },function(error){
      console.log('ERROR',error)
    })
  }
  static addNewEarning(firebaseApp, dbPath, earningObj, callbackObj){
    console.log('addNewEarning :',earningObj)
    var databaseRef = firebaseApp.database().ref(dbPath)
    var newPaidRef = databaseRef.push()
    //newPaidRef.set(earningObj)
    //alert('Successfully Added.Income.');
    newPaidRef.set(earningObj).then(function(){
      var msg = (' Income Entry Added.');
      callbackObj.callBack.call( callbackObj.scope, msg )
    }, function(error){
      console.log('ERROR',error)
    });
  }

  static deleteIncomeEntry(firebaseApp, dbPath, callbackObj){
    var dbRefToDelete = firebaseApp.database().ref(dbPath);
    dbRefToDelete.remove(function (error) {
      if (!error) {
          //alert('Successfully Deleted.');
          var msg = (' Income Entry Deleted.');
          callbackObj.callBack.call( callbackObj.scope, msg )
        }else{
          alert('Error!');
        }
    });
  }
  static deleteExpenseEntry(firebaseApp, dbPath, callbackObj){
    var dbRefToDelete = firebaseApp.database().ref(dbPath);
    dbRefToDelete.remove(function (error) {
      if (!error) {
          //alert('Successfully Deleted.');
          var msg = (' Expense Entry Deleted.');
          callbackObj.callBack.call( callbackObj.scope, msg )
        }else{
          alert('Error!');
        }
    });
  }
  

  // ====== Utility functions
  static addKeyToEachElement(objRef){
    for (const key in objRef) {
      if (objRef.hasOwnProperty(key)) {
        const element = objRef[key]
        element.key = key
      }
    }
    return objRef
  }
  static getSortedDataObj(dataObj){
    var aSortedData = dataObj.sort(function(a,b){
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
    return aSortedData
  }
  // ====== / Utility functions

  // ===  Filter
  static filterByCategoryName(aData,categoryName){
    var filteredArray = []
    var filteredTotal = 0
    var key;
    for (key in aData) {
      if (aData.hasOwnProperty(key)) {
        var element = aData[key];
        if(element.paidForProject === categoryName){
          filteredArray.push(element)
        }
      }
    }
    return {filteredArray,filteredTotal}
  }
  static filterByPaidToName(aData,personName){
    var filteredArray = []
    var filteredTotal = 0
    var key;
    for (key in aData) {
      if (aData.hasOwnProperty(key)) {
        var element = aData[key];
        if(element.paidTo === personName){
          filteredArray.push(element)
        }
      }
    }
    return {filteredArray,filteredTotal}
  }
  static filterBydate(aData,dtValue){
    var filteredArray = []
    var filteredTotal = 0
    var key;
    for (key in aData) {
      if (aData.hasOwnProperty(key)) {
        var element = aData[key];
        if(element.paidOn === dtValue){
          filteredArray.push(element)
        }
      }
    }
    return {filteredArray,filteredTotal}
  }
  static filterByMonth(aData,monthValue){
    console.log('filterByMonth')
    //console.log('monthValue',monthValue)

    var filteredArray = []
    var filteredTotal = 0
    var key;
    for (key in aData) {
      if (aData.hasOwnProperty(key)) {
        var element = aData[key];
        var paidMonth = new Date(element.paidOn).getMonth()
        var filterMonth = new Date(monthValue).getMonth()
        
        if(paidMonth === filterMonth){
          //console.log('paidMonth',paidMonth,'filterMonth',filterMonth)
          filteredArray.push(element)
        }
        
      }
    }
    return {filteredArray,filteredTotal}
  }
  // === / filter
  

}
export default FirebaseUtil

export function filterDataBy(){
  console.log('FirebaseUtil : FilterDataBy : ');
}