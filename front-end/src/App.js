import React, {Component} from 'react';
import AddForm from "./components/addForm";
import Table from "./components/table";
import './App.css';

class App extends React.Component {

    state = {
        open: false
    };

    onShowMAddForm = () => this.setState(state => ({open: !state.open}));

    render() {
        return (
            <div className="container">
                <div>
                    {this.state.open ? <AddForm/> : console.log(false)}
                </div>
                <div className="row">
                    <button type="button" className="btn btn-primary" onClick={this.onShowMAddForm}><i
                        className="fas fa-plus"></i></button>
                </div>
                <div className="row">
                    <Table/>
                </div>
            </div>
        );
    }
}

export default App;
