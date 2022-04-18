import React from 'react'
import logo from './logo.svg';
import './App.css';
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import UserList from './components/UserList.js'
import ProjectTodoList from './components/ProjectTodoList.js'
import ProjectUserList from './components/ProjectUserList.js'
import LoginForm from './components/LoginForm.js'
import TodoForm from './components/TodoForm.js'
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'todos': [],
            'users': [],
            'token': ''
        }
    }

   getData() {
        let headers = this.getHeader()

        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })

        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data

                this.setState({
                    'todos': todos
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todos': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data

                this.setState({
                    'users': users
                })
            })
               .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
   }




    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }


    newTodo(text, projects) {
        let headers = this.getHeader()
        console.log(text, projects)
        axios
            .post('http://127.0.0.1:8000/api/todos/', {'text': text, 'projects': projects}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteTodo(id) {
        let headers = this.getHeader()
        console.log(id)
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({
                    'todos': this.state.todos.filter((todo) => todo.id != id)
                })
            })
            .catch(error => {
                console.log(error)
            })

    }





    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }
//                        http://localhost:3000/#/todos

    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Projects</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                        <li><Link to='/todos/create'>New todos</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li>
                            { this.isAuth() ? <button onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link> }
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element = {<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>} />} />
                        <Route exact path='/todos/create' element = {<TodoForm projects={this.state.projects} newTodo={(text, projects) => this.newTodo(text, projects)}/>} />
                        <Route exact path='/users' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
                        <Route exact path='/projects' element = {<Navigate to='/' />} />
                        <Route path='/project/:id' element = {<ProjectTodoList todos={this.state.todos} />} />
                        <Route path='/user/:id' element = {<ProjectUserList projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;