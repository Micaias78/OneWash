import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import EventsService from "./services/Events.service";

// Task component - represents a single todo item
export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = event => {
    event.preventDefault();

    let values = {};
    Object.keys(this.refs).forEach(key => {
      values[key] = this.refs[key].value;
    });

    if (values.password === values.confirmPassword) {
      delete values.confirmPassword;
      Accounts.createUser(
        {
          email: values.email,
          password: values.password,
          profile: {
            name: values.name,
            phone: values.phone
          }
        },
        error => {
          if (error) {
            EventsService.onNotify.next(error.message);
            return;
          }
          EventsService.onNotify.next("Account created!");
          this.props.history.push("/book");
        }
      );
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <strong>Register</strong>
              </h5>

              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-12">
                    <label htmlFor="fullNameInput">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullNameInput"
                      placeholder="Full Name"
                      ref="name"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="inputEmail3">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Email"
                      ref="email"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="inputPhone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPhone"
                      placeholder="Phone Number"
                      ref="phone"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="inputPassword3">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword3"
                      placeholder="Password"
                      ref="password"
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="inputConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputConfirmPassword"
                      placeholder="Confirm Password"
                      ref="confirmPassword"
                    />
                  </div>

                  <div className="form-group col-12">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Register
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
