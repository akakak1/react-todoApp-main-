import * as redux from 'redux';  // note: redux doesnt have default exports .... ?? but why did we remove require ??
import thunk from 'redux-thunk';   // using thunk we can return functions from the action, and we can do things asynchronously.
import {searchTextReducer, showCompletedReducer, todosReducer}  from 'reducers';

export var configure = ( initialState = {}) => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    })

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));                                                                                       // will give error that cant read property apply of defined .  ( https://github.com/zalmoxisus/redux-devtools-extension/issues/320 )


    return store;    // dont miss this.
};