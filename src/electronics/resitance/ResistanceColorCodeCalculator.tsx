import * as React from 'react';
import { isTemplateElement } from '@babel/types';
import { number } from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


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

interface selectProps {
    name: string,
    value: number,
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void
}

function ColorCodeSelect(props: selectProps) {
    return (
        <select name={props.name}
            value={props.value}
            onChange={(event) => props.onChange(event)}
            style={{ backgroundColor: ColorCode[props.value] }}>
            {Object.entries(ColorCode).slice(Object.entries(ColorCode).length / 2).map(entry => (
                <option key={entry[1]} style={{ backgroundColor: entry[0] }} value={entry[1]}></option>
            ))}
        </select>
    );
}

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


    handleChange(event: React.FormEvent<HTMLSelectElement>): void {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        }, () => {
            this.calculateResistance();
        });
    }

    changeBandCount(count: number): void {
        this.setState({
            isFourBand: count === 4 ? true : false,
        }, () => {
            this.calculateResistance();
        });
    }

    render() {
        return (
            <div> This is Resistance colour code calculator.

                <div>
                    <div>
                        Number of bands: {this.state.isFourBand ? (<span>4</span>) : (<span>5</span>)}
                        <ButtonGroup toggle className="mt-3">
                            <ToggleButton type="radio" defaultChecked value="4" onClick={() => this.changeBandCount(4)}>4</ToggleButton>
                            <ToggleButton type="radio" value="5" onClick={() => this.changeBandCount(5)}>5</ToggleButton>
                        </ButtonGroup>
                    </div>

                    <form>

                        First: {this.state.first}
                        <ColorCodeSelect name="first" onChange={(event) => this.handleChange(event)} value={this.state.first} />

                        Second: {this.state.second}
                        <ColorCodeSelect name="second" onChange={(event) => this.handleChange(event)} value={this.state.second} />

                        {this.state.isFourBand ? (
                            <span>
                            </span>
                        ) : (
                                <span> Third: {this.state.third}
                                    <ColorCodeSelect name="third" onChange={(event) => this.handleChange(event)} value={this.state.third} />
                                </span>
                            )}

                        Multiplier: {this.state.multiplier}
                        <ColorCodeSelect name="multiplier" onChange={(event) => this.handleChange(event)} value={this.state.multiplier} />

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