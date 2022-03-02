import React from "react";
import Header from "../../components/DashHeader";
import DashboardBody from "../../components/DashBody";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      seats: 0,
      time: null,
    };
  }

  render() {
    return (
      <div style={{ paddingBottom: "40px" }}>
        <Header
          setSeats={(num) => this.setState({ seats: num })}
          setTime={(num) => this.setState({ time: num })}
        />
        <DashboardBody seats={this.state.seats} />
      </div>
    );
  }
}

export default Dashboard;
