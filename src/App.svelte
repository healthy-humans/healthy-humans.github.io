<script lang="ts">

    let count: number = 0;

    function increment(): void {

        ++count;

    }

</script>

<main>

    <h1>Clicked {count} {count === 1 ? 'time' : 'times'}.</h1>

    <button on:click={increment}>Increase!</button>

</main>
