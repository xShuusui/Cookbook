import { Environment } from "../module/environment";
import fetch from "node-fetch";

/** A new type for spoonacular returns. */
type SpoonacularResponse = { joke: string };

/**
 * This class connects to an external api.
 */
export class Spoonacular {
    /**
     * Get a random food joke from an external api.
     */
    public static async getJoke(): Promise<SpoonacularResponse> {
        const response = await fetch(
            "https://api.spoonacular.com/food/jokes/random?apiKey=" +
                Environment.SPOONACULAR_API_KEY,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return { joke: data.text };
        } else {
            throw new Error(
                String(
                    "External API: " +
                        response.status +
                        ": " +
                        response.statusText
                )
            );
        }
    }
}
