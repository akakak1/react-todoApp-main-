var React = require('react');

var Todo = React.createClass({
    
    render: function(){
        var {id, text, completed, onToggle} = this.props;

        function handleToggle(){
                onToggle(id);
        }
        
        return (
            <div onClick={handleToggle}>
                <input type="checkbox" checked={completed} />
                {text}
            </div>
        )
    }
});

module.exports = Todo;