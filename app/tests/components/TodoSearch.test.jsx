var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', ()=>{
    it('should exist', ()=>{
        expect(TodoSearch).toExist();
    })

    describe('onSearch prop',()=>{
        it('should call onSearch prop with entered input text', ()=>{
            var spy = expect.createSpy();
            var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

            var searchText = 'Dog';
            todoSearch.refs.searchText.value = searchText;
            TestUtils.Simulate.change(todoSearch.refs.searchText)

            expect(spy).toHaveBeenCalledWith(false,'Dog');
        })

        it('should call onSearch prop with proper checked value', ()=>{
            var spy = expect.createSpy();
            var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

            todoSearch.refs.showCompleted.checked = true;
            TestUtils.Simulate.change(todoSearch.refs.showCompleted)

            expect(spy).toHaveBeenCalledWith(true,'');
        })
    })
})