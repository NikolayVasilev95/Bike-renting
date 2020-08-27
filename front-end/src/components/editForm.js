import React, {Component} from 'react';
import './popup.css';

class EditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fields: {
                from: '',
                to: '',
                pricePerDay: '',
                added: ''
            },
            errors: {},
            disabled: false
        };
    }

    componentDidMount() {
        fetch(`http://localhost:4000/api/BikeRentController/period/${this.props.editId}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({id: data._id});
                this.setState(Object.assign(this.state.fields, {from: data.from === null ? '' : this.formatDate(data.from)}));
                this.setState(Object.assign(this.state.fields, {to: data.to === null ? '' : this.formatDate(data.to)}));
                this.setState(Object.assign(this.state.fields, {pricePerDay: data.price_per_day}));
                this.setState(Object.assign(this.state.fields, {added: this.formatDate(data.added)}));
            })
            .catch(console.log);
    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
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
            const data = {
                _id: this.state.fields.id,
                from: new Date(this.state.fields.from),
                to: new Date(this.state.fields.to),
                price_per_day: Number(this.state.fields.pricePerDay),
                added: new Date(this.state.fields.added)
            };
            fetch(`http://localhost:4000/api/BikeRentController/update-period/${this.props.editId}`, {
                method: 'PATCH',
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
                                <p className="h4 mb-4">Edit period</p>
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

export default EditForm
