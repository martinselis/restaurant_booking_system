import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import Request from "../helpers/requests.js";
import NewCustomer from "../Components/NewCustomerComponent";

import "./css/NewBookingContainer.css";

class NewBookingContainer extends Component {
  constructor (props)  {
    super(props)
    this.state = {
      redirect: false
    }

    this.renderRedirect = this.renderRedirect.bind(this)
    this.handleNewBookingSubmit = this.handleNewBookingSubmit.bind(this);
    this.handleNewCustomer = this.handleNewCustomer.bind(this);
  }

  setRedirect(){
    this.setState({
      redirect: true
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  handleNewBookingSubmit(event) {
    event.preventDefault()
    console.log(this.props.id, this.props.day, this.props.month, this.props.time)
    // console.log(event.target.customers.value)
    const request = new Request();
    request.post('/bookings', {
      "customer": "http://localhost:8080/customers/" + event.target.customers.value,
      "restaurantTable": "http://localhost:8080/restaurantTable/" + this.props.id,
      "day": this.props.day,
      "month": this.props.month,
      "time": this.props.time
    })
    this.setRedirect();

    this.props.getData()

  }

  handleNewCustomer(newCustomer){
    const request = new Request();
    request.post('/customers', {name: newCustomer})
      .then(_ => this.props.getData())
  }
  render() {

    const customerOptions = this.props.customers.map((customer, index) => {
      return <option key={index} value={customer.id}>{customer.name}</option>
    })

    return (
      <div className="newbooking">
        {this.renderRedirect()}
      <h4 className="newbookingheader">New booking</h4>
      <form onSubmit={this.handleNewBookingSubmit}>
      <span className="customerSpan">Customers:</span>
      <select id="customers">
      {customerOptions}
      </select>
      <p> Table: {this.props.id}</p>
      <p> Date: {this.props.day}/{this.props.month} </p>
      <p> Time: {this.props.time} </p>
      <div className="submitbutton">
        <input type="submit" />
      </div>
      </form>


      <form>

      <NewCustomer handleNewCustomer={this.handleNewCustomer} />
      </form>
      </div>
    )
  }
}


export default NewBookingContainer;
