import { Sequelize } from "sequelize";
import DatabaseAdapter from "./core/database/postgresql-adapter.js";
import Routing from "./core/routes.js";
import Server from "./core/server.js";
import SwaggerDoc from "./core/swagger.js";
import modelsArray from "./modules/models/_index.js"
import userRouter from "./modules/user/router.js";
import companyRouter from "./modules/company/router.js";
import gameRouter from "./modules/game/router.js";
import sessionRouter from "./modules/session/router.js";

const APP_PORT = process.env.PORT || 7001;
const GLOBAL_PREFIX = process.env.PREFIX || "";

new Server(APP_PORT, [
    new DatabaseAdapter(
        new Sequelize(process.env.DB_NAME, process.env.PG_USER, process.env.PG_PASS, {
            dialect: "postgres",
            host: process.env.PG_HOST || "localhost",
            port: process.env.PG_PORT || 5432,
            logging: false,
            query: { raw: true, nest: true },
            sync: { alter: true }
        })
    ).registerModels([...modelsArray]),
    new Routing(GLOBAL_PREFIX, [
        { router: userRouter },
        { router: companyRouter, prefix: "/company" },
        { router: gameRouter, prefix: "/game" },
        { router: sessionRouter, prefix: "/session" }
    ]),
    new SwaggerDoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "SERVER CORE",
                version: "1.0.0",
                description: "Server core",
                contact: {
                    name: "illinois",
                    url: "http://example.com"
                }
            },
            components: {
                securitySchemes: {
                    bearer: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
                }
            },
            security: [{ bearer: [] }]
        },
        apis: ["./documents/**/*.yml", "./documents/**/*.yaml"]
    })
])
    .initServices()
    .then((server) => server.run(() => console.log("Server started on port %s", APP_PORT)));
