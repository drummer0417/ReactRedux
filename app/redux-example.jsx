var redux = require('redux');
// var axios = require('axios');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

console.log('starting redux-example ');

//                Pure function:
//  * allways returns the same input if given the same input
//  * does not have side effect. Does not update anything outside itself,
//    does not depend on vars outside itself (or use them)
//  * can not hava async request, no promisses or callbacks
//  * not allowed to update values of objects passed in (parms)
//

// -----------------------------------

console.log('initialState: ' + JSON.stringify(store.getState()));

// var fetchLocation = () => {
//
//    // call action generater startLocationFetch
//    store.dispatch(actions.startLocationFetch());
//
//    axios.get('http://ipinfo.io').then(( res) =>{
//
//      var url = 'http://maps.google.com?q=';
//      var location = res.data.loc;
//      console.log('afer call axios, url: ' + url + location);
//      // call action generater completeLocationFetch
//      store.dispatch(actions.completeLocationFetch(url + location));
//    });
//  }

// fetchLocation();
store.dispatch(actions.fetchLocation());

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();
  console.log('state: ' + JSON.stringify(state, undefined, 2));

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = "<br/><p>Loading...</p>";
  } else if (state.map.url){
    document.getElementById('app').innerHTML = "<br/><a href='" + state.map.url + " ' target='_blank'>This is your IP's location</a>";
  }

})
 // unsubscribe();

store.dispatch(actions.changeName('Hans'));
store.dispatch(actions.changeName('Jacky'));

store.dispatch(actions.addHobby('Playing drums'));
store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Biking'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addMovie({title: 'Star Wars', genre: 'Science Fiction'}));
store.dispatch(actions.addMovie({title: 'Flodder', genre: 'comedy'}));
store.dispatch(actions.addMovie({title: 'Kill Bill', genre: 'Thriller'}));
store.dispatch(actions.removeMovie(2));
