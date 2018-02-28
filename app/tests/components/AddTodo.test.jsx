var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');


//now we need to import actions for this .....because our action is created by a function and we are not creating our action explicitly
import * as actions from 'actions';      // here all the exports are collected in the actions object ....  :) 
var {AddTodo} = require('AddTodo');

describe('AddTodo', ()=>{
    it('should exist', ()=>{
        expect(AddTodo).toExist();
    })

    describe('onAddTodo', ()=> {
        it('should dispatch ADD_TODO when valid todo text', ()=> {

            var todoText = 'Check mail';
            var action = actions.startAddTodo(todoText);      // NOTE: our action will be returned by startAddTodo()
                                                              // DOUBT : where is the type property in the action returned by this function ???
            var spy = expect.createSpy();
            var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);

            var $el = $(ReactDOM.findDOMNode(addTodo));
            addTodo.refs.todoText.value=todoText;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toHaveBeenCalledWith(action);
        })

        it('should not dispatch ADD_TODO when valid todo text', ()=> {
            var todoText = '';

            var spy = expect.createSpy();
            var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);

            var $el = $(ReactDOM.findDOMNode(addTodo));
            addTodo.refs.todoText.value=todoText;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toNotHaveBeenCalled();
        })
    })
})