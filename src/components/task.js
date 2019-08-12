import React from 'react';

export class Task extends React.Component {
    render(){
        const {title,description} = this.props.data;
        return(
            <tr>
                <td>{title}</td>
                <td>{description}</td>
                <td>inactive</td>
            </tr>
        )
    }
}