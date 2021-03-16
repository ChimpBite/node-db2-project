// STRETCH
const cars = [
  {
    vin: "11111111111111111",
    make: "Dodge",
    model: "Ram",
    mileage: 14000,
    title: "yes",
    transmission: "automatic",
  },
  {
    vin: "22222222222222222",
    make: "Dodge",
    model: "Avenger",
    mileage: 18000,
    title: "yes",
    transmission: "manual",
  },
  {
    vin: "33333333333333333",
    make: "Dodge",
    model: "Charger",
    mileage: 24000,
    title: "yes",
    transmission: "automatic",
  },
];

exports.cars = cars;

exports.seed = function (knex, Promise) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert(cars);
    });
};
