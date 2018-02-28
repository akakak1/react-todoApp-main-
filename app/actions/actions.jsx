import firebase, {firebaseRef} from 'app/firebase/';   // app/firebase/index   ... we can remove if the file name is index.

import moment from 'moment';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};


export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'   
    };
};


export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
};


export var startAddTodo = (text) => {
    return(dispatch, getState) => {                                       // the arguments are not clear.
        var todo = {
                text: text,                      // we can also use ES6
                completed: false,
                createdAt: moment().unix(),
                completedAt: null              // we are not storing the completedAt in the database .... WHY ????
        };

        var todoRef = firebaseRef.child('todos').push(todo);

        return todoRef.then(() => {                           // Here we are returning the promise so that we can chain it again
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    };
};


export var addTodos = (todos) => {   // this will add todos from local storage to the store.
    return {
        type: 'ADD_TODOS',
        todos
    };
};


export var toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};