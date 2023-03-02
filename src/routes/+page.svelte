<script>
    import { packages } from '../stores/packstore';
    import PackageCard from '../components/PackageCard.svelte';
    import { _ } from 'svelte-i18n';
    import LanguageSelector from '../components/LanguageSelector.svelte';

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

    <div id="language_selector">
        <LanguageSelector />
    </div>

    <div class="button">
        <a href="https://google.com">{$_('page.home.about')}</a>
    </div>

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

    <div class="list">
        {#each filter as pack}
            <PackageCard {pack} />
        {/each}
    </div>
</section>

<style>
    #language_selector {
        position: absolute;
        top: 3%;
        left: 90%;
    }

    .search-box {
        display: flex;
        flex-direction: column;
        -ms-flex-align: center;
        width: 100%;
        margin-top: 5%;
    }
    a {
        color: white;
    }
    .button {
        color: white;
        position: absolute;
        top: 4%;
        left: 10%;
    }

    #main {
        width: 100%;
        height: 1000px;
        display: flex;
        flex-direction: column;
        background-position: center;
        background-size: cover;
        background-image: url('./images/scripture.jpeg');
    }

    .list {
        display: flex;
        flex-direction: column;
        position: static;
        margin-top: 1%;
        min-width: 85%;
        max-width: 90%;
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
