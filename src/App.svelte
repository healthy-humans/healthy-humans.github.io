<script lang="ts">

    import FoodItem from './components/FoodItem.svelte';
    import { NutritionValues } from './lib/database';
    import { database } from './lib/database';

    database.nutritionValues.count().then(
        (count: number): void => {
            if (!count) {
                database.nutritionValues.add(new NutritionValues(300, 300, 60, 150, 2e3), 1);
            }
        }
    );

    FoodItem;

</script>

<FoodItem name='Brian Law'/>
<FoodItem name='Matthew Xia'/>
