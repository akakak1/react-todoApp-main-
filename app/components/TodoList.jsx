var React = require('react');
var Todo = require('Todo');
var {connect} = require('react-redux');    // this function is a companion to the Provider, the connect() allows an individual component to connect to the store and get the required part of the state.

export var TodoList = React.createClass({

    render: function(){
        var {todos} = this.props;

        var renderTodos=()=> {
            if(todos.length === 0) {
                return (
                    <p className="container__message">ALL DONE</p>
                )
            }
            return todos.map((todo)=>{
                return (
                    <Todo key={todo.id} {...todo}/>
                )
            });
        };
        return (
            <div>
                {renderTodos()}
            </div>
        )
    }
});

export default connect(
    (state) => {
        return {
            todos: state.todos   //  this todos array will be passed as props to the component.
        }
    }
)(TodoList); 