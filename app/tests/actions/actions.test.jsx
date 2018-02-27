var expect = require('expect');
var actions = require('actions');


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
            text: 'Some todo'
        }

        var res = actions.addTodo(action.text);

        expect(res).toEqual(action);
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
    })


    it('should genereate toggle todo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: '123'
        }

        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    })
})