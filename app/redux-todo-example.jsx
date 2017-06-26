var redux = require('redux');

var defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = defaultState, action) => {

  switch (action.type) {
    case 'CHANGE_SEARCHTEXT':
      return {
        ...state,
        searchText: action.text
      };
      break;
    default:
      return state;
  }
}

var store = redux.createStore(reducer);
var currentState = store.getState();

console.log('state from store: ' + JSON.stringify(currentState, undefined, 2));

var action = {
  type: 'CHANGE_SEARCHTEXT',
  text: 'the new text'
}

store.dispatch(action);
console.log('state after dispach action: ' + JSON.stringify(store.getState(), undefined, 2));
