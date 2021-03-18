import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        tests: []
    }

    componentDidMount() {
        axios.get('http://localhost:34565/api/tests')
            .then((response) => {
                this.setState({
                    tests: response.data
                })
            })
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <ul>
                        {this.state.tests.map((test: any) => (
                            <li key={test.id}>{test.title}</li>
                        ))}
                    </ul>
                </header>
            </div>
        )
    }
}

export default App;
