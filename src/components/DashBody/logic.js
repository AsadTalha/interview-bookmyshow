import venueData from "../../.data/venue.json";
import seatsDta from "../../.data/seats.json";

class Show {
  constructor(no_seat) {
    this.venue = venueData;
    this.seats = seatsDta;
    this.noOfseat = parseInt(no_seat);
    this.selectedSeats = [];
    this.noOfseatsSelected = 0;
  }

  //Send current booking status
  getBookingDetails() {
    if (this.noOfseat === this.noOfseatsSelected) {
      return { selectedSeats: this.selectedSeats };
    } else {
      return false;
    }
  }

  //Change number of seats the user is booking
  setnoOfseat = (num) => {
    this.noOfseat = parseInt(num);
  };

  //Helper function to get row name
  getChar(num) {
    const arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    return arr[num];
  }

  //Clear selected seats
  clearSeats() {
    this.noOfseatsSelected = 0;
    this.selectedSeats.forEach((i) => {
      this.seats[i.rowChar].seats[i.seatPosition].selected = false;
    });
    this.selectedSeats = [];
  }

  //Handle selecting a seat
  selectSeat = (
    seatDetails,
    catogery,
    price,
    row,
    seatPosition,
    forceUpdate
  ) => {
    //Unselecting seats for picking new spot
    if (
      this.noOfseatsSelected === this.noOfseat ||
      (this.selectedSeats[0] && this.selectedSeats[0].catogery !== catogery)
    ) {
      this.clearSeats();
    }

    //Selecting next seat
    const seatNumber = seatDetails.number;
    const rowChar = this.getChar(row);

    //Check if the combination is available
    let selectMultiple = false;
    if (this.selectedSeats.length === 0 && this.noOfseat > 1) {
      let combinationAvailable = true;
      for (let i = 0; i < this.noOfseat; i++) {
        if (i !== 0) {
          const nextseat = this.seats[rowChar].seats[seatPosition + i];
          if (!nextseat || nextseat.available === false) {
            combinationAvailable = false;
          }
        }
      }
      if (combinationAvailable) {
        selectMultiple = true;
      }
    }

    //If combination available pre-select them
    if (selectMultiple) {
      for (let i = 0; i < this.noOfseat; i++) {
        this.seats[rowChar].seats[seatPosition + i].selected = true;
        const seatAddr = {
          rowChar,
          seatPosition: seatPosition + i,
          seatNumber: seatNumber + i,
          catogery,
          price,
        };
        this.selectedSeats.push(seatAddr);
        this.noOfseatsSelected = this.noOfseatsSelected + 1;
      }
    }
    //If combination not available manually selecting seats
    else {
      this.seats[rowChar].seats[seatPosition].selected = true;
      const seatAddr = { rowChar, seatPosition, seatNumber, catogery, price };
      this.selectedSeats.push(seatAddr);
      this.noOfseatsSelected = this.noOfseatsSelected + 1;
    }

    //force update component to reflect changes
    forceUpdate();
  };
}

export default Show;
