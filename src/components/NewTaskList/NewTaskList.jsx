import React, { Component } from 'react';
import './NewTaskList.css';
import PropTypes from 'prop-types';

export default class NewTaskList extends Component {
  static defaultProps = {
    className: null,
    placeholder: '',
  };

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
  };

  state = {
    newTask: '',
  };

  formSubmit = (event) => {
    event.preventDefault();
    if (!this.state.newTask.trim()) {
      return;
    }
    this.props.taskAdd(this.state.newTask.trim());
    this.setState({ newTask: '' });
  };

  onChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  render() {
    const { className, placeholder } = this.props;

    return (
      <form className="form-new-task-list" onSubmit={this.formSubmit}>
        <label>
          <input
            className={className}
            placeholder={placeholder}
            value={this.state.newTask}
            onChange={this.onChange}
            autoFocus
          />
        </label>
      </form>
    );
  }
}
