'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories-collection.js');

const products = require('../models/products/products-collection.js');

const bearerMiddleware = require('../lib/auth-server/bearer-auth.js');

const permissions = require('../lib/auth-server/acl-middleware.js');

function getModel(req, res, next) {

  let model = req.params.model;

  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('Error: Invalid Model');
    return;
  }
}

router.param('model', getModel);

router.get('/:model', bearerMiddleware, permissions('read'), getAllFunction);
router.get('/:model/:id', bearerMiddleware, permissions('read'), getOneFunction);
router.post('/:model', bearerMiddleware, permissions('create'), postFunction);
router.put('/:model/:id', bearerMiddleware, permissions('update'), putFunction);
router.delete('/:model/:id', bearerMiddleware, permissions('delete'), deleteFunction);

function getAllFunction(req, res, next) {
  req.model.get()
    .then(data => {
      let count = data.length;
      res.status(200).json({ count, data });
    }).catch(next);
}

function getOneFunction(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function postFunction(req, res, next) {
  req.model.post(req.body)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function putFunction(req, res, next) {
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(data => res.status(200).json(data))
    .catch(next);
}

function deleteFunction(req, res, next) {
  let id = req.params.id;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(`This ${data.id} deleted succecfully.`);
    }).catch(next);
}

module.exports = router;