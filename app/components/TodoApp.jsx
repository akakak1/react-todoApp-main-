var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');


import TodoList from 'TodoList';   // Here we are using the default export( means the connected one)
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';   // here we want the one that is connected to the store  (ie the default )....


var TodoApp = React.createClass({
    
    render:function(){
        
        return(
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoSearch/>
                            <TodoList/>
                            <AddTodo/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = TodoApp;