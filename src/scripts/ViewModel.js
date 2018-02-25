const storage = window.localStorage;
let sortCount = 0;

/** Expense class: */
function Expense(name, price) {
  this.name = name;
  this.price = price;
}

/** Our ViewModel object constructor */
function ViewModel() {
  let self = this;

  self.expensList = ko.observableArray([]);
  self.newName = ko.observable();
  self.newPrice = ko.observable();

  /** Add new expense to the list */
  self.add = () => {

    /** Push new item into expenses observable array */
    self.expensList.unshift(
      new Expense( self.newName(), self.newPrice() )
    );

    /** Saves new version of expenses array into LocalStorage */
    storage.myExpenses = JSON.stringify(self.expensList());

    /** HTML forms cleanup */
    self.newName( '' );
    self.newPrice( '' );
  }

  self.sort = () => {

    if(sortCount%2 === 0) {
      sortCount++;

      self.expensList.sort((a, b) => {
        return a.name.toUpperCase() == b.name.toUpperCase() ? 0 :
          (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)
      })

    } else {
      sortCount++;
      self.expensList.reverse();
    }
  }

  /** This is for emergency cleanup :D */
  self.cleanUp = () => {
    storage.removeItem('myExpenses');
    self.init();
  };

  /** Computes total expenses */
  self.total = ko.computed(() => {
    let total = 0;
    if(self.expensList()){
      for(let i = 0; i < self.expensList().length; i++) {
        total += Number(self.expensList()[i].price);
      }
    }
    return ' $' + total;
  });

  /** Initialization script */
  self.init = () => {
    /** Obtain whatever is in localStorage */
    const stored = storage.getItem('myExpenses');

    /** If there was something let's parse it */
    if(stored) {
      let parsed = JSON.parse(stored);

      /** Passes parsed items into observableArray */
      self.expensList(parsed);
    } else {
      /** Passes empty array into*/
      self.expensList([]);
    }
  }
  self.init()
}

ko.applyBindings(new ViewModel());
