import React from 'react';
import '../FiltersMenu.css';
import img from '../agutin_min.jpg';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'justify'
    }
};

class FiltersMenu extends React.Component {
    render() {
        const {handleButtonClick, buttonContent = 'Добавить задачу',disabledFilterButton} = this.props;

        return (
            <div style={styles.container}>
                <img src={img} className="Img"/>
                <button className="AddButton" onClick={handleButtonClick}>{buttonContent}</button>
                <div className="Bar">
                    <button disabled={disabledFilterButton[0]} onClick={this.props.filterChangeHandle(0)}>Все</button>
                    <button disabled={disabledFilterButton[1]} onClick={this.props.filterChangeHandle(1)}>Обычные</button>
                    <button disabled={disabledFilterButton[2]} onClick={this.props.filterChangeHandle(2)}>Важные</button>
                    <button disabled={disabledFilterButton[3]} onClick={this.props.filterChangeHandle(3)}>Очень важные</button>
                </div>
                <hr/>
            </div>
        )
    }
}

export default FiltersMenu