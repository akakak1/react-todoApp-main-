import firebase, {firebaseRef, githubProvider} from 'app/firebase/';   // app/firebase/index   ... we can remove if the file name is index.

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
                                // getting the auth from the state.
        var uid = getState().auth.uid; 
        var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

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


export var startAddTodos = () => {
    return (dispatch, getState) => {

        var uid = getState().auth.uid;
        var todosRef = firebaseRef.child(`users/${uid}/todos`);

        return todosRef.once('value').then((snapshot) => {
            var todos = snapshot.val() || {};
            // console.log(todos);   // this showed that todos is an object with subobjects ..... (NOTE: snapshot.val() represents the exact structure )
            var parsedTodos = [];

            Object.keys(todos).forEach((todoId) => {
                parsedTodos.push({
                    id: todoId,
                    ...todos[todoId]      // why are we using [] ?? is todos an array ???  ANS =>...(once object is destructured it gives an associative array in which key of the property is the key for the  associative array.)
                });
            });

            // console.log(parsedTodos);   // This showed that once object is destructured it gives an associative array in which key of the property is the key for the  associative array.


            dispatch(addTodos(parsedTodos));

        })
    }
}


export var updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export var startToggleTodo = (id, completed) => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);    // ES5 :  child('/todos' + id)
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        return todoRef.update(updates).then(() => {
            dispatch(updateTodo(id, updates));
        });
    };
};


// This will be used to set the uid that will be used to identify separate users and display todos related to them.
export var login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    };
};


// These are async actions.......... NOTE: async actions returns a function instead of an object
export var startLogin = () => {
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(githubProvider).then((result)=> {         // we are returning the promise so that we can chain it in the tests !!!!
            console.log('Auth worked', result);
        }, (error) => {
            console.log('Unable to login', error);
        });
    };
};


export var logout = () => {
    return {
        type: 'LOGOUT'
    };
};


export var startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        });
    }
}