import React from 'react';
import '../TodoItem.css'

class TodoItem extends React.Component {

    state = {
        disabled: true,
    };

    enabledInputs = () => {
        this.setState({disabled: !this.state.disabled})
    };
    

    DescriptionHandle = (event) => {
        const value = event.target.value;

        this.props.changeDescriptionHandle({value, index: this.props.index})
    };

    render() {
        const {disabled} = this.state;

        return (
            <div className="Todo" style={{background: this.props.backgroundTodoList[this.props.index], display: this.props.VisibleList[this.props.index]}}>
                <div className="TodoContent">
                    <h2>{this.props.title}</h2>
                    <input className="Title" onChange={this.props.titleChangeHandle(this.props.index)} value={this.props.title} disabled={disabled}/>
                    <textarea className="InputDescription" onChange={this.DescriptionHandle} value={this.props.description} disabled={disabled}/>
                    <div style={{display: 'flex', flexDirection: 'row', align_items: 'center'}}>
                        <div className="Text">Важность задачи:</div>
                        {/*<div className="ButtonBar">*/}
                            <button disabled={this.props.element.disabledImportanceButton1} onClick={this.props.setImportance(this.props.index,1)}>Обычная</button>
                            <button disabled={this.props.element.disabledImportanceButton2} onClick={this.props.setImportance(this.props.index,2)}>Важная</button>
                            <button disabled={this.props.element.disabledImportanceButton3} onClick={this.props.setImportance(this.props.index,3)}>Очень важная</button>
                        {/*</div>*/}
                    </div>
                    <div className="Time">
                        <div className="Text">Срок выполнения:</div>
                        <input className="InputDate" onChange={this.props.deadlineChangeHandle(this.props.index)} value={this.props.element.deadline} disabled={disabled}/>
                        {/*<div className="TextTime">Время:</div>*/}
                        <input className="InputTime" onChange={this.props.deadlineTimeChangeHandle(this.props.index)} value={this.props.element.deadlineTime} disabled={disabled}/>
                    </div>
                    <div className="Time">
                        <div className="Text">Задача выполнена:</div>
                        <input className="InputDate" onChange={this.props.finishDateChangeHandle(this.props.index)} value={this.props.element.finishDate} disabled={disabled}/>
                        {/*<div className="TextTime">Время:</div>*/}
                        <input className="InputTime" onChange={this.props.finishDateTimeChangeHandle(this.props.index)} value={this.props.element.finishDateTime} disabled={disabled}/>
                    </div>
                    <div className="ButtonBar">
                        <button onClick={this.props.accomplishedTodo(this.props.index)}>Выполнено</button>
                        <button onClick={this.enabledInputs}>Редактировать</button>
                        <button className="ButtonDelet" onClick={this.props.deleteTodo(this.props.index)}>Удалить</button>
                    </div>
                </div>
            </div>




        )

    }
}


export default TodoItem;