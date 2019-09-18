import * as React from 'react';
import { isTemplateElement } from '@babel/types';

enum ColorCode { '#000000', '#914A00', '#F40000', '#F8A400', '#FEFE00', '#9ECD1C', '#6C96F0', '#8F06D6', '#A0A0A0', '#FFFFFF' }

enum ColorCodeTolerance { '#F8F9FA' = 20, '#C0C0C0' = 10, '#CCB52D' = 5 }

interface State {
    first: number,
    second: number,
    third: number,
    multiplier: number,
    tolerance: number,
    resistance: number,
    isFourBand: boolean
};

export default class ResistanceColorCodeCalculator extends React.Component<State> {
    state: State = {
        first: 0,
        second: 0,
        third: 0,
        multiplier: 0,
        tolerance: 20,
        resistance: 0,
        isFourBand: true
    };


    handleChange(event: React.FormEvent<HTMLSelectElement>): void {
        debugger;

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        }, () => {
            let numberString: string = "";
            if (this.state.isFourBand) {
                numberString = this.state.first.toString() + this.state.second.toString();
            } else {
                numberString = this.state.first.toString() + this.state.second.toString() + this.state.third.toString();
            }

            this.setState({
                resistance: parseInt(numberString) * Math.pow(10, this.state.multiplier),
            });

        });

        // this.calculateResistance();
    }

    calculateResistance(): void {
        let numberString: string = "";
        if (this.state.isFourBand) {
            numberString = this.state.first.toString() + this.state.second.toString();
        } else {
            numberString = this.state.first.toString() + this.state.second.toString() + this.state.third.toString();
        }

        this.setState({
            resistance: parseInt(numberString) * Math.pow(10, this.state.multiplier),
        });
    }

    render() {
        return (
            <div> This is Resistance colour code calculator.

                <div>
                    <div>
                        Number of bands: {this.state.isFourBand ? (<span>4</span>) : (<span>5</span>)}
                    </div>

                    <form>
                        First: {this.state.first}
                        <select name="first"
                            value={this.state.first}
                            onChange={(event) => this.handleChange(event)}
                            style={{ backgroundColor: ColorCode[this.state.first] }}>
                            {Object.entries(ColorCode).slice(Object.entries(ColorCode).length / 2).map(entry => (
                                <option key={entry[1]} style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
                            ))}
                        </select>

                        Second: {this.state.second}
                        <select name="second"
                            value={this.state.second}
                            onChange={(event) => this.handleChange(event)}
                            style={{ backgroundColor: ColorCode[this.state.second] }}>
                            {Object.entries(ColorCode).slice(Object.entries(ColorCode).length / 2).map(entry => (
                                <option style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
                            ))}
                        </select>

                        {this.state.isFourBand ? (
                            <span>
                            </span>
                        ) : (
                                <span> Third: {this.state.third}
                                    <select name="third"
                                        value={this.state.third}
                                        onChange={(event) => this.handleChange(event)}
                                        style={{ backgroundColor: ColorCode[this.state.third] }}
                                    >
                                        {Object.entries(ColorCode).slice(Object.entries(ColorCode).length / 2).map(entry => (
                                            <option style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
                                        ))}
                                    </select>
                                </span>
                            )}

                        Multiplier: {this.state.multiplier}
                        <select name="multiplier"
                            value={this.state.multiplier}
                            onChange={(event) => this.handleChange(event)}
                            style={{ backgroundColor: ColorCode[this.state.multiplier] }}>
                            {Object.entries(ColorCode).slice(Object.entries(ColorCode).length / 2).map(entry => (
                                <option style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
                            ))}
                        </select>

                        Tolerance: {this.state.tolerance}
                        <select name="tolerance"
                            value={this.state.tolerance}
                            onChange={(event) => this.handleChange(event)}
                            style={{ backgroundColor: ColorCode[this.state.tolerance] }}
                        >
                            {Object.entries(ColorCodeTolerance).slice(Object.entries(ColorCodeTolerance).length / 2).map(entry => (
                                <option style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
                            ))}
                        </select>
                    </form>
                </div>
                <div>
                    Resistance: {this.state.resistance}Ω +-{this.state.tolerance}%
                </div>

            </div>
        );
    }
}