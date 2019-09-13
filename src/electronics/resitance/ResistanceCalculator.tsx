import React, { Component } from 'react';
import { number } from 'prop-types';

interface State {
    resitances: number[],
    seriesResistance: number,
    parallelResistance: number
};

export default class ResistanceCalculator extends React.Component<State>{
    state: State = {
        resitances: [0, 0],
        seriesResistance: 0,
        parallelResistance: 0
    };

    updateState(newResistance: number[]) {
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


    addResistance = () => {
        let newResistance = this.state.resitances.slice();
        newResistance = newResistance.concat([0]);
        this.updateState(newResistance);
    }

    removeResistance = () => {
        if (this.state.resitances.length > 1) {
            let newResistance = this.state.resitances.slice();
            newResistance = newResistance.slice(0, -1);
            this.updateState(newResistance);
        } else {
            console.info("Cannot remove any more resistances.");
        }
    }


    handleChange(event: React.FormEvent<HTMLInputElement>, index: number) {
        let newResistance = this.state.resitances.slice();
        newResistance[index] = parseInt(event.currentTarget.value);
        this.updateState(newResistance);
    }



    render() {
        return (
            <div>Resistance in Series: {this.state.seriesResistance}
                Resistance in Parallel: {this.state.parallelResistance}
                <form>
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
};