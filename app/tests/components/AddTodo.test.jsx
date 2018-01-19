var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var AddTodo = require('AddTodo');

describe('AddTodo', ()=>{
    it('should exist', ()=>{
        expect(AddTodo).toExist();
    })

    describe('onAddTodo', ()=> {
        it('should call onAddTodo props with valid data', ()=> {
            var spy = expect.createSpy();
            var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);

            var $el = $(ReactDOM.findDOMNode(addTodo));
            var todoText = 'Check mail';
            addTodo.refs.todoText.value=todoText;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toHaveBeenCalledWith(todoText);
        })

        it('should not call onAddTodo props when invalid input', ()=> {
            var spy = expect.createSpy();
            var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);

            var $el = $(ReactDOM.findDOMNode(addTodo));
            var todoText = '';
            addTodo.refs.todoText.value=todoText;
            TestUtils.Simulate.submit($el.find('form')[0]);

            expect(spy).toNotHaveBeenCalled();
        })
    })
})