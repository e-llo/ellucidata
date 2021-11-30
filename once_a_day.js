// checks if one day has passed. 
function hasOneDayPassed(){
  // get today's date. eg: "7/03/2021"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == date ) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}


// some function which should run once a day
function runOncePerDay(){
  if( !hasOneDayPassed() ) return false;

  // your code below
  alert('Good morning!');
}


// runOncePerDay(); // run the code
// runOncePerDay(); // does not run the code

