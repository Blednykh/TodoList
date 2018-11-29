import React from 'react';
import './App.css';
import FiltersMenu from './components/FiltersMenu';
import TodoItem from './components/TodoItem';
import img from "./agutin_min.jpg";


const RED = "rgba(255, 0, 0, 0.16)";
const GREEN = "rgba(124, 252, 0, 0.34)";
const YELLOW = "rgba(253, 255, 30, 0.38)";

class App extends React.Component {

    state = {
        todoList: [],
        VisibleList: [],
        backgroundTodoList: [],
        enableFilter: 0,
    };

    componentDidUpdate(){
        const todoList = this.state.todoList;
        const visibleList =this.state.VisibleList;
        const backgroundTodoList = this.state.backgroundTodoList;
        localStorage.setItem("todo", JSON.stringify(todoList));
        localStorage.setItem("visible", JSON.stringify(visibleList));
        localStorage.setItem("backgroundTodo", JSON.stringify(backgroundTodoList));
    }
    componentDidMount(){
        const todoList = JSON.parse(localStorage.getItem("todo"))||[];
        const visibleList = JSON.parse(localStorage.getItem("visible"))||[];
        const backgroundTodoList = JSON.parse(localStorage.getItem("backgroundTodo"))||[];
        this.setState({todoList: todoList, VisibleList: visibleList, backgroundTodoList: backgroundTodoList});
    }

    deleteTodo = (index) => (event) => {
        const list = this.state.todoList;
        const visibleList =this.state.VisibleList;
        const backgroundTodoList = this.state.backgroundTodoList;
        list.splice(index, 1);
        visibleList.splice(index, 1);
        backgroundTodoList.splice(index, 1);
        this.setState({todoList: list, VisibleList: visibleList, backgroundTodoList: backgroundTodoList})
    };


    handleClick = (event) => {
        const list = this.state.todoList;
        list.push({title: 'Новая задача', description: 'Введите текст задачи...',
            importance: 1, deadline: "ДД.ММ.ГГГГ", finishDate: "ДД.ММ.ГГГГ",
            deadlineTime: "ЧЧ:ММ", finishDateTime: "ЧЧ:ММ"});

        const visibleList = this.state.VisibleList;
        visibleList.push('inherit');

        const backgroundTodoList = this.state.backgroundTodoList;
        backgroundTodoList.push('white');
        this.setState({todoList: list, VisibleList: visibleList, backgroundTodoList: backgroundTodoList});
    };

    accomplishedTodo = (index) => (event) => {
        const list = this.state.todoList;
        let backgroundTodoList = this.state.backgroundTodoList;

        const date = new Date();
        const myDay = date.getDate();
        const myMonth = date.getMonth()+1;
        const myYear = date.getFullYear();
        const myHour = (date.getHours() < 10 ? '0' : '')+date.getHours();
        const myMinutes = (date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
        const deadline = this.setMyDeadline(list,index);


        if((deadline-date)<0)
            backgroundTodoList[index] = YELLOW;
        else
            backgroundTodoList[index] = GREEN;

        list[index].finishDate = myDay+"."+myMonth+"."+myYear;
        list[index].finishDateTime =myHour+":"+myMinutes;
        this.setState({todoList: list, backgroundTodoList: backgroundTodoList})
    }

    titleChangeHandle = (index) => (event) => {
        const list = this.state.todoList;
        list[index].title = event.target.value;
        this.setState({todoList: list})
    };

    setMyDeadline = (list,index) => {
        const now = new Date();

        const d = list[index].deadline.split ('.');
        const myYear = d [2]||now.getFullYear();
        const myMonth = parseInt (d [1]) - 1||now.getMonth();
        const myDate =  parseInt (d [0])||now.getDate();
        const t = list[index].deadlineTime.split (':');
        const myMinutes = parseInt (t [1])||0;
        const myHours =  parseInt (t [0])||0;

        const deadline = new Date (myYear, myMonth, myDate, myHours, myMinutes)
        return deadline;
    };



    deadlineChangeHandle = (index) => (event) => {
        const list = this.state.todoList;
        let backgroundTodoList = this.state.backgroundTodoList;
        list[index].deadline = event.target.value;

        const deadline = this.setMyDeadline(list,index);
        const now = new Date();
        if(backgroundTodoList[index] !== GREEN && backgroundTodoList[index] !== YELLOW){
            if((deadline-now)<=0)
                backgroundTodoList[index] = RED;
            else
                backgroundTodoList[index] = 'white';
        }

        this.setState({todoList: list, backgroundTodoList: backgroundTodoList})
    };

    deadlineTimeChangeHandle = (index) => (event) => {
        const list = this.state.todoList;
        let backgroundTodoList = this.state.backgroundTodoList;
        list[index].deadlineTime = event.target.value;
        const deadline =this.setMyDeadline(list,index);
        const now = new Date();
        if(backgroundTodoList[index] !== GREEN && backgroundTodoList[index] !== YELLOW){
            if((deadline-now)<=0)
                backgroundTodoList[index] = RED;
            else
                backgroundTodoList[index] = 'white';
        }
        this.setState({todoList: list, backgroundTodoList: backgroundTodoList})
    };

    setMyFinishDate = (list,index) => {
        const now = new Date();

        const d = list[index].finishDate.split ('.');
        const myYear = d [2]||now.getFullYear();
        const myMonth = parseInt (d [1]) - 1||now.getMonth();
        const myDate =  parseInt (d [0])||now.getDate();
        const t = list[index].finishDateTime.split (':');
        const myMinutes = parseInt (t [1])||0;
        const myHours =  parseInt (t [0])||0;

        const finishDate= new Date (myYear, myMonth, myDate, myHours, myMinutes)
        return finishDate;
    };

    finishDateChangeHandle = (index) => (event) => {
        const list = this.state.todoList;
        const backgroundTodoList = this.state.backgroundTodoList;
        list[index].finishDate = event.target.value;

        const deadline = this.setMyDeadline(list,index);
        const finishdate = this.setMyFinishDate(list,index);

        if((deadline-finishdate)<0)
            backgroundTodoList[index] = YELLOW;
        else
            backgroundTodoList[index] = GREEN;

        this.setState({todoList: list})
    };

    finishDateTimeChangeHandle = (index) => (event) => {
        const list = this.state.todoList;
        const backgroundTodoList = this.state.backgroundTodoList;
        list[index].finishDateTime = event.target.value;
        const deadline = this.setMyDeadline(list,index);
        const finishdate = this.setMyFinishDate(list,index);

        if((deadline-finishdate)<0)
            backgroundTodoList[index] = YELLOW;
        else
            backgroundTodoList[index] = GREEN;

        this.setState({todoList: list})
    };


    filterChangeHandle = (number) => (event) =>{
        const list = this.state.todoList;
        let visibleList = this.state.VisibleList;
        let enableFilter = this.state.enableFilter;
        visibleList = list.map(function (elem) {
            if(number == 0)
                return "inherit";
            if(elem.importance==number)
            {
                return "inherit";
            }
            else
                return "none";
        })

        enableFilter = number;
        this.setState({VisibleList: visibleList, enableFilter})
    }


    changeDescriptionHandle = (event) => {

        const list = this.state.todoList;
        list[event.index].description = event.value;
        this.setState({todoList: list})
    };

    setImportance = (index,importance) => (event) =>{
    const list = this.state.todoList;
        list[index].importance = importance;
        const visibleList = this.state.VisibleList;
        if(importance!=this.state.enableFilter && this.state.enableFilter!=0)
            visibleList[index]='none';
        this.setState({todoList: list, VisibleList:  visibleList});
    }


    render() {
        const {todoList, VisibleList, backgroundTodoList, enableFilter} = this.state;
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
                        titleChangeHandle={this.titleChangeHandle}
                        deadlineChangeHandle={this.deadlineChangeHandle}
                        finishDateChangeHandle={this.finishDateChangeHandle}
                        deadlineTimeChangeHandle={this.deadlineTimeChangeHandle}
                        finishDateTimeChangeHandle={this.finishDateTimeChangeHandle}
                        changeDescriptionHandle={this.changeDescriptionHandle}
                        setImportance={this.setImportance}
                        deleteTodo={this.deleteTodo}
                        accomplishedTodo = {this.accomplishedTodo}
                        title={element.title}
                        description={element.description}
                        importance={element.importance}
                        element = {element}
                        key={index}
                        VisibleList = {VisibleList}
                        backgroundTodoList = {backgroundTodoList}
                    />)}
                <div style={{height: '40px'}}></div>
            </div>
        );
    }
}

export default App;
