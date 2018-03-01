var $ = require('jquery');

module.exports = {
    filterTodos: function(todos, showCompleted, searchText){
        var filteredTodos = todos;

        //Filter by showCompleted
        filteredTodos = filteredTodos.filter((todo)=> {
            return !todo.completed || showCompleted ;
        });

        //Filter todos by searchText
        filteredTodos = filteredTodos.filter((todo)=>{
            var todoText = todo.text.toLowerCase();
            return  searchText.length === 0 || todoText.indexOf(searchText) > -1 ;
        })

        //Sort todos with incompleted todos first
        filteredTodos.sort((a,b)=>{
            if(!a.completed && b.completed){
                return -1;
            } else if(a.completed && !b.completed){
                return 1;
            } else {
                return 0;
            }
        });

        return filteredTodos;
    }
}