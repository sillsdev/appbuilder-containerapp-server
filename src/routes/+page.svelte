<script>
    import { packages } from '../stores/packstore';
    import PokemanCard from '../components/pokemanCard.svelte';
    import { _, locale, locales } from 'svelte-i18n';

    let searchName = '';
    let searchCountry = '';
    let searchCode = '';

    let filter = [];

    $: {
        // search by name

        if (searchName) {
            filter = $packages.filter((pack) =>
                pack.name
                    .substring(0, searchName.length)
                    .toLowerCase()
                    .includes(searchName.toLowerCase())
            );
        } else if (searchCountry) {
            filter = $packages.filter((pack) =>
                pack.country
                    .substring(0, searchCountry.length)
                    .toLowerCase()
                    .includes(searchCountry.toLowerCase())
            );
        } else if (searchCode) {
            filter = $packages.filter((pack) =>
                pack.code.toLowerCase().includes(searchCode.toLowerCase())
            );
        } else {
            filter = [];
        }
    }
</script>

<head> Scripture App Builder </head>

<section id="main">
    <div class="title">{$_('page.home.title')}</div>

    <div class="search-box">
        {#if !searchCountry && !searchCode}
            <div class="search">
                <input type="text" placeholder="Enter a language" bind:value={searchName} />
            </div>
        {/if}

        {#if !searchName && !searchCode}
            <div class="search2">
                <input type="text" placeholder="Enter a Country" bind:value={searchCountry} />
            </div>
        {/if}

        {#if !searchName && !searchCountry}
            <div class="search3">
                <input type="text" placeholder="Language Code (ISO639-3)" bind:value={searchCode} />
            </div>
        {/if}
    </div>

    <div class="pokelist">
        {#each filter as pack}
            <PokemanCard {pack} />
        {/each}
    </div>

    <div class="button">
        <a href="https://google.com" class="btn btn-outline">{$_('page.home.about')}</a>
    </div>

    <div class="dropdown">
        <select bind:value={$locale}>
            {#each $locales as locale}
                <option value={locale}>{locale}</option>
            {/each}
        </select>
    </div>
</section>

<style>
    .search-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 5%;
    }

    .dropdown {
        color: white;
        position: absolute;
        display: inline-block;
        left: 85%;
        top: 5%;
    }

    select {
        width: 96px;
    }

    a {
        color: white;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        left: -8px;
        background-color: #f9f9f975;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .button {
        color: white;
        position: absolute;
        top: 5%;
        left: 10%;
    }

    #main {
        width: 100%;
        height: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url('./images/scripture.jpeg');
        background-position: center;
        background-size: auto;
    }

    .pokelist {
        position: static;
        margin-top: 1%;
        justify-content: center;
        min-width: 60%;
        max-width: 70%;
    }

    .title {
        text-align: center;
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        margin: 8px;
        margin-top: 4%;
        padding: 6px;
    }

    .search {
        display: flex;
        width: 100%;
        align-items: center;
        position: static;
        margin: 4px;
    }

    .search2 {
        display: flex;
        width: 100%;
        align-items: center;
        position: static;
        margin: 4px;
    }

    .search3 {
        display: flex;
        width: 100%;
        align-items: center;
        position: static;
        margin: 4px;
    }

    input {
        border-radius: 16px;
        min-width: 60%;
        max-width: 80%;
        margin: auto;
        padding: 1%;
        text-align: center;
    }
</style>
