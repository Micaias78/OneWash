import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Services from "./Services.jsx";
import Book from "./Book.jsx";
import MyBookings from "./MyBookings.jsx";
import { Meteor } from "meteor/meteor";
import EventsService from "./services/Events.service.js";
import { interval, of } from "rxjs";
import { takeWhile, delay, first } from "rxjs/operators";
import AdminBooking from "./AdminBooking.jsx";

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showNotification: false,
      notificationMsg: ""
    };
    this.subscriptions = [];
    const sub = interval(100)
      .pipe(
        takeWhile(() => {
          return !this.state.user;
        })
      )
      .subscribe(() => {
        const user = Meteor.user();
        if (user) {
          this.setState({
            user: user
          });
        }
      });
    this.subscriptions.push(sub);
  }

  componentWillMount() {
    let sub = EventsService.onUserLogin.subscribe(() => {
      this.setState({
        user: Meteor.user()
      });
    });
    this.subscriptions.push(sub);

    sub = EventsService.onNotify.subscribe(message => {
      if (!message || message.length === 0) {
        return;
      }
      this.setState({ showNotification: true, notificationMsg: message });
      of(true)
        .pipe(
          delay(5000),
          first()
        )
        .subscribe(() => {
          this.setState({ showNotification: false, notificationMsg: "" });
        });
    });
    this.subscriptions.push(sub);
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  renderUserIcon = () => {
    return (
      <div>
        <span className="navbar-brand text-info">
          <i className="material-icons md-36">account_circle</i>
          {this.state.user.profile.name}
        </span>
        <button className="btn btn-primary" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  };

  renderAuthButtons = () => {
    return (
      <div className="auth-buttons">
        <Link className="btn btn-outline-primary my-2 my-sm-0" to="/register">
          Register
        </Link>
        <Link className="btn btn-success" to="/login">
          Login
        </Link>
      </div>
    );
  };

  handleLogout = () => {
    Meteor.logout(error => {
      window.location.href = "/";
      this.setState({
        user: null
      });
    });
  };

  renderNav = () => {
    return this.state.user && this.state.user.profile.isAdmin ? (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/admin-booking">
            Booking<span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/book">
            Book Services<span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">
            Services<span className="sr-only">(current)</span>
          </Link>
        </li>
        {this.state.user ? (
          <li className="nav-item ">
            <Link className="nav-link" to="/my-bookings">
              My Bookings<span className="sr-only">(current)</span>
            </Link>
          </li>
        ) : null}
      </ul>
    );
  };

  renderNotification = () => {
    return this.state.showNotification ? (
      <div className="notification alert alert-primary" role="alert">
        {this.state.notificationMsg}
      </div>
    ) : null;
  };

  render() {
    return (
      <div className="container">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              One wash
            </Link>

            {this.renderNav()}

            {this.state.user ? this.renderUserIcon() : this.renderAuthButtons()}
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/services" exact component={Services} />
          <Route path="/book" exact component={Book} />
          <Route path="/my-bookings" exact component={MyBookings} />
          <Route path="/admin-booking" exact component={AdminBooking} />
        </Router>
        {this.renderNotification()}
      </div>
    );
  }
}
