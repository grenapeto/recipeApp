

export interface Recipe {
    foodId: string;
    label: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    totalTime: number;
    uri: string;
    // Add any other properties that a recipe might have
  }