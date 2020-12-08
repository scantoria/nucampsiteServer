const express = require("express");
const Partner = require("../models/partner");
const partnerRouter = express.Router();

// Authenticate
const authenticate = require("../authenticate");

partnerRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(res.body)
      .then((partner) => {
        if (partner) {
          onsole.log("Partner Created", partner);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partner);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partner");
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partner/${req.params.partnerId}`);
  })
  .put(authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((partner) => {
        if (partner) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partner);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((partner) => {
        if (partner) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partner);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = partnerRouter;
