import React from 'react';
import { Task } from './task';

export class TaskDashboard extends React.Component {

    render(){
        return(
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task => <Task key={task.__id} data={task}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}