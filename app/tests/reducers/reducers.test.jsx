var expect  = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');



describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                text: 'dog'
            }

            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });


    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe('todoReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'Something to do',
                    completed: false,
                    createdAt: 123456
                }
            };

            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            var todos = [{
                id: '123',
                text: 'something',
                completed: true,
                createdAt: 123,
                completedAt: 125
            }];

            var updates = {
                completed: false,
                completedAt: null
            }

            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            }

            var res = reducers.todosReducer(df(todos), df(action)) ;

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);              // to ensure that other fields are not affected.
        });

        it('should add existing todos', () => {
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

            var res = reducers.todosReducer(df([]), df(action));    //note: here we are assuming that initially there were no todos.
            expect(res.length).toEqual(todos.length);
            expect(res[0]).toEqual(todos[0]);
        });

    });
});