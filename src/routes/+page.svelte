<script>
    import {} from "../stores/fbstore";
    
    // Pokemon API practice data
	import { pokemon } from "../stores/pokestore";
	import PokemanCard from "../components/pokemanCard.svelte";

    let pokeSearchTerm = '';
    
    /**
	 * @type {any[]}
	**/

    let pokeFiltered = [];
    let langFiltered = [];

    $: {
        if( pokeSearchTerm ) {
            pokeFiltered = $pokemon.filter(pokeman => pokeman.name.toLowerCase().includes(pokeSearchTerm.toLowerCase()));
        } else {
            pokeFiltered = []
        }
    }

</script>

<head>
    <title> Welcome to Scripture App Builder </title>
</head>

<section id="main">

        <div class="title">
            Welcome to Scripture App Builder
        </div>

        <div class="search">
            <input type="text" placeholder="Enter a language" bind:value={pokeSearchTerm}>
        </div>
        <div class="pokelist">
            {#each pokeFiltered as pokeman}
                <PokemanCard pokeman={pokeman} />
            {/each}
        </div>

</section>



<style>

    #main {
        height: 600px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 12px;
        align-items: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .pokelist {
        justify-content: center;
        min-width: 50%;
        max-width: 70%;
        margin: auto;
    }

    .title {
        text-align: center;
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        color: black;
        padding: 6px;
    }

    .search {
        display: flex;
        width: 100%;
        align-items: center;
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