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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension(): f => f
));

var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('new searchText: ' + state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
})
// unsubscribe();

var currentState = store.getState();

console.log('state from store: ' + JSON.stringify(currentState, undefined, 2));

store.dispatch({type: 'CHANGE_SEARCHTEXT', text: 'Dog'});
store.dispatch({type: 'CHANGE_SEARCHTEXT', text: 'Friettent'});
store.dispatch({type: 'CHANGE_SEARCHTEXT', text: 'OnePlus3'});
store.dispatch({type: 'CHANGE_SEARCHTEXT', text: 'iets'});
// unsubscribe();
store.dispatch({type: 'CHANGE_SEARCHTEXT', text: 'deze mag je niet meer zien'});
