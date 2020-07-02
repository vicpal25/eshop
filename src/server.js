// import newrelic from 'newrelic';
import express from "express";
import graphQL from "express-graphql";

import pinoLogger from "express-pino-logger";
import pinoSerializer from "pino-std-serializers";

import crypto from "crypto";

import cors from "cors";
import "config";
import schema from "schema";
import formatError from "utils/error/formatError";
import logger from "utils/logger";

import db from "utils/db";
import createStore from 'store';

const { PORT = 9000, MONGO_URI } = process.env;

const app = express();
// Determine correlationId to use and create instance of logger with correlationId
// Place both of these into req object to propegate throughout server and graphql
app.use((req, res, next) => {
  req.correlationId =
    req.header("X-Correlation-ID") || crypto.randomBytes(16).toString("hex");

  req.logger = logger.child({
    correlationId: req.correlationId
  });

  req.logger.info({
    req: pinoSerializer.req(req),
    msg: "request begin"
  });

  next();
});

app.get("/status", (req, res) => {
  try {
    // Strip out everything but the address.
    const mongoAddress = MONGO_URI.match(/@(.*)/);
    res.send(`db: ${mongoAddress[1]}`);
  } catch (err) {
    logger.error(`Failure in /status: ${err}`);
  }
});

app.get("/healthcheck", (req, res) => {
  res.status(200).send({ status: "ok" });
});

// Log the requests and responses using logger with correlationId
app.use(cors());

app.use((req, res, next) => pinoLogger({ logger: req.logger })(req, res, next));

app.use(
  graphQL(req => {
    const { correlationId, logger: reqLogger } = req;

    const Store = createStore(reqLogger);
    const context = {
      correlationId,
      logger: reqLogger,
      db,
      Store,
      Logger: reqLogger,
      errors: []
    };

    return {
      schema,
      graphiql: true,
      context,
      formatError: err => {
        return formatError(req.logger)(err);
      },
      extensions({ result, operationName }) {
        // Tag New Relic Transaction With Named Query/Mutation
        // if (operationName) {
        //   newrelic.setTransactionName(operationName); // eslint-disable-line no-undef
        // }

        // Apply Errors
        if (result.errors && context.errors.length) {
          result.errors = [...result.errors, ...context.errors]; // eslint-disable-line no-param-reassign
        } else if (context.errors.length) {
          result.errors = context.errors; // eslint-disable-line no-param-reassign
        }
      }
    };
  })
);

try {
  const server = app.listen(PORT, () => {
    const host =
      server.address().address !== "::"
        ? server.address().address
        : "localhost";
    const { port } = server.address();

    logger.info(`PRODUCT API is listening at http://${host}:${port}`);
  });
} catch (e) {
  logger.fatal(e);
  process.exit(1);
}
