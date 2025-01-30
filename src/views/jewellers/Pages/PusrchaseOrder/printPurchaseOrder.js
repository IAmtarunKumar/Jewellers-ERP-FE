import React from "react";
import "./purchaseOrder.css";

const PrintPurchaseOrder = React.forwardRef((props, ref) => {
  // console.log(props);
  const {
    orgName,
    formData,
    tableData,
    totalQuantity,
    totalAmount,
    totalTax,
    grandTotal,
    roundedTotal,
    outstandingAmount,
    purchaseNumber,
    address,
    pincode,
    tax,
  } = props;
  return (
    <div ref={ref} className="print-section">
      <div className="invoice-header">
        {/* <img
          src="https://ocpl.tech/assets/ocpl-ee7a6071.webp"
          alt="Company Logo"
          className="logo"
        /> */}
        <p className="orgName">{orgName}</p>
      </div>
      <div className="invoice-details">
        <div className="customer-details">
          <h3>To:</h3>
          <span className="bold">{formData.supplierName}</span>
          <br />
          <span className="bold">{address}</span>
          <br />
          <span className="bold">{pincode}</span>
          <br />
        </div>
        <div className="invoice-meta">
          <div>
            <h3 className="invoiceNumber">
              Purchase Number:
              <span className="bold">{purchaseNumber}</span>
            </h3>
          </div>
          <div>
            <h3 className="invoiceDate">
              Date: <span className="bold">{formData.date}</span>
            </h3>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Rate</td>
            <td>Quantity</td>
            <td>Purity</td>
            <td>Weight</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((curItem, index) => (
            <tr key={index}>
              <td>{curItem.name}</td>
              <td>{curItem.rate}</td>
              <td>{curItem.quantity}</td>
              <td>{curItem.purity}</td>
              <td>{curItem.weight}</td>
              <td>{curItem.finalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals-box">
        <div className="totals">
          <h3>Total Quantity:</h3>
          <span>{totalQuantity}</span>
          <h3>Total Amount:</h3>
          <span>{totalAmount}</span>
        </div>
        <div className="tax-details">
          <p>Grand Total: {totalAmount}</p>
          <p>Total Advance: {formData.totalAdvance}</p>
        </div>
      </div>
      <div className="signatory">
        <p>Authorized Signatory</p>
        <div className="signature-space"></div>
        <p>{orgName}</p>
      </div>
      <div className="footer">
        <p>Thank you for your business!</p>
        {/* <p>
          Terms & Conditions: Payment is due in maximum 30 days from the date of
          the invoice.
        </p> */}
      </div>
    </div>
  );
});

export default PrintPurchaseOrder;
