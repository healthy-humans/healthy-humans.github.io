<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    import { NutritionValues } from '../lib/database';
    import { database } from '../lib/database';

    export let name: string = 'Goal';
    export let nutrition: NutritionValues | null = null;

    const dispatch = createEventDispatcher();

    async function consumeFoodItem(): Promise<void> {

        const current: NutritionValues = (await database.nutritionValues.get(2))!;

        let updatedCurrent: NutritionValues = new NutritionValues(
            current.carbohydrate + nutrition!.carbohydrate,
            current.cholesterol + nutrition!.cholesterol, current.fat + nutrition!.fat,
            current.protein + nutrition!.protein, current.sodium + nutrition!.sodium
        )

        updatedCurrent.id = 2;

        database.nutritionValues.put(updatedCurrent);

        dispatch('goal');

    }

    async function removeFoodItem(): Promise<void> {

        await database.foodItems.delete(name);

        dispatch('items');

    }

    database;

</script>

<div class="hover food_item" class:center="{nutrition === null}">

    <h1>{name}</h1>

    {#if nutrition === null}
        {#await database.nutritionValues.get(1) then goal}
            {#await database.nutritionValues.get(2) then progress}
                {#if goal != undefined && progress != undefined}
                    <div
                        class="goal-item"
                        class:completed="{progress.carbohydrate >= goal.carbohydrate}"
                    >
                        <p>Carbohydrate: {progress.carbohydrate}g / {goal.carbohydrate}g</p>
                        <p>{progress.carbohydrate >= goal.carbohydrate ? '✓' : '✕'}</p>
                    </div>
                    <div
                        class="goal-item"
                        class:completed="{progress.cholesterol >= goal.cholesterol}"
                    >
                        <p>Cholesterol: {progress.cholesterol}mg / {goal.cholesterol}mg</p>
                        <p>{progress?.cholesterol >= goal?.cholesterol ? '✓' : '✕'}</p>
                    </div>
                    <div
                        class="goal-item"
                        class:completed="{progress.fat >= goal.fat}"
                    >
                        <p>Fat: {progress.fat}g / {goal.fat}g</p>
                        <p>{progress.fat >= goal.fat ? '✓' : '✕'}</p>
                    </div>
                    <div
                        class="goal-item"
                        class:completed="{progress.protein >= goal.protein}"
                    >
                        <p>Protein: {progress.protein}g / {goal.protein}g</p>
                        <p>{progress.protein >= goal.protein ? '✓' : '✕'}</p>
                    </div>
                    <div
                        class="goal-item"
                        class:completed="{progress.sodium >= goal.sodium}"
                    >
                        <p>Sodium: {progress.sodium}mg / {goal.sodium}mg</p>
                        <p>{progress.sodium >= goal.sodium ? '✓' : '✕'}</p>
                    </div>
                {/if}
            {/await}
        {/await}
    {:else}
        <p>Carbohydrate: {nutrition?.carbohydrate}g</p>
        <p>Cholesterol: {nutrition?.cholesterol}mg</p>
        <p>Fat: {nutrition?.fat}g</p>
        <p>Protein: {nutrition?.protein}g</p>
        <p>Sodium: {nutrition?.sodium}mg</p>
        <div class="food_item-buttons">
            <button class="button-add" on:click="{consumeFoodItem}">Consume</button>
            <button class="button-remove" on:click="{removeFoodItem}">Remove</button>
        </div>
    {/if}

</div>

<style>

    h1 {

        margin-bottom: 12px;

    }

    button {

        border-radius: 12px;

        padding: 10px 14px;

    }

    button:hover {

        filter: brightness(80%);

    }

    .button-add {

        background-color: var(--color-accent);

    }

    .button-remove {

        background-color: var(--color-secondary);

    }

    .center {

        margin: 0 auto;

    }

    .completed p {

        color: #44dd44 !important;

    }

    .food_item {

        background-color: var(--color-neutral);

        border-radius: 10px;

        display: block;

        padding: 24px;

        text-align: center;

        width: 400px;

    }

    .food_item-buttons {

        display: flex;

        justify-content: space-between;

        margin-top: 12px;

    }

    .goal-item {

        display: flex;

        justify-content: space-between;

        margin: 0 24px;

    }

    .goal-item p {

        color: #dd4444;

    }

</style>
