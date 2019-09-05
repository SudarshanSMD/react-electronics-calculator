import React from 'react';
import ReactDOM from 'react-dom';

class ElectronicCalculator extends React.Component {
    render() {
        return(
            <div>
                Electonic Calculator
            </div>
        );
    }
}


ReactDOM.render(
    <ElectronicCalculator/>,
    document.getElementById('root')
);