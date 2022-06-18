<script lang="ts">

    export let id_: string = (Math.random() + 1).toString(36).substring(3);

</script>

<div id="{id_}" on:click|stopPropagation="{() => {}}">

    <slot></slot>

</div>

<style>

    div {

        background-color: var(--color-neutral);

        border-radius: 20px;

        display: none;

        left: 50vw;

        padding: 46px 72px;

        position: fixed;

        text-align: center;

        top: 50vh;

        transform: translate(-50%, -50%);

        z-index: 3;

    }

</style>
