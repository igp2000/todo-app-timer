import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    className: null,
    created: Date.now(),
    onDelete: () => {},
    onCompleted: () => {},
    onEditing: () => {},
  };

  static propTypes = {
    className: PropTypes.string,
    created: PropTypes.number,
    onDelete: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
  };

  state = {
    taskDesc: this.props.description,
    timeActiv: 0,
  };

  timerId = null;

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onChange = (event) => {
    this.setState({ taskDesc: event.target.value });
  };

  formSubmit = (event) => {
    event.preventDefault();
    this.props.onTaskNewValue(this.state.taskDesc);
  };

  onClickTimer = (id, target) => {
    const btnId = target.id;
    const button =
      btnId === `btn-play-${id}`
        ? document.getElementById(`btn-pause-${id}`)
        : document.getElementById(`btn-play-${id}`);
    target.classList.add('none');
    button.classList.remove('none');
    this.timerId = this.timerInterval(this.timerId);
  };

  timerInterval = (id) => {
    if (id) {
      clearInterval(id);
      return null;
    } else {
      return setInterval(() => {
        this.setState({ timeActiv: this.state.timeActiv + 1 });
      }, 1000);
    }
  };

  onCompleted = (func) => {
    func();
    if (this.timerId) {
      const button = document.getElementById(`btn-pause-${this.props.id}`);
      this.onClickTimer(this.props.id, button);
    }
  };

  render() {
    const { id, className, created, completed, onDelete, onCompleted, onEditing } = this.props;
    const tm = formatDistanceToNow(created, { includeSeconds: true });

    return (
      <li className={className}>
        <div className="view">
          <input
            id={`chb${id}`}
            className="toggle"
            type="checkbox"
            onChange={() => this.onCompleted(onCompleted)}
            checked={completed}
          />
          <label htmlFor={`chb${id}`}>
            <span className="title">{this.state.taskDesc}</span>
            <span className="description">
              <button
                id={`btn-play-${id}`}
                className="icon icon-play"
                onClick={(event) => this.onClickTimer(id, event.target)}
                disabled={completed}
              >
                ⏵︎
              </button>
              <button
                id={`btn-pause-${id}`}
                className="icon icon-pause none"
                onClick={(event) => this.onClickTimer(id, event.target)}
              >
                ⏸︎
              </button>
              {this.state.timeActiv}
            </span>
            <span className="created">{`created ${tm} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditing} title="Edit" />
          <button className="icon icon-destroy" onClick={onDelete} title="Delete" />
        </div>
        {className === 'editing' && (
          <form className="form-edit" onSubmit={this.formSubmit} style={{ margin: 0 }}>
            <label style={{ padding: 0 }}>
              <input type="text" className="edit" value={this.state.taskDesc} onChange={this.onChange} autoFocus />
            </label>
          </form>
        )}
      </li>
    );
  }
}
