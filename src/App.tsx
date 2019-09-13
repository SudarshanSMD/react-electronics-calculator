import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Electronics from './electronics/electronics';
import Maths from './maths/Maths';
import Home from './Home';

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
                <Header />

                <Route exact path="/" component={Home} />
                <Route path="/electronics/" component={Electronics} />
                <Route path="/maths/" component={Maths} />
            </div>
        </Router>
    );
}

export default AppRouter;