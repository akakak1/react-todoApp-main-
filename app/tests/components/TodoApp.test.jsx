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
        it('should add todo to the todos state when handleAddTodo', ()=>{
            var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
            var todoText = 'test text';

            todoApp.setState({todos:[]});
            todoApp.handleAddTodo(todoText);

            expect(todoApp.state.todos[0].text).toBe(todoText);
        })
    })
})