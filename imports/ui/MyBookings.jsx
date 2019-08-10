import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Bookings } from "../api/bookings";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import EventsService from "./services/Events.service";

// Task component - represents a single todo item
class MyBookingsComp extends Component {
  constructor(props) {
    super(props);
  }

  handleCancelBooking = booking => {
    return () => {
      Bookings.remove({ _id: booking._id }, error => {
        if (error) {
          return;
        }
        EventsService.onNotify.next('Booking cancelled!');
      });
    };
  };

  renderBookings = () => {
    return this.props.bookings.map((booking, index) => {
      return (
        <tr key={booking._id}>
          <th scope="row">{index + 1}</th>
          <td>{booking.address}</td>
          <td>{booking.serviceType}</td>
          <td>{moment(booking.date).format("DD-MM-YYYY HH:mm")}</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={this.handleCancelBooking(booking)}
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">Service</th>
              <th scope="col">Date</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.renderBookings()}</tbody>
        </table>
      </div>
    );
  }
}

const MyBookings = withTracker(() => {
  return {
    bookings: Bookings.find({ userId: Meteor.userId() }).fetch()
  };
})(MyBookingsComp);

// export the component `App`
export default MyBookings;
