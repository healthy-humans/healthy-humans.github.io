<script lang="ts">

    import FoodItem from './components/FoodItem.svelte';
    import Overlay from './components/Overlay.svelte';
    import { FoodItem as FoodItemClass } from './lib/database';
    import { NutritionValues } from './lib/database';
    import { database } from './lib/database';

    let goalFlag: boolean = false;
    let itemsFlag: boolean = false;
    let overlayId: string = '';

    async function addItem(): Promise<void> {

        const elements: HTMLFormControlsCollection = (
            document.getElementById('overlay-add')!.children[2] as HTMLFormElement
        ).elements;
        const key: string = (elements.namedItem('name')! as HTMLInputElement).value;

        if (await database.foodItems.get(key) === undefined) {
            await database.foodItems.add(
                new FoodItemClass(
                    key,
                    new NutritionValues(
                        parseInt((elements.namedItem('carbohydrate')! as HTMLInputElement).value),
                        parseInt((elements.namedItem('cholesterol')! as HTMLInputElement).value),
                        parseInt((elements.namedItem('fat')! as HTMLInputElement).value),
                        parseInt((elements.namedItem('protein')! as HTMLInputElement).value),
                        parseInt((elements.namedItem('sodium')! as HTMLInputElement).value),
                    )
                )
            )
        }

        itemsFlag = !itemsFlag;

        (document.getElementById('overlay-add')!.children[2] as HTMLFormElement).reset();

        hide();

    }

    async function editGoal(): Promise<void> {

        const elements: HTMLFormControlsCollection = (
            document.getElementById('overlay-goal')!.children[2] as HTMLFormElement
        ).elements;
        const updatedGoal: NutritionValues = new NutritionValues(
            parseInt((elements.namedItem('carbohydrate')! as HTMLInputElement).value),
            parseInt((elements.namedItem('cholesterol')! as HTMLInputElement).value),
            parseInt((elements.namedItem('fat')! as HTMLInputElement).value),
            parseInt((elements.namedItem('protein')! as HTMLInputElement).value),
            parseInt((elements.namedItem('sodium')! as HTMLInputElement).value)
        );

        updatedGoal.id = 1;

        database.nutritionValues.put(updatedGoal);

        goalFlag = !goalFlag;

        (document.getElementById('overlay-goal')!.children[2] as HTMLFormElement).reset();

        hide();

    }

    function hide(): void {

        if (overlayId !== '') {
            document.getElementById('shadow')!.style.display = 'none';
            document.getElementById(overlayId)!.style.display = 'none';
        }

    }

    function reset(): void {

        const item: NutritionValues = new NutritionValues(0, 0, 0, 0, 0);

        item.id = 2;

        database.nutritionValues.put(item);

        goalFlag = !goalFlag;

    }

    function show(id: string): void {

        document.getElementById('shadow')!.style.display = 'block';
        document.getElementById(id)!.style.display = 'block';

        overlayId = id;

    }

    database.nutritionValues.count().then(
        (count: number): void => {
            if (!count) {
                database.nutritionValues.bulkAdd(
                    [
                        new NutritionValues(300, 300, 60, 150, 2e3),
                        new NutritionValues(0, 0, 0, 0, 0)
                    ]
                );
                goalFlag = !goalFlag;
            }
        }
    );

    document.body.addEventListener(
        'click', () => {
            hide();
        }
    );

    FoodItem;
    Overlay;

</script>

<Overlay id_="overlay-add">

    <h2>Add Item</h2>

    <br>

    <form>
        <input autocomplete="off" name="name" placeholder="Name" type="text">
        <br>
        <br>
        <input name="carbohydrate" placeholder="Carbohydrate (g)" type="number">
        <br>
        <br>
        <input name="cholesterol" placeholder="Cholesterol (mg)" type="number">
        <br>
        <br>
        <input name="fat" placeholder="Fat (g)" type="number">
        <br>
        <br>
        <input name="protein" placeholder="Protein (g)" type="number">
        <br>
        <br>
        <input name="sodium" placeholder="Sodium (mg)" type="number">
        <br>
        <br>
        <button on:click|preventDefault="{addItem}" type="submit">Add</button>
    </form>

</Overlay>

<Overlay id_="overlay-goal">

    <h2>Edit Goal</h2>

    <br>

    <form>
        <input name="carbohydrate" placeholder="Carbohydrate (g)" type="number">
        <br>
        <br>
        <input name="cholesterol" placeholder="Cholesterol (mg)" type="number">
        <br>
        <br>
        <input name="fat" placeholder="Fat (g)" type="number">
        <br>
        <br>
        <input name="protein" placeholder="Protein (g)" type="number">
        <br>
        <br>
        <input name="sodium" placeholder="Sodium (mg)" type="number">
        <br>
        <br>
        <button on:click|preventDefault="{editGoal}" type="submit">Edit</button>
    </form>

</Overlay>

<div id="shadow"></div>

<main>

    <br>
    <br>

    {#key goalFlag}
        <FoodItem/>
    {/key}

    <br>

    <button class="hover" on:click|stopPropagation="{() => show('overlay-add')}">Add Item</button>
    <button class="hover" on:click|stopPropagation="{() => show('overlay-goal')}">Edit Goal</button>
    <button class="hover" on:click|stopPropagation="{reset}">Reset</button>

    <br>
    <br>

    {#key itemsFlag}
        <div id="items">
            {#await database.foodItems.toArray() then foodItems}
                {#each foodItems as item}
                    <FoodItem
                        name="{item.name}" nutrition="{item.nutrition}"
                        on:goal="{() => {goalFlag = !goalFlag}}"
                        on:items="{() => itemsFlag = !itemsFlag}"
                    />
                {/each}
            {/await}
        </div>
    {/key}

</main>

<style>

    button {

        background-color: var(--color-primary);

        border-radius: 16px;

        padding: 14px 22px;

        margin: 0 4px;

    }

    input {

        border-radius: 12px;

        border-style: none;

        caret-color: var(--color-base);

        color: var(--color-base);

        padding: 10px 16px;

        text-align: center;

        width: 200px;

    }

    input:focus {

        outline-style: none;

    }

    input::placeholder {

        color: #aaaaaa;

        text-align: center;

    }

    main {

        text-align: center;

    }

    #items {

        display: grid;

        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;

        justify-items: center;

        margin: 0 320px;

        row-gap: 20px;

    }

    #shadow {

        background-color: rgba(0, 0, 0, 0.5);

        display: none;

        left: 0;

        height: 100vh;

        position: fixed;

        top: 0;

        width: 100vw;

        z-index: 2;

    }

</style>
