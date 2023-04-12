<script>
    import { _ } from 'svelte-i18n';
    import Icon from '@iconify/svelte';
    import { packages } from '../stores/packstore';
    import PackageCard from '../components/PackageCard.svelte';
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

<head> {$_('page.home.title')} </head>

<section id="header">
    <div class="btn btn-ghost m-1 p-2">
        <a href="https://software.sil.org/scriptureappbuilder/">
            <Icon icon="ph:info-bold" color="white" width="32" />
        </a>
    </div>

    <div class="title">{$_('page.home.title')}</div>

    <div id="language_selector">
        <LanguageSelector />
    </div>
</section>

<section id="main">
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
    #header {
        display: flex;
    }

    a {
        color: white;
    }

    #main {
        width: 100%;
        height: 1000px;
        display: flex;
        align-items: center;
        flex-direction: column;
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

    .search-box {
        display: flex;
        flex-direction: column;
        -ms-flex-align: center;
        width: 100%;
        margin-top: 5%;
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
