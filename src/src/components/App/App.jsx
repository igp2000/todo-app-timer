import React, { Component } from 'react';

import NewTaskList from '../NewTaskList';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  taskID = 1;
  countCompleted = 0;

  state = {
    taskData: [],
    filterCompleted: null,
    countCompleted: 0,
  };

  componentDidMount() {
    const arr = [
      this.taskCreate({ description: 'Completed task' }),
      this.taskCreate({ description: 'Editing task' }),
      this.taskCreate({ description: 'Active task' }),
    ];
    this.setState({
      taskData: arr,
      countCompleted: this.countCompleted,
    });
  }

  // создает задачу
  taskCreate({ description, minutes = 0, seconds = 0 }) {
    const time = Number(minutes) * 60 + Number(seconds);
    let className = null;
    let completed = false;
    if (time === 0) {
      className = 'completed';
      completed = true;
      this.countCompleted++;
    }
    return {
      className: className,
      completed: completed,
      description: description,
      time: time,
      created: Date.now(),
      id: this.taskID++,
    };
  }

  // добавляет задачу в state
  taskAdd = (task) => {
    this.setState(({ taskData }) => {
      return {
        taskData: [...taskData, this.taskCreate(task)],
        countCompleted: this.countCompleted,
      };
    });
  };

  // удаляет задачу по id
  onDelete = (id) => {
    this.setState(({ taskData }) => {
      const ind = taskData.findIndex((item) => item.id === id);

      if (ind > -1) {
        let obj = {
          taskData: [...taskData.slice(0, ind), ...taskData.slice(ind + 1)],
        };
        if (taskData[ind].completed) {
          this.countCompleted--;
          obj.countCompleted = this.countCompleted;
        }
        return obj;
      }
    });
  };

  // изменяет данные задачи и счетчик выполненных
  taskChange = (arr, id, flag, newDesc = '') => {
    const index = arr.findIndex((el) => el.id === id);

    if (index > -1) {
      let data = {};
      if (flag === 'completed') {
        data['completed'] = !arr[index].completed;
        data['className'] = arr[index].completed ? null : 'completed';
        this.countCompleted = data['completed'] ? this.countCompleted + 1 : this.countCompleted - 1;
      } else if (flag === 'editing') {
        data['className'] = arr[index].className !== 'editing' ? 'editing' : arr[index].completed ? null : 'completed';
      } else {
        data['className'] = arr[index].completed ? 'completed' : null;
        data['description'] = newDesc ? newDesc : arr[index].description;
      }
      const newItem = {
        ...arr[index],
        ...data,
      };

      return {
        taskData: [...arr.slice(0, index), newItem, ...arr.slice(index + 1)],
        countCompleted: this.countCompleted,
      };
    }
  };

  // устанвливает состояние - задача выполнена
  onCompleted = (id) => {
    this.setState(({ taskData }) => {
      return this.taskChange(taskData, id, 'completed');
    });
  };

  // устанавливает состояние - описание задачи редактируется
  onEditing = (id) => {
    this.setState(({ taskData }) => {
      return this.taskChange(taskData, id, 'editing');
    });
  };

  // сохраняет в state новое описание после редактирования
  taskNewValue = (id, newDesc = '') => {
    this.setState(({ taskData }) => {
      return this.taskChange(taskData, id, '', newDesc);
    });
  };

  // устанавливает фильтр
  setFilter = (flag) => {
    this.setState({ filterCompleted: flag });
  };

  // удаляет все задачи в статусе - выполнена
  onClearCompleted = () => {
    this.countCompleted = 0;
    const tasksActive = this.state.taskData.filter((task) => !task.completed);
    this.setState(() => {
      return {
        taskData: tasksActive,
        countCompleted: 0,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskList taskAdd={this.taskAdd} />
        </header>

        <section className="main">
          <TaskList
            taskData={this.state.taskData}
            filterCompleted={this.state.filterCompleted}
            onDelete={this.onDelete}
            onCompleted={this.onCompleted}
            onEditing={this.onEditing}
            onTaskNewValue={this.taskNewValue}
          />
          <Footer
            setFilter={this.setFilter}
            countCompleted={this.state.countCompleted}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
