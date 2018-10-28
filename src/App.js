import React from 'react';
import './App.css';
import Button from './components/Button';
import TodoItem from './components/TodoItem';

const RED = "rgba(255, 0, 0, 0.16)";
const GREEN = "rgba(124, 252, 0, 0.34)";
const YELLOW = "rgba(253, 255, 30, 0.38)";

class App extends React.Component {

    state = {
        todoList: [],
        VisibleList: [],
        disabledFilterButton: [true,false,false,false],
        backgroundTodoList: [],
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
        console.log('del event', event);
        console.log('del index', index);
        const list = this.state.todoList;
        const visibleList =this.state.VisibleList;
        const backgroundTodoList = this.state.backgroundTodoList;
        list.splice(index, 1);
        visibleList.splice(index, 1);
        backgroundTodoList.splice(index, 1);
        this.setState({todoList: list, VisibleList: visibleList, backgroundTodoList: backgroundTodoList})
    };


    handleClick = (event) => {
        console.log('todolist', this.state.todoList);
        const list = this.state.todoList;
        list.push({title: 'Новая задача', description: 'Введите текст задачи...', importance: 1, deadline: "ДД.ММ.ГГГГ", finishDate: "ДД.ММ.ГГГГ", deadlineTime: "ЧЧ:ММ", finishDateTime: "ЧЧ:ММ", disabledImportanceButton1: true, disabledImportanceButton2: false, disabledImportanceButton3: false,});

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
        console.log('eevent2', event);
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


    //Изменения фильтра
    filterChangeHandle = (number) => (event) =>{
        const list = this.state.todoList;
        let disabledFilterButton = this.state.disabledFilterButton;
        let visibleList = this.state.VisibleList;

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

        disabledFilterButton = [false,false,false,false];
        disabledFilterButton[number] = true;
        this.setState({VisibleList: visibleList, disabledFilterButton: disabledFilterButton})
        // alert("filterChangeHandle "+"list: "+list.length+" visibleList: "+ visibleList.length)
    }


    //Изменение описания задачи
    changeDescriptionHandle = (event) => {

        const list = this.state.todoList;
        list[event.index].description = event.value;
        this.setState({todoList: list})
    };

    //Изменение важности задачи
    setImportance = (index,importance) => (event) =>{
    const list = this.state.todoList;
        switch (importance) {
            case 1:
                list[index].disabledImportanceButton1 = true;
                list[index].disabledImportanceButton2 = false;
                list[index].disabledImportanceButton3 = false;
                list[index].importance = importance;
                break;
            case 2:
                list[index].disabledImportanceButton1 = false;
                list[index].disabledImportanceButton2 = true;
                list[index].disabledImportanceButton3 = false;
                list[index].importance = importance;
                break;
            case 3:
                list[index].disabledImportanceButton1 = false;
                list[index].disabledImportanceButton2 = false;
                list[index].disabledImportanceButton3 = true;
                list[index].importance = importance;
        }
        const visibleList = this.state.VisibleList;
        if(this.state.disabledFilterButton[0]==false)
            visibleList[index]='none';
        this.setState({todoList: list, VisibleList:  visibleList});
        // alert("setImportance2 "+"list: "+list.length+" visibleList: "+ visibleList.length)
    }


    render() {
        const {todoList, VisibleList, disabledFilterButton, backgroundTodoList} = this.state;
        console.log('todo', todoList);
        return (
            <div className="App">
                <Button
                    className="AddButton"
                    filterChangeHandle={this.filterChangeHandle}
                    handleButtonClick={this.handleClick}
                    disabledFilterButton = {disabledFilterButton}
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
