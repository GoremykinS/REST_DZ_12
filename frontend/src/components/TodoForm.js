import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'projects': ''
        }
    }

    handleSubmit(event) {
        this.props.newTodo(this.state.text, this.state.projects)
        event.preventDefault()
    }

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let projects = []
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            projects.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'projects': projects
        })
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input
                    type="text"
                    name="text"
                    placeholder="text"
                    onChange={(event) => this.handleTextChange(event)}
                    value={this.state.text}/>
                <select multiple onChange={(event) => this.handleProjectsChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}>{project.project_users} {project.project_name} {project.git_name} </option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default TodoForm