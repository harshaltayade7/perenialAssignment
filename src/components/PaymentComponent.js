import React, { Component } from "react";

// import { Button } from 'react-bootstrap';

import { DatePicker, Button, Input } from "antd";

class PaymentComponent extends Component {
  constructor() {
    super();
    this.state = {
      productData: {
        name: "ABCD",
        date: "11/11/2021",
        amount: "100rs",
      },
      cardTypes: null,
      expiry: "",
      name: "",
      email: "",
      cardNumber: "",
      errMsg : [],
    };

    this.btnRef = React.createRef();
  }

  componentDidMount() {
    fetch("http://localhost:4000/cardTypes")
      .then((response) => response.json())
      .then((data) => {
        const cardTypes = data.map((card) => card.value);
        this.setState({ cardTypes });
      });

    this.btnRef.current.disabled = true
  }

  // getter
  get validateData() {
    const { name, email, cardNumber, expiry } = this.state;
    const errMsg = [];
    if(!name || name.length < 5) {
      errMsg.push("name should have more charactors")
    }
    if(!email || email.indexOf("@") == -1) {
      errMsg.push("you have type a wrong email")
    }
    return errMsg;
  }
  
  confirmPayment = () => {
    const errMsg = this.validateData;
    if(errMsg.length == 0) {
      this.props.updateView(false, this.state.productData);
    } else {
      this.setState({errMsg: [...errMsg]})
    }
  };

  updateInputField = (obj) => {
    const inputVal = obj.target.value;
    switch (obj.target.className) {
      case "expiryField":
          this.setState({ expiry: inputVal });
          break;
      case "ant-input nameField":
        this.setState({ name: inputVal });
        break;
      case "ant-input emailField":
        this.setState({ email: inputVal });
        break;
      case "ant-input cardNumber":
        this.setState({ cardNumber: inputVal });
        break;
    }
    var errMsg = this.validateData;
    if(errMsg.length == 0) {
      this.btnRef.current.disabled = false
    } else {
      this.btnRef.current.disabled = true
    }
  };

  render() {
    const {
      productData: { name, date, amount },
      cardTypes,
      expiry,
      email,
      cardNumber,
    } = this.state;
    return (
      <div className="container">
        <div className="productField">
          <div>Product {name}</div>
          <div>Date {date}</div>
          <div>Amount {amount}</div>
        </div>
        <div className="componentFields">
          <div> Card Types </div>
          <select name="cars" id="cars">
            {cardTypes
              ? cardTypes.map((card) => <option value="audi">{card}</option>)
              : null}
          </select>
          <div> Card number</div>
          <Input
            placeholder="card number"
            type="text"
            className="cardNumber"
            value={cardNumber}
            onChange={this.updateInputField}
          />
          <div>Expiry</div>
          <input
            className="expiryField"
            value={expiry}
            onChange={this.updateInputField}
          />
          {/* <DatePicker /> */}
          <div>Name</div>
          <Input
            placeholder="name"
            type="text"
            className="nameField"
            value={this.state.name}
            onChange={this.updateInputField}
          />
          <div>Email</div>
          <Input
            placeholder="email"
            type="text"
            className="emailField"
            value={email}
            onChange={this.updateInputField}
          />
          <div>
            <Button ref={this.btnRef} onClick={this.confirmPayment} type="text">
              Confirm Payment
            </Button>
          </div>
          <div>
            {this.state.errMsg.map((msg,ind)=>(<div key={ind}>{msg}</div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentComponent;
