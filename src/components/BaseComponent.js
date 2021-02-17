import React, { Component } from "react";
import PaymentComponent from "./PaymentComponent";
import DetailViewComponent from "./DetailViewComponent";

class BaseComponent extends Component {
  constructor() {
    super();
    this.state = {
      paymentView: true,
      productData: null,
    };
  }

  renderComponent = () => {
   return this.state.paymentView ? <PaymentComponent updateView={this.updateView}/> : <DetailViewComponent productData={this.state.productData}/>;
  };

  updateView =(bool, productData) => {
      this.setState({ paymentView: bool, productData })
  }
  render() {
    return <div className="mainComponent">{this.renderComponent()}</div>;
  }
}

export default BaseComponent;
