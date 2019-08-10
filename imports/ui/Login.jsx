import React, { Component } from "react";
import EventsService from "./services/Events.service";

// Task component - represents a single todo item
export default class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
    let values = {};
    Object.keys(this.refs).forEach(key => {
      values[key] = this.refs[key].value;
    });

    Meteor.loginWithPassword(values.email, values.password, error => {
      if (error) {
        console.log(error);
      } else {
        EventsService.onUserLogin.next(true);
        console.log(Meteor.user().profile);
        if (Meteor.user().profile.isAdmin) {
          this.props.history.push("/admin-booking");
        } else {
          this.props.history.push("/my-bookings");
        }
      }
    });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    ref="email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    ref="password"
                  />
                </div>
                <button type="submit" className="btn btn-success float-right">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
