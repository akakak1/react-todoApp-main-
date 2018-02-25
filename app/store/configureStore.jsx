
var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

export var configure = ( initialState = {}) => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    })

    var store = redux.createStore(reducer, initialState, redux.compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));                                                                                       // will give error that cant read property apply of defined .  ( https://github.com/zalmoxisus/redux-devtools-extension/issues/320 )


    return store;    // dont miss this.
};