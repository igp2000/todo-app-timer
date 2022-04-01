import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    id: null,
    className: null,
    description: '',
    time: 0,
    completed: false,
    created: Date.now(),
    onDelete: () => {},
    onCompleted: () => {},
    onEditing: () => {},
    onTaskNewValue: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    className: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.number,
    completed: PropTypes.bool,
    created: PropTypes.number,
    onDelete: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onTaskNewValue: PropTypes.func,
  };

  state = {
    taskDesc: this.props.description,
    timeActiv: this.props.time,
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

  setPlayPause(id, target) {
    const btnId = target.id;
    const button =
      btnId === `btn-play-${id}`
        ? document.getElementById(`btn-pause-${id}`)
        : document.getElementById(`btn-play-${id}`);
    target.classList.add('none');
    button.classList.remove('none');
  }

  timerInterval = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      return null;
    } else {
      return setInterval(() => {
        let time = this.state.timeActiv > 0 ? this.state.timeActiv - 1 : 0;
        this.setState({ timeActiv: time });
        if (time === 0) {
          this.onCompleted(this.props.onCompleted);
        }
      }, 1000);
    }
  };

  onClickTimer = (id, target) => {
    this.setPlayPause(id, target);
    this.timerId = this.timerInterval();
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
                disabled={completed}
              >
                ⏸︎
              </button>
              {format(this.state.timeActiv * 1000, 'm:s')}
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
