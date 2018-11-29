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
        const {enableFilter} = this.props;
        let buttonList = this.setDisabledButton(enableFilter);
        return (
            <div>
                <div className="Bar">
                    {buttonList.map((element) =>
                        element
                       )}
                </div>
                <hr/>
            </div>
        )
    }
}

export default FiltersMenu