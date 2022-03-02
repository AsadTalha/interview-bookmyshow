import React from "react";
import Show from "./logic";
import PaymentModal from "../PaymentModal";
import "./Dashbody.css";

class DashboardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: new Show(props.seats || 2),
      selectionComplete: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seats !== this.props.seats) {
      console.log(this.state);
      this.state.instance.setnoOfseat(this.props.seats);
      this.state.instance.clearSeats();
      this.forceUpdate();
    }
  }

  //Check if the all the seats are selected. if they are show Continue button
  checkBookingDetails(bookingDetails) {
    console.log(
      bookingDetails,
      typeof bookingDetails,
      this.state.selectionComplete
    );
    if (bookingDetails === false && this.state.selectionComplete === true) {
      this.setState({ selectionComplete: false });
    } else if (
      bookingDetails.selectedSeats &&
      this.state.selectionComplete === false
    ) {
      this.setState({ selectionComplete: true });
    }
  }

  render() {
    const { instance } = this.state;
    const { venue, seats } = instance;
    const bookingDetails = instance.getBookingDetails();
    this.checkBookingDetails(bookingDetails);
    return (
      <div className="dashbody">
        <div className="dashbody__canvas">
          {Object.values(venue.classes).map((classData, classIndex) => {
            const offset = classIndex === 0 ? 0 : 2;
            const { catogery, price } = classData;
            return (
              <div
                className="dashbody__canvas__sections"
                key={classData.title + classIndex}
              >
                <div className="dashbody__canvas__sections_tile">{`${classData.title} ${classData.extras} - ${classData.price}`}</div>
                <div>
                  {classData.rows.map((data, rowIndex) => {
                    const row = seats[data].seats;
                    return [
                      <div
                        className="dashbody__canvas__rows"
                        key={data + rowIndex}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {row.map((data, index) => {
                          if (data && data.available === false) {
                            return (
                              <div className="occupide__seat">
                                {data.number}
                              </div>
                            );
                          } else if (data && data.available === true) {
                            return (
                              <div
                                onClick={(e) => {
                                  instance.selectSeat(
                                    data,
                                    catogery,
                                    price,
                                    rowIndex + offset,
                                    index,
                                    this.forceUpdate.bind(this)
                                  );
                                }}
                                className={`seat ${
                                  data.selected === true ? "selected" : ""
                                }`}
                              >
                                {data.number}
                              </div>
                            );
                          } else {
                            return <div className="nullSeat"></div>;
                          }
                        })}
                      </div>,
                      classData.seperation > 0 &&
                      classData.seperation - 1 === rowIndex ? (
                        <div style={{ height: "30px" }}></div>
                      ) : null,
                    ];
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {this.state.selectionComplete ? (
          <PaymentModal show={false} bookingDetails={bookingDetails} />
        ) : null}
      </div>
    );
  }
}

export default DashboardBody;
