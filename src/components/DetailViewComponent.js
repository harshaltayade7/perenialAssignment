function DetailViewComponent(props) {
  return (
    <div className="mainComponent">
      <div>Product {props.productData.name}</div>
      <div>Date {props.productData.date}</div>
      <div>Amount {props.productData.amount}</div>
      <div className="sussessMsg"> your payment has been successfully processed</div>
      <div className="sussessMsg"> INVOICE ABCDEKDJL</div>
    </div>
  );
}

export default DetailViewComponent;
