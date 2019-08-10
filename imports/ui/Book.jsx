import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import { Bookings } from "../api/bookings";
import { Meteor } from "meteor/meteor";
import { ServiceTypes } from "../api/service-types";
import EventsService from "./services/Events.service";

// Task component - represents a single todo item
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: this.props.serviceTypes[0],
      isValidDate: true,
      takenHours: {},
      hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedService: nextProps.serviceTypes[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.isValidDate) {
      return;
    }
    let user = Meteor.user();
    let refValues = {};
    Object.keys(this.refs).forEach(key => {
      if (this.refs[key].value === "true" || this.refs[key].value === "false") {
        if (!refValues.subServices) {
          refValues.subServices = {};
        }
        refValues.subServices[key] = this.refs[key].value == "true";
      } else {
        refValues[key] = this.refs[key].value;
      }
    });
    refValues.fullName = user.profile.name;
    refValues.phone = user.profile.phone;
    refValues.email = user.emails[0].address;

    let hours = refValues.hours;
    delete refValues.hours;
    delete refValues.resetButton;
    refValues.date = moment(refValues.date, "YYYY-MM-DD")
      .add(+hours, "hours")
      .toDate();
    refValues.userId = Meteor.user()._id;

    Bookings.insert(refValues, error => {
      if (error) {
        console.log(error.message);
      }
      let takenHours = this.state.takenHours;
      takenHours[moment(refValues.date).format("H")] = true;
      this.setState({ takenHours });
      this.refs.resetButton.click();
      EventsService.onNotify.next("Booking registered!");
    });
  }

  handleChangeServiceType = event => {
    const value = event.target.value;
    this.props.serviceTypes.some(serviceType => {
      if (serviceType.type === value) {
        this.setState({
          selectedService: serviceType
        });
        return true;
      }
    });
  };

  renderSubServices = selectedService => {
    if (!this.state.selectedService) {
      return null;
    }

    return this.state.selectedService.subServices.map((subService, index) => {
      return (
        <div
          key={this.state.selectedService._id + index.toString()}
          className="form-check"
        >
          <input
            ref={subService}
            className="form-check-input"
            type="checkbox"
            defaultValue
            id={"sub-service-" + index}
            defaultChecked
          />
          <label className="form-check-label" htmlFor={"sub-service-" + index}>
            {subService}
          </label>
        </div>
      );
    });
  };

  renderServiceTypes = serviceTypes => {
    if (serviceTypes && serviceTypes.length > 0) {
      return (
        <div className="form-group col-12">
          <label htmlFor="locationInput">Service</label>
          <select
            className="form-control"
            ref="serviceType"
            onChange={this.handleChangeServiceType}
          >
            {serviceTypes.map(serviceType => {
              return (
                <option value={serviceType.type} key={serviceType._id}>
                  {serviceType.type} - {serviceType.cost}€
                </option>
              );
            })}
          </select>
          <fieldset>{this.renderSubServices()}</fieldset>
        </div>
      );
    }
    return null;
  };

  handleChangeDate = event => {
    const selectedDate = moment(event.target.value, "YYYY-MM-DD");
    let nextDay = moment();
    nextDay.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    nextDay = nextDay.add(1, "day");
    const selectedIsoWeekDay = selectedDate.isoWeekday();
    this.setState({
      isValidDate:
        selectedDate > nextDay &&
        selectedIsoWeekDay !== 6 &&
        selectedIsoWeekDay !== 7
    });
    let initSelectedDate = selectedDate.clone();
    initSelectedDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    let bookingsOnDay = Bookings.find({
      date: {
        $gt: initSelectedDate.toDate(),
        $lt: initSelectedDate.add(1, "day").toDate()
      }
    }).fetch();
    let takenHours = {};
    bookingsOnDay.forEach(booking => {
      takenHours[moment(booking.date).format("H")] = true;
    });
    this.setState({ takenHours });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Book an appointment</h5>

              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-row">
                  <div className="form-group col-12">
                    <label htmlFor="locationInput">Address</label>
                    <input
                      ref="address"
                      type="text"
                      className="form-control"
                      id="locationInput"
                      placeholder="Address"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="vehicleTypeInput">Vehicle Type</label>
                    <input
                      ref="vehicleType"
                      type="text"
                      className="form-control"
                      id="vehicleTypeInput"
                      placeholder="Type of the vehicle"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="vehicleBrandInput">Vehicle Brand</label>
                    <input
                      ref="vehicleBrand"
                      type="text"
                      className="form-control"
                      id="vehicleBrandInput"
                      placeholder="Brand of the vehicle"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="licenceInput">Vehicle Licence</label>
                    <input
                      ref="vehicleLicence"
                      type="text"
                      className="form-control"
                      id="licenceInput"
                      placeholder="Licence Nº"
                    />
                  </div>

                  {this.props.serviceTypes
                    ? this.renderServiceTypes(this.props.serviceTypes)
                    : null}

                  <div className="form-group col-6">
                    <label htmlFor="dateInput">Date</label>
                    <input
                      ref="date"
                      type="date"
                      className="form-control"
                      id="dateInput"
                      placeholder="Date"
                      onChange={this.handleChangeDate}
                    />
                    {this.state.isValidDate ? null : (
                      <div className="text-danger">
                        Booking must be made more than 1 hay before and cannot
                        be on weekend!
                      </div>
                    )}
                  </div>

                  <div className="form-group col-6">
                    <label htmlFor="dateInput">Time</label>
                    <select className="form-control" ref="hours">
                      {this.state.hours.map(hour => {
                        if (this.state.takenHours[hour]) {
                          return null;
                        }
                        return (
                          <option key={Math.random()} value={hour}>
                            {hour}:00
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="commentsInput">Comments</label>
                    <textarea
                      ref="customerComments"
                      className="textarea customer-comments"
                      id="commentsInput"
                      placeholder="Any information that you want to let us know..."
                    />
                  </div>

                  <div className="form-group col-12">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Book
                    </button>
                    <button
                      ref="resetButton"
                      type="reset"
                      className="btn btn-primary float-right invisible"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export the component `App`
export default withTracker(() => {
  return {
    serviceTypes: ServiceTypes.find().fetch()
  };
})(Book);
