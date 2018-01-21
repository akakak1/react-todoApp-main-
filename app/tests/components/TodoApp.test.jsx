var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoApp = require('TodoApp');

describe('TodoApp', ()=>{
    it('should exist', ()=>{
        expect(TodoApp).toExist();
    })

    describe('handleAddTodo', ()=>{
        it('should add todo to the todos state when handleAddTodo', ()=> {
            var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
            var todoText = 'test text';

            todoApp.setState({todos:[]});
            todoApp.handleAddTodo(todoText);

            expect(todoApp.state.todos[0].text).toBe(todoText);
        })
    })

    describe('handleToggle', ()=> {
        it('should toggle completed value when handleToggle called', ()=> {
            var todoData = {
                id:11,
                text: 'Test features',
                completed: false,
            }

            var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
            todoApp.setState({todos: [todoData]});

            expect(todoApp.state.todos[0].completed).toBe(false);
            todoApp.handleToggle(11);
            expect(todoApp.state.todos[0].completed).toBe(true);
        })
    })
})