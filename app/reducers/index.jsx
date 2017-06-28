
export var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
      break;
    default:
      return state;
  }
};

export var nextMovieId = 1;
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

export var mapReducer = (state = {isFetching: false, url:undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
    console.log('in case START_LOCATION_FETCH');
      return {
        isFetching: true,
        url: undefined
      }
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      }
    default:
      return state;
  }
};
