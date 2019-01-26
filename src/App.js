import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import PropTypes from 'prop-types';


class App extends Component {
    
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={this.context.store} />
                    <Timeline login={this.props.login} store={this.context.store} />
                </div>
            </div>
        );
    }
}

App.contextType = {
    store: PropTypes.object.isRequired
}

export default App;