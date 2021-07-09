// build your `/api/resources` router here
const express = require("express");
const router = express.Router();

const ResourceModel = require("./model");

//GET /api/resources
router.get("/", async (req, res, next) => {
  try {
    const resource = await ResourceModel.find();
    res.status(200).json(resource);
  } catch (err) {
    next(err);
  }
});

//GET /api/resources/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resources = await ResourceModel.findById(id);
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
});

///POST /api/resources
router.post("/", async (req, res, next) => {
  const resourcePost = req.body;
  try {
    const newResource = await ResourceModel.add(resourcePost);
    res.json(newResource);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
