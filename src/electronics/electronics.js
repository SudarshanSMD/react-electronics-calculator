import React from 'react';
import { Route, Link } from 'react-router-dom';
import ResistanceColorCodeCalculator from './resitance/ResistanceColorCodeCalculator';
import ResistanceCalculator from './resitance/ResistanceCalculator';

function Electronics({ match }) {
    return (
        <div>
            <h3>Electronic Calculator</h3>
            <ul>
                <li>
                    <Link to={`${match.url}/resistancecalculator`}>Resistance Calculator</Link>
                </li>
                <li>
                    <Link to={`${match.url}/resistancecolorcodecalculator`}>Resitance Color Code Calculator</Link>
                </li>
            </ul>
            <Route path={`${match.url}/resistancecalculator`} component={ResistanceCalculator} />
            <Route path={`${match.url}/resistancecolorcodecalculator`} component={ResistanceColorCodeCalculator} />
        </div>
    );
}

export default Electronics;