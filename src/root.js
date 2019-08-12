import React from 'react';
import { TaskDashboard } from './components/task-dasboard';
import { withDataAccess } from './HOCS';

class Root extends React.Component {

    state = {
        tasks: [],
    }

    componentDidMount(){
        this.props._get().then(tasks => this.setState({tasks}))
    }

    render(){
        return (
            <div className="container">
                <TaskDashboard tasks={this.state.tasks}/>
            </div>
        )
    }
}

export default withDataAccess(Root,{
    defaultCollection: 'tasks',
    withIds: true,
});