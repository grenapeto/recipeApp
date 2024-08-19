export interface Recipe {
    foodId: string;
    label: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    totalTime: number;
    uri: string;

    ingredientLines: string[];
    totalNutrients: { [key: string]: Nutrient };
  }

  export interface Nutrient {
    label: string;
    quantity: number;
    unit: string;
  }
  