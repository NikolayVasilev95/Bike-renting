import React, {Component} from 'react';
import './popup.css';

class DeleteForm extends React.Component {

    state = {
        id: ''
    };

    onDelete(id) {
        this.setState(state => ({id: id}), () => {
            fetch(`http://localhost:4000/api/BikeRentController/delete-period/${this.state.id}`, {
                method: 'DELETE'
            })
                .then(res => {
                    console.log(res.json());
                    this.props.closeDeleteForm = false;
                })
                .catch(err => console.log(err));
        });
    }

    render() {
        return (
            <div className="popup d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="text-center border border-light p-5 grey lighten-5">
                                <p className="h4 mb-4 text-danger">Are you sure you want to delete the record?</p>
                                <input type="button" value="Submit" className="btn btn-danger my-4 btn-block"
                                       onClick={() => this.onDelete(this.props.deleteId)}/>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteForm
