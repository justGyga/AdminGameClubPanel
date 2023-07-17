/* eslint-disable import/no-mutable-exports */
import amqp from "amqplib";
import { BaseModule } from "./server.js";

export let QueueChannel = null;

export default class QueueModule extends BaseModule {
    #connectionString;
    #connection;
    #channel;
    #queues = [];
    #listeners = [];

    constructor({ host = "localhost", login, password, port = 5672 }) {
        super();
        this.#connectionString = `amqp://${login}:${password}@${host}:${port}`;
        this.#connection = null;
        this.#channel = null;
    }

    registryListeners(listeners = []) {
        this.#listeners = listeners;
        return this;
    }

    registryQueues(queues = []) {
        this.#queues = queues;
        return this;
    }

    async beforeHandler(_) {
        try {
            this.#connection = await amqp.connect(this.#connectionString);
            this.#channel = await this.#connection.createChannel();
            console.log("Connection to queue service is established");
        } catch (ex) {
            console.error("Queue service connection failed");
            console.log(ex.message);
            process.exit(1);
        }
    }

    async handler(_) {
        QueueChannel = this.#channel;
    }

    async afterHandler(_) {
        this.#queues.forEach((q) => this.#channel.assertQueue(q));
        this.#listeners.forEach((listener) => listener());
    }
}
