import { Environment } from "./environment";
import { Connection, createConnection } from "typeorm";

/**
 * This class manages the access to the mysql database.
 */
export class Database {
    /**
     * Creates a connection to the database.
     */
    public static async connect(): Promise<Connection> {
        return await createConnection({
            type: "mysql",

            host: Environment.DATABASE_HOST,
            port: Environment.DATABASE_PORT,

            username: Environment.DATABASE_USER,
            password: String(Environment.DATABASE_KEY),
            database: Environment.DATABASE_NAME,

            entities: [__dirname + "/../entity/*.js"],
            synchronize: true,
            logging: false,
        });
    }
}
