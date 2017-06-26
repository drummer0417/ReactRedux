var redux = require('redux');

console.log('starting redux-example ');

//                Pure function:
//  * allways returns the same input if given the same input
//  * does not have side effect. Does not update anything outside itself,
//    does not depend on vars outside itself (or use them)
//  * can not hava async request, no promisses or callbacks
//  * not allowed to update values of objects passed in (parms)
//

var reducer = (state = {name: 'Anonymous'}, action) => {

  console.log('New action: ', action);
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
      break;
    default:
      return state;
  }
};
var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState: ' + JSON.stringify(currentState));

var action = {
  type: 'CHANGE_NAME',
  name: 'Hans'
}
store.dispatch(action);
console.log('currentState: ' + JSON.stringify(currentState));
console.log('newState: ' + JSON.stringify(store.getState()));
