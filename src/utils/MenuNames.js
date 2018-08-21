/**
 * Menu Item names as a static class
 * 
 * ES6 Class
 * @author saumya
 */

class MenuNames {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return 'Hello ' + this.name + '!';
  }

  static getAllNames(){
    return (
      {
        generalMenu:{
          HOME: "HOME",
        },
        leftMenu:
          {
            LOGIN: "LOGIN",
            LOGOUT: "LOGOUT",
            CATEGORY: "CATEGORY",
            PAIDTO: "PAID-TO",
            ADDRECEIVES: "ADD-RECEIVES",
            ADDPAYMENTS: "ADD-PAYMENTS",
            VIEWINCOMES: "VIEW-INCOMES",
            VIEWPAYMENTS: "VIEW-PAYMENTS",
            FILTERPAYMENTS: "FILTER-PAYMENTS",
            FILTERINCOMES: "FILTER-INCOMES",
            ABOUT: "ABOUT",
          }
      }
    )
  }
}

export function getMessages() {
  return ({
    APP_VERSION: "4.0.0",
    FIRST_RUN_CREATE: " First create (1) Categories, (2) PaidTos, (3) Add some Income/Expense.",
    CAN_NOT_BE_BLANK: " can not be blank."
  })
}

export default  MenuNames