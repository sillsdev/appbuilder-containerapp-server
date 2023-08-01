<script>
    import { _ } from 'svelte-i18n';
    import { AboutIcon } from '$lib/icons';
    import { activePackages, interfacePref } from '$lib/stores';
    import PackageCard from '$lib/components/PackageCard.svelte';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';

    let searchName = '';
    let searchCountry = '';
    let searchCode = '';

    let filter = [];

    $: {
        // search by name
        if (searchName) {
            filter = $activePackages.filter((pack) =>
                pack.app_lang.name
                    .substring(0, searchName.length)
                    .toLowerCase()
                    .includes(searchName.toLowerCase())
            );
            // search by country
        } else if (searchCountry) {
            filter = $activePackages.filter((pack) =>
                pack.app_lang.region
                    .substring(0, searchCountry.length)
                    .toLowerCase()
                    .includes(searchCountry.toLowerCase())
            );
            // search by code
        } else if (searchCode) {
            filter = $activePackages.filter((pack) =>
                pack.app_lang.iso639_3.toLowerCase().includes(searchCode.toLowerCase())
            );
            // list is blank
        } else {
            filter = [];
        }
    }
</script>

<section id="header">
    <!-- ABOUT link to be set by admin -->
    <div class="btn btn-ghost m-2 p-2 rounded-xl items-middle justify-center flex-nowrap">
        <a href={$interfacePref.homeLink}>
            <AboutIcon color="hsl(var(--bc))" />
        </a>
    </div>

    <!-- TITLE to be set by admin -->
    <div class="title">{$_('page.home.title')}</div>

    <!-- Language Selector Component -->
    <div id="language_selector">
        <LanguageSelector />
    </div>
</section>

<section id="main" style="background-image: url({$interfacePref.homeImage});">
    <div class="search-box">
        {#if !searchCountry && !searchCode}
            <div class="search">
                <input
                    type="text"
                    placeholder={$_('page.home.searchLanguage')}
                    bind:value={searchName}
                />
            </div>
        {/if}

        {#if !searchName && !searchCode}
            <div class="search2">
                <input
                    type="text"
                    placeholder={$_('page.home.searchCountry')}
                    bind:value={searchCountry}
                />
            </div>
        {/if}

        {#if !searchName && !searchCountry}
            <div class="search3">
                <input
                    type="text"
                    placeholder={$_('page.home.searchCode')}
                    bind:value={searchCode}
                />
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
        justify-content: space-between;
    }

    #main {
        width: 100%;
        height: 1000px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
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
