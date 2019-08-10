import React, { Component } from "react";
import { Link } from "react-router-dom";

// Task component - represents a single todo item
export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="row justify-content-center">
            <div className="col-4">
              <img src="/logo.png" className="card-img-top" />
            </div>
          </div>
          <div className="card-body">
            <div className="row justify-content-around">
              <div className="col-2">
                <Link className="btn btn-primary btn-block" to="/register">
                  Register
                </Link>
              </div>
              <div className="col-2">
                <Link className="btn btn-info btn-block" to="/book">
                  Book Service
                </Link>
              </div>
              <div className="col-2">
                <Link className="btn btn-success btn-block" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row cards-row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Basic Valet</strong>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Breath new life into your car. It diserves it.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Mini Valet</strong>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  We provide efficient professionals. Book a mini valet by
                  visiting on line.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Full Valet</strong>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Book a full valet service.<br /> Our proven car cleaners are
                  just a booking away.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Deluxe Valet</strong>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Professional mobile vehicle detailing services in Dublin at a
                  reasonable price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
