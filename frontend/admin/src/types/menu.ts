export interface IFormEditProps {
    setIsEdit: (value: boolean) => void;
    m_id: string;
}
export interface IIngredients {
    name?: string;
    item_id?: string;
    quantity_required?: number;
    ingredient_id: {
        ingredient_id: string;
        name: string;
    };
}

export interface INutrition {
    nutritional_info_id: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}

export interface IMenu {
    title: string;
    price: string;
    category?: string;
    description: string;
    image: string;
}

export interface IFoodDetail {
    food: IMenu;
    nutrition: INutrition;
    ingredients: IIngredients[];
}
