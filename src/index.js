import React from 'react';
import ReactDOM from 'react-dom';


class SerialResistanceCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resitances: [0, 0],
            totalResistance: 0
        }
    }

    // method to add the resistors count
    addResistance = event => {
        let newResistance = this.state.resitances.slice();
        newResistance = newResistance.concat([0]);
        this.setState({
            resitances: newResistance,
            totalResistance: newResistance.reduce((a, b) => a + b)
        });
    }

    // method to remove the resistors count
    removeResistance = event => {
        if (this.state.resitances.length > 1) {
            let newResistance = this.state.resitances.slice();
            newResistance = newResistance.slice(0, -1);
            this.setState({
                resitances: newResistance,
                totalResistance: newResistance.reduce((a, b) => a + b)
            });
        } else {
            console.info("Cannot remove any more resistances.");
        }
    }

    handleChange(event, index) {
        let newResistance = this.state.resitances.slice();
        newResistance[index] = event.target.value;
        newResistance = newResistance.map(Number);

        this.setState({
            resitances: newResistance,
            totalResistance: newResistance.reduce((a, b) => a + b)
        });
    }

    render() {
        return (
            <div>Resistance in Serial: {this.state.totalResistance}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        {this.state.resitances.map((key, index) => {
                            return (
                                <input key={index} type="text" name="r-{index}" value={key}
                                    onChange={(event) => this.handleChange(event, index)}
                                />
                            );
                        })
                        }
                    </div>
                    <div>
                        <button type="button" onClick={this.addResistance}>Add Resistor</button>
                        <button type="button" onClick={this.removeResistance}>Remove Resistor</button>
                    </div>
                </form>
            </div>
        );
    }
}

class ResistanceCalculator extends React.Component {
    render() {
        return (
            <div>Resitance
                <SerialResistanceCalculator />
            </div>
        );
    }
}

class ElectronicCalculator extends React.Component {
    render() {
        return (
            <div>
                Electronic Calculator
                <ResistanceCalculator />
            </div>
        );
    }
}

ReactDOM.render(
    <ElectronicCalculator />,
    document.getElementById('root')
);