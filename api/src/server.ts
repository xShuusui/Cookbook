import "reflect-metadata";
import express from "express";

import { Environment } from "./module/environment";
import { Database } from "./module/database";
import { globalRouter } from "./router/global.router";

const startServer = () => {
    // Initalize the secret environment variables.
    Environment.readSecretsFromFiles();

    // Create express application.
    const app: express.Application = express();

    // Register the middleware.
    app.use(express.json());
    app.use("/api", globalRouter);

    // Connect to the database and start the server.
    Database.connect()
        .then(() => {
            console.info(
                "Database is running on port: " + Environment.DATABASE_PORT
            );

            app.listen(Environment.BACKEND_PORT, () =>
                console.info(
                    "Server is running on Port: " + Environment.BACKEND_PORT
                )
            );
        })
        .catch((error: Error) => {
            console.error(error);
        });
};

startServer();
