import React, { Component } from 'react';
import './NewTaskList.css';
import PropTypes from 'prop-types';

export default class NewTaskList extends Component {
  static defaultProps = {
    taskAdd: () => {},
  };

  static propTypes = {
    taskAdd: PropTypes.func,
  };

  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  formSubmit = (event) => {
    if (event.keyCode !== 13 || !this.state.description) {
      return;
    }
    event.preventDefault();
    this.props.taskAdd(this.state);
    this.setState({ description: '', minutes: '', seconds: '' });
  };

  onChange = (event) => {
    let value = event.target.value.trim();
    if (event.target.name !== 'description' && Number(value) < 0) {
      value = '';
    }
    this.setState({ [event.target.name]: value });
  };

  render() {
    return (
      <form className="form-new-task-list" onKeyDown={this.formSubmit}>
        <label>
          <input
            name="description"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.description}
            onChange={this.onChange}
            autoFocus
          />
        </label>
        <label>
          <input
            name="minutes"
            className="new-todo-time"
            value={this.state.minutes}
            onChange={this.onChange}
            placeholder="Min"
            type="number"
            min="0"
          />
        </label>
        <label>
          <input
            name="seconds"
            className="new-todo-time"
            value={this.state.seconds}
            onChange={this.onChange}
            placeholder="Sec"
            type="number"
            min="0"
          />
        </label>
      </form>
    );
  }
}
