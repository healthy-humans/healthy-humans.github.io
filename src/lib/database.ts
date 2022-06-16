import Dexie from 'dexie';
import type { Table } from 'dexie';

export class NutritionValues {

    id!: number;
    carbohydrate: number;
    cholesterol: number;
    fat: number;
    protein: number;
    sodium: number;

    constructor(
        carbohydrate: number, cholesterol: number, fat: number, protein: number, sodium: number
    ) {

        this.carbohydrate = carbohydrate;
        this.cholesterol = cholesterol;
        this.fat = fat;
        this.protein = protein;
        this.sodium = sodium;

    }

}

export class FoodItem {

    name: string;
    nutrition: NutritionValues;

    constructor(name: string, nutrition: NutritionValues) {

        this.name = name;
        this.nutrition = nutrition;

    }

}

class DatabaseSchema extends Dexie {

    foodItems!: Table<FoodItem, string>;
    nutritionValues!: Table<NutritionValues, number>;

    constructor(databaseName: string) {

        super(databaseName);

        this.version(1).stores({ foodItems: 'name', nutritionValues: '++id' });

    }

}

export const database: DatabaseSchema = new DatabaseSchema('main');
export const nutritionUnits: Object = {
    carbohydrate: 'g',
    cholesterol: 'mg',
    fat: 'g',
    protein: 'g',
    sodium: 'mg'
};

database.foodItems.mapToClass(FoodItem);
database.nutritionValues.mapToClass(NutritionValues);
