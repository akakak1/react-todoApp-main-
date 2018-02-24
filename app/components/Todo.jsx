var React = require('react');
var moment = require('moment');

var {connect} = require('react-redux');   // note this connect will give us the dispatch and it will be available as props
var actions = require('actions');

export var Todo = React.createClass({     //  we are exporting this just for the use of testing.
    
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


// Below we are exporting the reduxed component
export default connect()(Todo);        // this is the default export (ie when someone does:  var somevar = require('Todo') .... this is the default)

// module.exports = connect()(Todo);  // note: the todo items are being passed down by the TodoList component so we dont nedd to get this from here.