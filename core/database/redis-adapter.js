/* eslint-disable import/no-mutable-exports */
import { createClient } from "redis";
import { BaseModule } from "../server.js";

export let Redis = null;

export default class RedisAdapter extends BaseModule {
    constructor({ host, password = "default", login = "default", port = 6379 }) {
        super();
        this.client = createClient({ url: `redis://${login}:${password}@${host}:${port}` });
    }

    async handler(_) {
        try {
            await this.client.connect();
            Redis = this.client;
            console.log("Connection to Redis-DB is established");
        } catch (e) {
            console.log(e);
            console.error("Unable connect to redis");
            process.exit(1);
        }
    }
}
