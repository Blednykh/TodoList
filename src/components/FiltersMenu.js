import React from 'react';
import '../FiltersMenu.css';


const buttonNameList = ["Все","Обычные","Важные","Очень важные"];



class FiltersMenu extends React.Component {

    setDisabledButton = (enableFilter) =>{
        let buttonList = [];
        let isDisabled;
        for(let i=0;i<buttonNameList.length;i++){
            isDisabled=(i==enableFilter);
            buttonList.push(<button disabled={isDisabled} onClick={this.props.filterChangeHandle(i)}>{buttonNameList[i]}</button>)
        }
        return buttonList;

    };


    render() {
        const {filterChangeHandle,enableFilter} = this.props;
        let buttonList = this.setDisabledButton(enableFilter);
        return (
            <div>
                <div className="Bar">
                    {buttonList.map((element) =>
                        element
                       )}
                    {/*<button disabled={disabledFilterButton[0]} onClick={filterChangeHandle(0)}>Все</button>
                    <button disabled={disabledFilterButton[1]} onClick={filterChangeHandle(1)}>Обычные</button>
                    <button disabled={disabledFilterButton[2]} onClick={filterChangeHandle(2)}>Важные</button>
                    <button disabled={disabledFilterButton[3]} onClick={filterChangeHandle(3)}>Очень важные</button>*/}
                </div>
                <hr/>
            </div>
        )
    }
}

export default FiltersMenu