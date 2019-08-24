const boom = require('boom');
const {config} = require('./../../config');

const isRequestAjaxOrApi = require('./../../utils/isRequestAjaxOrApi');

function withErrorStack(err, stack) {
  if (config.dev) {
    return {...err, stack};
  }
}

function logError(err, req, res, next) {
  console.log(err.stack);

  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  const {output: {statusCode, payload}} = err;

  // catch errors for AJAX request o if an error occurs while streaming
  if (isRequestAjaxOrApi(req) || res.headerSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.render('err', withErrorStack(payload, err.stack));
}

module.exports = {
  logError,
  wrapErrors,
  clientErrorHandler,
  errorHandler
};