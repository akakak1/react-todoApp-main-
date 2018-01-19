var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', ()=>{
    it('should exist', ()=>{
        expect(TodoList).toExist();
    })

    describe('Render Todo', ()=>{
        it('should render one Todo component for each todo item', ()=>{
            var todos =[
                {
                    id:1,
                    text:'Check mail'
                },
                {
                    id:2,
                    text:'Play game'
                }
            ]
            var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
            var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);  // VVI: pass todoList not TodoList as the first argument. (Else it will give some invariant error)

            expect(todoComponents.length).toBe(todos.length);
        })
    })
})