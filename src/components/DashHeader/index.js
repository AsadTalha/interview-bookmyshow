import React from "react";
import data from "./data.json";
import "./Dashheader.css";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__container">
        <span>NO OF TICKETS</span>
        <select
          className="header__select header__seats"
          onChange={(e) => props.setSeats(e.target.value)}
        >
          {data.seats.map((i, index) => {
            return (
              <option
                className="header__select__option"
                key={i + index}
                value={i}
                selected={i === 2}
              >
                {i}
              </option>
            );
          })}
        </select>
      </div>
      <div className="header__container">
        <span>SHOWTIME</span>
        <select
          className="header__select header__time"
          onChange={(e) => props.setTime(e.target.value)}
        >
          {data.time.map((i, index) => {
            return (
              <option
                className="header__select__option"
                key={i + index}
                value={i}
              >
                {i}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Header;
