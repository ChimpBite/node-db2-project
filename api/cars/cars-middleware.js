const Car = require("./cars-model");
const vinValidator = require("vin-validator");

exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const id = await Car.getById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  try {
    if (!vin) {
      res.status(400).json({ message: "vin is missing" });
    } else if (!make) {
      res.status(400).json({ message: "make is missing" });
    } else if (!model) {
      res.status(400).json({ message: "model is missing" });
    } else if (!mileage) {
      res.status(400).json({ message: "mileage is missing" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const isValidVin = vinValidator.validate(req.body.vin);

    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const Cars = await Car.getAll();
    const vin = req.body.vin;

    const results = Cars.filter((vinCheck) => {
      if (vinCheck.vin === vin) {
        return vinCheck;
      }
    });
    if (results.length > 0) {
      res.status(400).json({ message: `${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
