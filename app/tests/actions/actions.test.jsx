import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';

var actions = require('actions');


var createMockStore = configureMockStore([thunk]);   // configureMockStore() takes an array of middlewares as argument.


describe('Action', () => {
    it('should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search text'
        };

        var res = actions.setSearchText(action.searchText);
        
        expect(res).toEqual(action);
    });


    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',    // here we dont have comma in the action generator.... so what would happen if we use toBe() instead of toEqual() ;
        }

        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });


    it('should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: 'xyz123',
                text: 'Anything',
                completed: false,
                createdAt: 0
            }
        }

        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });



    /////   Testing action that deals with async task   /////     
    ///////////////////////////////////////////////////////////////////////////////

    // This will give an error::::  Error: The "actual" argument in expect(actual).toInclude() must be an array or a string


    // it('should create todo and dispatch ADD_TODO', (done) => {
    //     const store = createMockStore({});
    //     const todoText = 'My todo item';

    //     store.dispatch(actions.startAddTodo(todoText)).then(() => {
    //       const actions = store.getActions();
    

        
    //       expect(actions[0]).toInclude({             
    //         type: 'ADD_TODO'
    //       });
    //       expect(actions[0].todo).toInclude({
    //         text: todoText
    //       })

    //       done();
    //     }).catch(done);
    //   });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    

    // Testing action that deals with async task
    it('should create todo and dispatch ADD_TODO', (done) => {          // always use 'done' when dealing with async task.
        const store = createMockStore({});     // here we are creating an empty store.
        const todoText = 'Anything to do';

        store.dispatch(actions.startAddTodo(todoText)).then(() => {
            
            const actions = store.getActions();                     // this will return an array of all the actions that got fired up in the store 
            
            expect(actions[0].type).toInclude('ADD_TODO');          // toInclude() is similar to toEqual();
            expect(actions[0].todo.text).toInclude(todoText);
            
            done();             // once this is called, mocka tells the karma that the async task is done
        }).catch(done);         // why use (done)  ??? not clearly explained.
    });




    it('should generate add todos action object', () => {
        var todos = [{
            id: '111',
            text: 'anything',
            completed: false,
            completedAt: undefined,
            createdAt: 33000
        }];

        var action = {
            type: 'ADD_TODOS',
            todos
        };

        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });


    it('should genereate update todo action', () => {
        var action = {
            type: 'UPDATE_TODO',
            id: '123',
            updates: {completed: false}
        }

        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });


    describe('Tests with firebase todos', () => {
        var testTodoRef;

        beforeEach((done) => {
            var todosRef = firebaseRef.child('todos');

            todosRef.remove().then(() => {
                testTodoRef = firebaseRef.child('todos').push();

                return testTodoRef.set({
                    text: 'Something to do',
                    completed: false,
                    createdAt: 123123
                })
            })
            .then(() => done())      // this .then() is applied on the promise returned by set() but note that we are doing this on the outer function, thats possible because the promise of set() is returned from outer function
            .catch(done) ;
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done()) ;        // why not remove the entire todos ??   /// OOOOO::  if there is only one todo item then then todos array will also be deleted.
        });                                                  // and note that we are adding only one todo in the beforeEach() and afterEach() we are deleting only one todo so its equivalent to delete the entire todos array.
                                                              // NOTE: there is one more todo being added by one of the test above ...HOW TO deal with it ????

        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();


                expect(mockActions[0].type).toEqual('UPDATE_TODO');       
                expect(mockActions[0].id).toEqual(testTodoRef.key);
                expect(mockActions[0].updates.completed).toEqual(true);
                expect(mockActions[0].updates.completedAt).toExist();

                //THIS WILL TIMEOUT ERROR //
                // expect(mockActions[0].type).toInclude('UPDATE_TODO');       // NOTE: toInclued is more flexible, with this we dont have to get the exact time to compare with completedAt.
                // expect(mockActions[0].id).toInclude(testTodoRef.key);
                // expect(mockActions[0].updates.completed).toInclude(true);
                // expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done)      // this is the second argument for promise ... NOTE: its a function call.
        });               // VVVI  :: dont use ()  // because i think that call to done will be made in the error handler itself ...


        it('should populate todos and dispatch ADD_TODOS', (done) => {
            const store = createMockStore({});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');     // means this action must be generated ... 
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('Something to do');

                done();
            }, done)
        });
    });
});