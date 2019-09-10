import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class ResistanceCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resitances: [0, 0],
            seriesResistance: 0,
            parallelResistance: 0
        }
    }

    updateState(newResistance) {
        debugger;
        newResistance = newResistance.map(Number);
        /**
         * Calculating resistance in prallel.
         * 1/R = 1/R1 + 1/R2 + 1/R3 ....
         * 
         *  */
        let fractionResistance = newResistance.slice();
        fractionResistance[0] = 1 / fractionResistance[0];
        let x = fractionResistance.reduce((a, b) => a + (1 / b));
        this.setState({
            resitances: newResistance,
            seriesResistance: newResistance.reduce((a, b) => a + b),
            parallelResistance: (1 / x)
        });
    }

    addResistance = event => {
        let newResistance = this.state.resitances.slice();
        newResistance = newResistance.concat([0]);
        this.updateState(newResistance);
    }

    removeResistance = event => {
        if (this.state.resitances.length > 1) {
            let newResistance = this.state.resitances.slice();
            newResistance = newResistance.slice(0, -1);
            this.updateState(newResistance);
        } else {
            console.info("Cannot remove any more resistances.");
        }
    }

    handleChange(event, index) {
        let newResistance = this.state.resitances.slice();
        newResistance[index] = event.target.value;
        this.updateState(newResistance);
    }

    render() {
        return (
            <div>Resistance in Series: {this.state.seriesResistance}
                Resistance in Parallel: {this.state.parallelResistance}
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


class Electronics extends React.Component {
    render() {
        return (
            <div>
                <h3>Electronic Calculator</h3>                                
                <ResistanceCalculator />
            </div>
        );
    }
}

// ReactDOM.render(
//     <Electronics />,
//     document.getElementById('root')
// );

function Index() {
    return <h1>Home</h1>;
}

function Maths() {
    return <h1>Maths</h1>;
}

function Header() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/electronics">Electronics</Link>
            </li>
            <li>
                <Link to="/maths">Maths</Link>
            </li>
        </ul>
    );
}

function AppRouter() {
    return (
        <Router>
            <div>
               <Header/>

                <Route exact path="/" component={Index} />
                <Route path="/electronics/" component={Electronics} />
                <Route path="/maths/" component={Maths} />
            </div>
        </Router>
    );
}


export default AppRouter;