import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './Footer.css';

const Footer = ({ countCompleted, setFilter, onClearCompleted }) => {
  const ClearCompleted = () => {
    onClearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count">{countCompleted} items left</span>
      <TasksFilter setFilter={setFilter} />
      <button className="clear-completed" onClick={ClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  countCompleted: 0,
  setFilter: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  countCompleted: PropTypes.number,
  setFilter: PropTypes.func,
  onClearCompleted: PropTypes.func,
};

export default Footer;
