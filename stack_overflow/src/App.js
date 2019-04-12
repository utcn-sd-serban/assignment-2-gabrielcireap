import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import SmartQuestionsTable from './view/question/SmartQuestionsTable';
import SmartQuestionSearchByTitle from "./view/question/SmartQuestionSearchByTitle";
import SmartQuestionSearchByTag from "./view/question/SmartQuestionSearchByTag";
import SmartMain from "./view/SmartMain";

const App = () => (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact={true} component={SmartMain} path="/" />
                <Route exact={true} component={SmartQuestionsTable} path="/ask" />
                <Route exact={true} component={SmartQuestionSearchByTitle} path="/search-title" />
                <Route exact={true} component={SmartQuestionSearchByTag} path="/search-tag" />
            </Switch>
        </HashRouter>
    </div>
);

export default App;
