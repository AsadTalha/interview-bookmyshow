import React, { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = (props) => {
  console.log(props);
  const [showInvoice, setInvoice] = useState(false);
  return (
    <div className={showInvoice ? "paymentModal_bill" : "paymentModal_proceed"}>
      {showInvoice ? (
        <div className="billing__container">
          <div className="billing__container__tota">
            ₹
            {props.bookingDetails.selectedSeats.length *
              props.bookingDetails.selectedSeats[0].price}
          </div>
          <div className="billing__container__breakdown">
            <div className="billing__container__breakdown__element">
              <div className="billing__container__breakdown__lable">
                No of seats
              </div>
              <span className="billing__container__breakdown__value">
                {props.bookingDetails.selectedSeats.length}
              </span>
            </div>
            <div className="billing__container__breakdown__element">
              <div className="billing__container__breakdown__lable">
                Price per seat
              </div>
              <span className="billing__container__breakdown__value">
                ₹{props.bookingDetails.selectedSeats[0].price}
              </span>
            </div>
            <div className="billing__container__breakdown__element">
              <div className="billing__container__breakdown__lable">
                Total price
              </div>
              <span className="billing__container__breakdown__value">
                ₹
                {props.bookingDetails.selectedSeats.length *
                  props.bookingDetails.selectedSeats[0].price}
              </span>
            </div>
          </div>
          <div className="button__container">
            <div className="button__cancel" onClick={() => setInvoice(false)}>
              Cancel
            </div>
            <div
              className="button__pay"
              onClick={() => {
                alert("Booking confirmed!");
                window.location.reload();
              }}
            >
              Pay
            </div>
          </div>
        </div>
      ) : (
        <div className="button__continue" onClick={() => setInvoice(true)}>
          Continue
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
