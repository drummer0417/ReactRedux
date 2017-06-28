var axios = require('axios');

// ----------------------------------
// name action generators
export var changeName = ((name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
})

// -----------------------------------
// hobby action generators
export var addHobby = ((hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
});
export var removeHobby = ((id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
});

// -----------------------------------
// movie  aciton generators
export var addMovie = ((movie) => {
  return {
    type: 'ADD_MOVIE',
    movie
  }
});
export var removeMovie = ((id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
});

// -----------------------------------
// map  aciton generators
export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}
//
// NOTE this action returns a fucntino instead of an object, possible because
// NOTE of the use of redux-thumk
//
export var fetchLocation = () => {
  return (dispatch, getState) => {
    // call action generater startLocationFetch
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(( res) =>{

      var url = 'http://maps.google.com?q=';
      var location = res.data.loc;
      console.log('afer call axios, url: ' + url + location);
      // call action generater completeLocationFetch
      dispatch(completeLocationFetch(url + location));
    });
  }
};
