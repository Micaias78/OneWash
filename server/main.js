import { Meteor } from "meteor/meteor";
import "../imports/api/bookings";
import "../imports/api/service-types";
import { ServiceTypes } from "../imports/api/service-types";

Meteor.startup(() => {

  let adminUsers = Meteor.users.find({ "profile.isAdmin": true }).fetch();
  if (adminUsers.length === 0) {
    Accounts.createUser({
      email: "admin@gmail.com",
      password: "123456",
      profile: {
        name: "Admin",
        phone: "147852369",
        isAdmin: true
      }
    });
  }

  adminUsers = Meteor.users.find({ "profile.isAdmin": true }).fetch();

  const services = ServiceTypes.find().fetch();

  if (services && services.length > 0) {
    return;
  }
  const newServices = [
    {
      type: "Basic Valet",
      cost: 20,
      subServices: ["Hand wash", "Windows clean", "Tyre polish"]
    },
    {
      type: "Mini Valet",
      cost: 50,
      subServices: [
        "Hand wash & Vacuum",
        "Wheel clean & Tyre polish",
        "Windows clean"
      ]
    },
    {
      type: "Full Valet",
      cost: 70,
      subServices: [
        "Hand wash & Vacuum",
        "Wheel clean & Tyre polish",
        "Windows clean",
        "Dashboard clean",
        "Polishing"
      ]
    },
    {
      type: "Deluxe Valet",
      cost: 90,
      subServices: [
        "Hand wash & Vacuum",
        "Wheel clean & Tyre polish",
        "Windows clean",
        "Dashboard clean",
        "Polishing",
        "Hygiene interiors",
        "Treat leather seats"
      ]
    }
  ];

  newServices.forEach(service => {
    ServiceTypes.insert(service);
  });
});
