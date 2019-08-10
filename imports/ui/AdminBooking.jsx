import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Bookings } from "../api/bookings";
import { Meteor } from "meteor/meteor";
import moment from "moment";

// Task component - represents a single todo item
class AdminBookingComp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  renderBookings = () => {
    return this.props.bookings.map((booking, index) => {
      return (
        <tr key={booking._id}>
          <th scope="row">{index + 1}</th>
          <td>{booking.fullName}</td>
          <td>{booking.email}</td>
          <td>{booking.phone}</td>
          <td>{booking.address}</td>
          <td>{booking.serviceType}</td>
          <td>{moment(booking.date).format("DD-MM-YYYY HH:mm")}</td>
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
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Service</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{this.renderBookings()}</tbody>
        </table>
      </div>
    );
  }
}

const AdminBooking = withTracker(() => {
  return {
    bookings: Bookings.find().fetch()
  };
})(AdminBookingComp);

// export the component `App`
export default AdminBooking;
