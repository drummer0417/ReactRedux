var redux = require('redux');

console.log('starting redux-example ');

//                Pure function:
//  * allways returns the same input if given the same input
//  * does not have side effect. Does not update anything outside itself,
//    does not depend on vars outside itself (or use them)
//  * can not hava async request, no promisses or callbacks
//  * not allowed to update values of objects passed in (parms)
//

// ----------------------------------
// name reducer and action generators
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
      break;
    default:
      return state;
  }
};
var changeName = ((name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
})

// -----------------------------------
// hobby reducer and action generators
var nextHobbyId = 1;
var hobbiesReducer = (hobbies = [], action) => {

  switch (action.type) {
    case 'ADD_HOBBY':
      return [...hobbies,
            {
              id: nextHobbyId++,
              hobby: action.hobby
            }
        ];
      break;
    case 'REMOVE_HOBBY':
      return hobbies.filter((hobby) => hobby.id !== action.id)
      break;
    default:
      return hobbies;
  }
};
var addHobby = ((hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
});
var removeHobby = ((id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
});

// -----------------------------------
// movie reducer and aciton generators
var nextMovieId = 1;
var movieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      action.movie.id = nextMovieId++;
      return [...state, action.movie]
      break;
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
      break;
    default:
      return state;
  }
};
var addMovie = ((movie) => {
  return {
    type: 'ADD_MOVIE',
    movie
  }
});
var removeMovie = ((id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
});

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension(): f => f
));

console.log('initialState: ' + JSON.stringify(store.getState()));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log('newState: ' + JSON.stringify(state));
  document.getElementById('app').innerHTML = JSON.stringify(state);
})
 // unsubscribe();

store.dispatch(changeName('Hans'));
store.dispatch(changeName('Jacky'));

store.dispatch(addHobby('Playing drums'));
store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Biking'));
store.dispatch(removeHobby(2));

store.dispatch(addMovie({title: 'Star Wars', genre: 'Science Fiction'}));
store.dispatch(addMovie({title: 'Flodder', genre: 'comedy'}));
store.dispatch(addMovie({title: 'Kill Bill', genre: 'Thriller'}));
store.dispatch(removeMovie(2));
