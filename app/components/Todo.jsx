var React = require('react');
var moment = require('moment');

var {connect} = require('react-redux');   // note this connect will give us the dispatch and it will be available as props
var actions = require('actions');

var Todo = React.createClass({
    
    render: function(){
        var {id, text, completed, onToggle, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo' ;

        var renderDate = ()=> {
            var message = 'Created ';
            var timestamp = createdAt;

            if(completed) {
                message = 'Completed ';
                timestamp = completedAt;
            }
            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        }


        return (
            <div className={todoClassName} onClick={() => {
                dispatch(actions.toggleTodo(id));        // dispacthing an action. 
            }}>
                <div>
                    <input type="checkbox" checked={completed} />
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        )
    }
});

module.exports = connect()(Todo);  // note: the todo items are being passed down by the TodoList component so we dont nedd to get this from here.