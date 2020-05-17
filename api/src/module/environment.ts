import path from "path";
import fs from "fs";

/**
 * This class load and store all environment variables for the backend.
 *
 * @author Julian Segeth
 */
export class Environment {
    /** ALL DATABASE VARIABLES. */
    /** The database host. */
    public static readonly DATABASE_HOST = process.env.DATABASE_HOST;

    /** The database port. */
    public static readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

    /** The database user. */
    public static readonly DATABASE_USER = process.env.DATABASE_USER;

    /** The database name. */
    public static readonly DATABASE_NAME = process.env.DATABASE_NAME;

    /** ALL BACKEND VARIABLES. */
    /** The backend port. */
    public static readonly BACKEND_PORT = Number(process.env.BACKEND_PORT);

    /** ALL KEYS. */
    /** The database key to connect to the mysql database. */
    public static DATABASE_KEY = "";

    /** The nutritionix api key to connect to the nutritionix api. */
    public static NUTRITIONIX_API_KEY = "";

    /** The nutritionix id key to connect to the nutritionix api. */
    public static NUTRITIONIX_ID_KEY = "";

    /** The spoonacular api key to connect to the spoonacular api. */
    public static SPOONACULAR_API_KEY = "";

    /** ALL KEY FILES. */
    /** The name of the database key file. */
    private static DATABASE_KEY_FILE = process.env.DATABASE_KEY_FILE || "";

    /** The name of the nutritionix api key file. */
    private static NUTRITIONIX_API_KEY_FILE =
        process.env.NUTRITIONIX_API_KEY_FILE || "";

    /** The name of the nutritionix id key file. */
    private static NUTRITIONIX_ID_KEY_FILE =
        process.env.NUTRITIONIX_ID_KEY_FILE || "";

    /** The name of the spoonacular api key file. */
    private static SPOONACULAR_API_KEY_FILE =
        process.env.SPOONACULAR_API_KEY_FILE || "";

    /** The secret container path where the key files are stored. */
    private static readonly SECRET_CONTAINER_PATH =
        process.env.SECRET_CONTAINER_PATH || "";

    /**
     * Read all docker secrets from the files
     * and initalize the environment variables.
     */
    public static readSecretsFromFiles(): void {
        Environment.DATABASE_KEY = Environment.readSecretFromFile(
            Environment.DATABASE_KEY_FILE
        );

        Environment.NUTRITIONIX_API_KEY = Environment.readSecretFromFile(
            Environment.NUTRITIONIX_API_KEY_FILE
        );

        Environment.NUTRITIONIX_ID_KEY = Environment.readSecretFromFile(
            Environment.NUTRITIONIX_ID_KEY_FILE
        );

        Environment.SPOONACULAR_API_KEY = Environment.readSecretFromFile(
            Environment.SPOONACULAR_API_KEY_FILE
        );
    }

    /**
     *
     * Read a docker secret from a given file and return it.
     *
     * @param filename The filename of the docker secret.
     */
    private static readSecretFromFile(filename: string): string {
        try {
            const secretPath = path.join(
                Environment.SECRET_CONTAINER_PATH,
                filename
            );

            return String(fs.readFileSync(secretPath, { encoding: "utf-8" }));
        } catch (error) {
            console.error("Error while reading docker secret:", error);
            return "";
        }
    }
}
