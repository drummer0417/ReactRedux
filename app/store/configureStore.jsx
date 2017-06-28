var redux = require('redux');
var thunk = require('redux-thunk').default;

var {nameReducer, movieReducer, hobbiesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {

  console.log('in configure');
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: movieReducer,
    map: mapReducer
  });

  // create store *** use redux-thunk to make it possible for redox to use
  // action generators that retunn functions (and not only objects)
  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f => f
  ));

  return store;
}
