const express = require("express");
const Promotion = require("../models/promotion");
const promotionRouter = express.Router();

// Authenticate
const authenticate = require("../authenticate");

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyAdmin, (req, res, next) => {
    Promotion.create(res.body)
      .then((promotion) => {
        if (promotion) {
          console.log("Promotion Created", promotion);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Promotion.deleteMany()
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

promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })
  .put(authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => {
        if (promotion) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((promotion) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        } else {
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = promotionRouter;
