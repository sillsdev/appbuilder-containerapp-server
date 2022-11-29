<script>
    import { pokemon } from '../stores/pokestore';
    import PokemanCard from '../components/pokemanCard.svelte';
    import { redirect } from '@sveltejs/kit';

    let searchTerm = '';

    /**
     * @type {any[]}
     **/

    let filtered = [];

    $: {
        if (searchTerm) {
            filtered = $pokemon.filter((pokeman) =>
                pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            filtered = [];
        }
    }
</script>

<head>
    <title> Welcome to Scripture App Builder </title>
</head>

<section id="main">
    <div class="title">Welcome to Scripture App Builder</div>

    <div class="search">
        <input type="text" placeholder="Enter a language" bind:value={searchTerm} />
    </div>
    <div class="search2">
        <input type="text" placeholder="Enter a Country" />
    </div>

    <div class="search3">
        <input type="text" placeholder="Enter a language" />
    </div>

    <div class="button">
        <a href="https://google.com" class="btn btn-outline">About Us</a>
    </div>

    <div class="dropdown">
        <span>English</span>
        <div class="dropdown-content">
            <p>Spanish</p>
            <p>Spanish</p>
            <p>Spanish</p>
        </div>
    </div>

    <div class="pokelist">
        {#each filtered as pokeman}
            <PokemanCard {pokeman} />
        {/each}
    </div>
</section>

<style>
    .dropdown {
        position: absolute;
        display: inline-block;
        left: 75%;
        top: 87%;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .button {
        position: absolute;
        top: 87%;
        left: 25%;
    }
    #main {
        width: 100%;
        height: 1000px;
        display: flex;
        flex-direction: column;
        padding: 12px;
        align-items: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url('./images/scripture.jpeg');
        background-size: auto;
    }

    .pokelist {
        justify-content: center;
        min-width: 50%;
        max-width: 70%;
        margin: auto;
        color: aqua;
        position: absolute;
    }

    .title {
        text-align: center;
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        padding: 6px;
    }

    .search {
        display: flex;
        width: 100%;
        align-items: center;
        position: absolute;
        top: 20%;
    }
    .search2 {
        display: flex;
        width: 100%;
        align-items: center;
        position: absolute;
        top: 28%;
    }
    .search3 {
        display: flex;
        width: 100%;
        align-items: center;
        position: absolute;
        top: 36%;
    }

    input {
        border-radius: 16px;
        min-width: 50%;
        max-width: 70%;
        margin: auto;
        padding: 1%;
        text-align: center;
    }
</style>
