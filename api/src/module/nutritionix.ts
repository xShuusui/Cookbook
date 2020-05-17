import { Environment } from "../module/environment";
import fetch from "node-fetch";

/** A new type for nutritionix returns. */
type NutrionixResponse = { calories: number; fat: number };

/**
 * This class connects to an external api.
 */
export class Nutritionix {
    /**
     * Get ingredient data from an exernal api.
     *
     * @param ingredientData A string which includes ingredient name, amount and unit.
     */
    public static async getDataForIngredient(
        ingredientData: string
    ): Promise<NutrionixResponse> {
        const response = await fetch(
            "https://trackapi.nutritionix.com/v2/natural/nutrients",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": Environment.NUTRITIONIX_ID_KEY,
                    "x-app-key": Environment.NUTRITIONIX_API_KEY,
                },
                body: JSON.stringify({ query: ingredientData }),
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return {
                calories: data.foods[0].nf_calories,
                fat: data.foods[0].nf_total_fat,
            };
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
