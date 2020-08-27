import React, {Component} from 'react';
import './popup.css';

class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                from: '',
                to: '',
                pricePerDay: ''
            },
            errors: {},
            disabled: false
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (fields["from"] > fields["to"]) {
            formIsValid = false;
            errors["from"] = "Can't be grater the 'To' day";
        }

        if (fields["to"] < fields["from"]) {
            formIsValid = false;
            errors["to"] = "Can't be less the 'From' day";
        }

        if (!fields["pricePerDay"]) {
            formIsValid = false;
            errors["pricePerDay"] = "This field is required";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleInputChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
        // this.setState({[e.target.name]: e.target.value});
        // console.log(this.state)
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.handleValidation()) {
            console.log(this.state.fields.from)
            const data = {
                from: this.state.fields.from === '' ? '' : new Date(this.state.fields.from),
                to: this.state.fields.to === '' ? '' : new Date(this.state.fields.to),
                price_per_day: Number(this.state.fields.pricePerDay),
                added: new Date()
            };
            fetch('http://localhost:4000/api/BikeRentController/add-period', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(res.json()))
                .catch(err => console.log(err));
        } else {
            console.log('validation failed')
        }
    };

    render() {
        return (
            <div className="popup d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <form className="text-center border border-light p-5 grey lighten-5"
                                  onSubmit={this.handleSubmit.bind(this)}>
                                <p className="h4 mb-4">Add new period</p>
                                <div className="form-row mb-4">
                                    <div className="col">
                                        <input type="date" refs="from" value={this.state.fields["from"]}
                                               onChange={this.handleInputChange.bind(this, "from")}
                                               className="form-control"/>
                                        <span style={{color: "red"}}>{this.state.errors["from"]}</span>
                                    </div>
                                    <div className="col">
                                        <input type="date" refs="to" value={this.state.fields["to"]}
                                               onChange={this.handleInputChange.bind(this, "to")}
                                               className="form-control"/>
                                        <span style={{color: "red"}}>{this.state.errors["to"]}</span>
                                    </div>
                                </div>
                                <input type="text" refs="pricePerDay" value={this.state.fields["pricePerDay"]}
                                       onChange={this.handleInputChange.bind(this, "pricePerDay")}
                                       className="form-control"/>
                                <span style={{color: "red"}}>{this.state.errors["pricePerDay"]}</span>
                                <button type="submit" disabled={this.state.disabled}
                                        className="btn btn-info my-4 btn-block">{this.state.disabled ? 'Sending...' : 'Submit'}</button>
                            </form>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddForm
