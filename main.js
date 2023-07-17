import { Sequelize } from "sequelize";
import MongoAdapter from "./core/database/mongo-adapter.js";
import DatabaseAdapter from "./core/database/postgresql-adapter.js";
import RedisAdapter from "./core/database/redis-adapter.js";
import PassportModule from "./core/passport.js";
import QueueModule from "./core/queue.js";
import Routing from "./core/routes.js";
import Server from "./core/server.js";
import SwaggerDoc from "./core/swagger.js";
import AuthModels from "./modules/auth/models/_index.js";
import AuthRouter from "./modules/auth/router.js";
import { PassportJwt } from "./modules/guards/jwt.js";

const APP_PORT = process.env.PORT || 7001;
const GLOBAL_PREFIX = process.env.PREFIX || "";
new Server(APP_PORT, [
    new RedisAdapter({
        host: process.env.RD_HOST,
        password: process.env.RD_PASS
    }),
    new MongoAdapter({
        database: process.env.DB_NAME,
        host: process.env.MG_HOST,
        login: process.env.MG_USER,
        password: process.env.MG_PASS,
        port: process.env.MG_PORT
    }),
    new QueueModule({
        host: process.env.Q_HOST,
        login: process.env.Q_LOGIN,
        password: process.env.Q_PASS
    })
        .registryQueues([])
        .registryListeners([]),
    new DatabaseAdapter(
        new Sequelize(process.env.DB_NAME, process.env.PG_USER, process.env.PG_PASS, {
            dialect: "postgres",
            host: process.env.PG_HOST || "localhost",
            port: process.env.PG_PORT || 5432,
            logging: false,
            query: { raw: true, nest: true },
            sync: { alter: true }
        })
    ).registerModels([...AuthModels]),
    new Routing(GLOBAL_PREFIX, [{ router: AuthRouter, prefix: "/auth" }]),
    new PassportModule([{ name: "jwt", strategy: PassportJwt() }]),
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
