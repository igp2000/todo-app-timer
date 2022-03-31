import React, { Component } from 'react';

import NewTaskList from '../NewTaskList';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  taskID = 1;

  state = {
    taskData: [this.taskCreate('Completed task'), this.taskCreate('Editing task'), this.taskCreate('Active task')],
    filterCompleted: null,
    countCompleted: 0,
  };

  // создает задачу
  taskCreate(desc) {
    return {
      className: null,
      completed: false,
      description: desc,
      created: Date.now(),
      id: this.taskID++,
    };
  }

  // добавляет задачу в state
  taskAdd = (desc) => {
    this.setState(({ taskData }) => {
      return {
        taskData: [...taskData.slice(0), this.taskCreate(desc)],
      };
    });
  };

  // удаляет задачу по id
  onDelete = (id) => {
    this.setState(({ taskData, countCompleted }) => {
      const ind = taskData.findIndex((item) => item.id === id);

      if (ind > -1) {
        let obj = {
          taskData: [...taskData.slice(0, ind), ...taskData.slice(ind + 1)],
        };
        if (taskData[ind].completed) {
          obj.countCompleted = countCompleted - 1;
        }
        return obj;
      }
    });
  };

  // изменяет данные задачи и счетчик выполненных
  taskChange = (arr, id, flag, newDesc = '') => {
    const index = arr.findIndex((el) => el.id === id);

    if (index > -1) {
      let obj = {};
      let data = {};
      if (flag === 'completed') {
        data['completed'] = !arr[index].completed;
        data['className'] = arr[index].completed ? null : 'completed';
        obj.countCompleted = data['completed'] ? this.state.countCompleted + 1 : this.state.countCompleted - 1;
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

      obj.taskData = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];

      return obj;
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
          <NewTaskList className="new-todo" placeholder="What needs to be done?" taskAdd={this.taskAdd} />
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
