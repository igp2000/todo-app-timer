import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Task } from '../Task';
import './TaskList.scss';

export default class TaskList extends Component {
  static defaultProps = {
    taskData: [],
    filterCompleted: null,
    onDelete: () => {},
    onCompleted: () => {},
    onEditing: () => {},
    onTaskNewValue: () => {},
  };

  static propTypes = {
    taskData: PropTypes.array,
    filterCompleted: PropTypes.bool,
    onDelete: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onTaskNewValue: PropTypes.func,
  };

  render() {
    const { taskData, filterCompleted, onDelete, onCompleted, onEditing, onTaskNewValue } = this.props;

    const tasks = taskData.map((task) => {
      const { id, className, description = '', time = 0, created, completed } = task;

      let classNone = '';
      if (filterCompleted !== null && task.completed !== filterCompleted) {
        classNone = ' none';
      }
      return (
        <Task
          id={id}
          className={`${className}${classNone}`}
          description={description}
          time={time}
          created={created}
          completed={completed}
          key={id}
          onDelete={() => onDelete(id)}
          onCompleted={() => onCompleted(id)}
          onEditing={() => onEditing(id)}
          onTaskNewValue={(desc) => onTaskNewValue(id, desc)}
        />
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}
