import React from 'react';
import '../TodoItem.css'

const buttonNameList = ["Обычная","Важная","Очень важная"];

const RED = "rgba(255, 0, 0, 0.16)";
const GREEN = "rgba(124, 252, 0, 0.34)";
const YELLOW = "rgba(253, 255, 30, 0.38)";
const WHITE = 'white';

class TodoItem extends React.Component {

    state = {
        disabled: true,
    };

    enabledInputs = () => {
        this.setState({disabled: !this.state.disabled})
    };


    setDisabledButton = (importance) =>{
        let buttonList = [];
        let isDisabled;
        for(let i=1;i<buttonNameList.length+1;i++){
            isDisabled=(i==importance);
            buttonList.push(<button disabled={isDisabled} onClick={this.setImportance(i)}>{buttonNameList[i-1]}</button>)
        }
        return buttonList;

    };

    titleChangeHandle = (event) => {
        const element = this.props.element;
        element.title = event.target.value;
        this.props.changeHandle(this.props.index,element);
    };

    descriptionChangeHandle = (event) => {

        const element = this.props.element;
        element.description = event.target.value;
        this.props.changeHandle(this.props.index,element);
    };

    setImportance = (importance) => (event) =>{
        const element = this.props.element;
        element.importance = importance;
        this.props.changeHandle(this.props.index,element);
    }

    setMyDate = (date,time) => {
        const now = new Date();
        const d = date.split ('.');
        const myYear = d [2]||now.getFullYear();
        const myMonth = parseInt (d [1]) - 1||now.getMonth();
        const myDate =  parseInt (d [0])||now.getDate();
        const t = time.split (':');
        const myMinutes = parseInt (t [1])||0;
        const myHours =  parseInt (t [0])||0;
        return new Date (myYear, myMonth, myDate, myHours, myMinutes);
    };



    deadlineChangeHandle =  (event) => {
        const element = this.props.element;
        element.deadline = event.target.value;
        const deadline =this.setMyDate(element.deadline,element.deadlineTime);
        const now = new Date();
        if(element.statusId!= 1 && element.statusId != 3){
            if((deadline-now)<=0)
                element.statusId = 2;
            else
                element.statusId = 0;
        }
        this.props.changeHandle(this.props.index,element);
    };

    deadlineTimeChangeHandle = (event) => {
        const element = this.props.element;
        element.deadlineTime = event.target.value;
        const deadline =this.setMyDate(element.deadline,element.deadlineTime);
        const now = new Date();
        if(element.statusId!= 1 && element.statusId != 3){
            if((deadline-now)<=0)
                element.statusId = 2;
            else
                element.statusId = 0;
        }
        this.props.changeHandle(this.props.index,element);

    };


    finishDateChangeHandle = (event) => {
        const element = this.props.element;
        element.finishDate = event.target.value;

        const deadLine = this.setMyDate(element.deadline,element.deadlineTime);
        const finishDate = this.setMyDate(element.finishDate,element.finishDateTime);
        if((deadLine-finishDate)<0)
            element.statusId = 3;
        else
            element.statusId = 1;

        this.props.changeHandle(this.props.index,element);
    };

    finishDateTimeChangeHandle = (event) => {
        const element = this.props.element;
        element.finishDateTime = event.target.value;
        const deadLine = this.setMyDate(element.deadline,element.deadlineTime);
        const finishDate = this.setMyDate(element.finishDate,element.finishDateTime);
        if((deadLine-finishDate)<0)
            element.statusId = 3;
        else
            element.statusId = 1;
        this.props.changeHandle(this.props.index,element);
    };

    setBackground = () => {
        switch (this.props.element.statusId) {
            case 0: return WHITE;
                break;
            case 1: return GREEN;
                break;
            case 2: return RED;
                break;
            case 3: return YELLOW;
                break;
        }

    };

    accomplishedTodo = (event) => {
        const element = this.props.element;

        const date = new Date();
        const myDay = date.getDate();
        const myMonth = date.getMonth()+1;
        const myYear = date.getFullYear();
        const myHour = (date.getHours() < 10 ? '0' : '')+date.getHours();
        const myMinutes = (date.getMinutes() < 10 ? '0' : '')+date.getMinutes();
        const deadline = this.setMyDate(element.deadline,element.deadlineTime);

        if((deadline-date)<0)
            element.statusId = 3;
        else
            element.statusId = 1;

        element.finishDate = myDay+"."+myMonth+"."+myYear;
        element.finishDateTime =myHour+":"+myMinutes;
        this.props.changeHandle(this.props.index,element);
    };


    render() {
        const {disabled} = this.state;
        const title = this.props.element.title;
        const description = this.props.element.description;
        const importance = this.props.element.importance;
        const deadline = this.props.element.deadline;
        const deadlineTime = this.props.element.deadlineTime;
        const finishDate = this.props.element.finishDate;
        const finishDateTime = this.props.element.finishDateTime;
        const {enableFilter} = this.props;
        let buttonList = this.setDisabledButton(importance);
        return (
            <div className="Todo" style={{background: this.setBackground(), display: (enableFilter!=importance && enableFilter!= 0)? "none" : "inherit"}}>
                <div className="TodoContent">
                    <h2>{this.props.title}</h2>
                    <input className="Title" onChange={this.titleChangeHandle} value={title} disabled={disabled}/>
                    <textarea className="InputDescription" onChange={this.descriptionChangeHandle} value={description} disabled={disabled}/>
                    <div style={{display: 'flex', flexDirection: 'row', align_items: 'center'}}>
                        <div className="Text">Важность задачи:</div>
                        {buttonList}
                    </div>
                    <div className="Time">
                        <div className="Text">Срок выполнения:</div>
                        <input className="InputDate" onChange={this.deadlineChangeHandle} value={deadline} disabled={disabled}/>
                        <input className="InputTime" onChange={this.deadlineTimeChangeHandle} value={deadlineTime} disabled={disabled}/>
                    </div>
                    <div className="Time">
                        <div className="Text">Задача выполнена:</div>
                        <input className="InputDate" onChange={this.finishDateChangeHandle} value={finishDate} disabled={disabled}/>
                        <input className="InputTime" onChange={this.finishDateTimeChangeHandle} value={finishDateTime} disabled={disabled}/>
                    </div>
                    <div className="ButtonBar">
                        <button onClick={this.accomplishedTodo}>Выполнено</button>
                        <button onClick={this.enabledInputs}>Редактировать</button>
                        <button className="ButtonDelet" onClick={this.props.deleteTodo(this.props.index)}>Удалить</button>
                    </div>
                </div>
            </div>

        )

    }
}


export default TodoItem;