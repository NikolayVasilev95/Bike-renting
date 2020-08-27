import React, {Component} from "react";
import DeleteForm from "./deleteForm";
import EditForm from "./editForm";

class Table extends React.Component {

    state = {
        periods: [],
        totalPrice: Object,
        openDeleteModule: false,
        openEditModule: false,
        id: ''
    };

    componentDidMount() {
        fetch('http://localhost:4000/api/BikeRentController/periods')
            .then(res => res.json())
            .then((data) => {
                this.setState({periods: data})
            })
            .catch(console.log)
        fetch('http://localhost:4000/api/BikeRentController/total-price')
            .then(res => res.json())
            .then((data) => {
                this.setState({totalPrice: data})
            })
            .catch(console.log)
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

    showModule(target, id) {
        console.log(target)
        if (target === "deleteBtn") {
            this.setState(state => ({openDeleteModule: !state.openDeleteModule}));
            this.setState(state => ({id: id}));
        } else {
            console.log(true)
            this.setState(state => ({openEditModule: !state.openEditModule}));
            this.setState(state => ({id: id}));
        }
    }

    editForm(id) {
        console.log('edit')
        this.setState(state => ({openEditModule: !state.openEditModule}));
        this.setState(state => ({id: id}));
    }

    deleteForm(id) {
        this.setState(state => ({openDeleteModule: !state.openDeleteModule}));
        this.setState(state => ({id: id}));
    }

    // closeModule = (close) => {
    //     console.log(close)
    //     this.setState(state => ({open: close}))
    // };

    render() {
        return (
            <div>
                <div>
                    {this.state.openEditModule ? <EditForm editId={this.state.id}/> : console.log(false)}
                </div>
                <div>
                    {this.state.openDeleteModule ? <DeleteForm deleteId={this.state.id}/> : console.log(false)}
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Price per day</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Added</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.periods.map(item =>
                        <tr>
                            <td>{item.price_per_day}</td>
                            <td>{item.from === null ? 'Empty' : this.formatDate(item.from)}</td>
                            <td>{item.to === null ? 'Empty' : this.formatDate(item.to)}</td>
                            <td>{item.added === null ? 'Empty' : this.formatDate(item.added)}</td>
                            <td>
                                <button type="button" name="editBtn" className="btn btn-warning"
                                        onClick={(e) => this.showModule(e.target.name, item._id)}><i
                                    className="fas fa-edit"></i></button>
                                <button type="button" name="deleteBtn" className="btn btn-danger"
                                        onClick={(e) => this.showModule(e.target.name, item._id)}>
                                    <i className="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    <tr className="stylish-color text-white">
                        <td></td>
                        <td>Starting day of the whole rent</td>
                        <td>Ending day of the whole rent</td>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{this.state.totalPrice.Start_day_of_the_whole_rent === null ? 'Empty' : this.formatDate(this.state.totalPrice.Start_day_of_the_whole_rent)}</td>
                        <td>{this.state.totalPrice.End_day_of_the_whole_rent === null ? 'Empty' : this.formatDate(this.state.totalPrice.End_day_of_the_whole_rent)}</td>
                        <td colSpan={2} className="text-right">
                            <span>Total price: </span>
                            {this.state.totalPrice.totalPrice}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default Table
