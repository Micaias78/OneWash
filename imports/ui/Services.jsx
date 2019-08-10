import React, { Component } from "react";

// Task component - represents a single todo item
export default class Services extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">Basic Valet</div>
            <div className="card-body">
              <ul>
                <li>Hand wash</li>
                <li>Windows clean</li>
                <li>Tyre polish</li>
              </ul>

              <a href="#" className="card-link float-right">
                <strong>20€</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-header">Mini Valet</div>
            <div className="card-body">
              <ul>
                <li>Hand wash & Vacuum </li>
                <li>Wheel clean & Tyre polish</li>
                <li>Windows clean</li>
              </ul>
              <a href="#" className="card-link float-right">
                <strong>50€</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-header">Full Valet</div>
            <div className="card-body">
              <ul>
                <li>Hand wash & Vacuum</li>
                <li>Wheel clean & Tyre polish</li>
                <li>Windows clean</li>
                <li>Dashboard clean</li>
                <li>Polishing</li>
              </ul>
              <a href="#" className="card-link float-right">
                <strong>70€</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-header">Deluxe Valet</div>
            <div className="card-body">
              <ul>
                <li>Hand wash & Vacuum</li>
                <li>Wheel clean & Tyre polish</li>
                <li>Windows clean</li>
                <li>Dashboard clean</li>
                <li>Polishing</li>
                <li>Hygiene interiors *Treat leather seats</li>
              </ul>
              <a href="#" className="card-link float-right">
                <strong>90€</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
