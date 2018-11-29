import React from 'react';
import './App.css';
import FiltersMenu from './components/FiltersMenu';
import TodoItem from './components/TodoItem';
import img from "./agutin_min.jpg";


class App extends React.Component {

    state = {
        todoList: [],
        enableFilter: 0,
    };

    componentDidUpdate(){
        const todoList = this.state.todoList;
        localStorage.setItem("todo", JSON.stringify(todoList));
    }
    componentDidMount(){
        const todoList = JSON.parse(localStorage.getItem("todo"))||[];
        this.setState({todoList: todoList});
    }

    deleteTodo = (index) => (event) => {
        const list = this.state.todoList;
        list.splice(index, 1);
        this.setState({todoList: list})
    };


    handleClick = (event) => {
        const list = this.state.todoList;
        list.push({title: 'Новая задача', description: 'Введите текст задачи...',
            importance: 1, deadline: "ДД.ММ.ГГГГ", finishDate: "ДД.ММ.ГГГГ",
            deadlineTime: "ЧЧ:ММ", finishDateTime: "ЧЧ:ММ", statusId: 0});
        this.setState({todoList: list});
    };

    filterChangeHandle = (number) => (event) =>{
        this.setState({enableFilter: number})
    }

    changeHandle = (index,element) =>{
        const todoList = this.state.todoList;
        todoList[index]=element;
        this.setState({todoList});
    }

    render() {
        const {todoList, enableFilter} = this.state;
        console.log('todo', todoList);
        return (
            <div className="App">
                <div className="Button">
                    <img src={img} className="Img"/>
                    <button className="AddButton" onClick={this.handleClick}>Добавить задачу</button>
                </div>
                <FiltersMenu
                    filterChangeHandle={this.filterChangeHandle}
                    enableFilter = {enableFilter}
                />
                {todoList.map((element, index) =>
                    <TodoItem
                        index={index}
                        deleteTodo={this.deleteTodo}
                        element = {element}
                        changeHandle = {this.changeHandle}
                        enableFilter = {enableFilter}
                    />)}
                <div style={{height: '40px'}}></div>
            </div>
        );
    }
}

export default App;
