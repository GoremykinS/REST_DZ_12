import {useParams} from 'react-router-dom'


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.time}
            </td>
            <td>
                {todo.author}
            </td>
            <td>
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
            </td>>
        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Time
            </th>
            <th>
                Authors
            </th>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
        </table>
    )
}

export default TodoList