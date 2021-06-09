// DO YOUR MAGIC
const Car = require("./cars-model");

const router = require("express").Router();

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Car.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Car.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const data = await Car.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
