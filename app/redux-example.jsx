var redux = require('redux');

console.log('starting redux-example ');

//                Pure function:
//  * allways returns the same input if given the same input
//  * does not have side effect. Does not update anything outside itself,
//    does not depend on vars outside itself (or use them)
//  * can not hava async request, no promisses or callbacks
//  * not allowed to update values of objects passed in (parms)
//

var defaultState = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = defaultState, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
      break;
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.movie.title,
            genre: action.movie.genre
          }
        ]
      }
      break;
    case 'REMOVE_MOVIE':
      var newMovies = state.movies.filter((movie) => {
        return movie.id !== action.id;
      });
      return {
        ...state,
        movies: newMovies
      }
    case 'REMOVE_HOBBY':
      var newMovies = state.movies.filter((movie) => {
        return movie.id !== action.id;
      });
      return {
        ...state,
        movies: state.hobbies.filter((hobby)  => hobby.id !== action.id)
      }
    default:
      return state;
  }
};
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension(): f => f
));

console.log('initialState: ' + JSON.stringify(store.getState()));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log('newState: ' + JSON.stringify(state, undefined, 2));
  document.getElementById('app').innerHTML = JSON.stringify(state);

})
 // unsubscribe();

store.dispatch({type: 'CHANGE_NAME', name: 'Hans'});
store.dispatch({type: 'ADD_HOBBY', hobby: 'Running'});
store.dispatch({type: 'ADD_MOVIE', movie: {title: 'Flodder', genre: 'comedy'}});
store.dispatch({type: 'ADD_HOBBY', hobby: 'Playing drums'});
store.dispatch({type: 'ADD_HOBBY', hobby: 'Biking'});
store.dispatch({type: 'ADD_MOVIE', movie: {title: 'Star Wars', genre: 'Science Fiction'}});
store.dispatch({type: 'ADD_MOVIE', movie: {title: 'Kill Bill', genre: 'Thriller'}});
store.dispatch({type: 'CHANGE_NAME', name: 'Jacky'});
store.dispatch({type: 'REMOVE_MOVIE', id: 2});
store.dispatch({type: 'REMOVE_HOBBY', id: 2});
