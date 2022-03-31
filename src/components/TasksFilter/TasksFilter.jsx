import React, { Component } from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    setFilter: () => {},
  };

  static propTypes = {
    setFilter: PropTypes.func,
  };

  state = {
    flagFilter: null,
  };

  dataFilter = (flag) => {
    this.setState({ flagFilter: flag });
    this.props.setFilter(flag);
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className={this.state.flagFilter === null ? 'selected' : undefined}
            onClick={() => this.dataFilter(null)}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.state.flagFilter === false ? 'selected' : undefined}
            onClick={() => this.dataFilter(false)}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.state.flagFilter === true ? 'selected' : undefined}
            onClick={() => this.dataFilter(true)}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
