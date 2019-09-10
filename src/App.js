import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Electronics from './electronics/electronics';

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
                <Header />

                <Route exact path="/" component={Index} />
                <Route path="/electronics/" component={Electronics} />
                <Route path="/maths/" component={Maths} />
            </div>
        </Router>
    );
}


export default AppRouter;