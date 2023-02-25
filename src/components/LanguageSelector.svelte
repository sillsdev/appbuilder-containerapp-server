<script>
    import Icon from "@iconify/svelte";
    import { _, locale, locales } from "svelte-i18n";

    function setLocale( lang ) {
        locale.set(lang);
        return;
    }

    function isActive( lang ) {
        if( lang === $locale.substring(0,2)){
            return "active"
        } else {
            return "inactive"
        }
    }

</script>
{#key $_('lang')}
    <div class="dropdown dropdown-end">
        <label for class="btn btn-ghost m-1 p-2" tabindex="-1">
            <Icon icon="material-symbols:language" color="white" width="32"/>
        </label>
        <div class="dropdown-content bg-base-200 w-48 rounded-md overflow-y-auto">
            <ul class="menu menu-compact gap-1 p-2" tabindex="-1">
                {#each $locales as locale}
                    <li>
                        <div class="btn flex {isActive(locale)}" tabindex="-1" on:click={ setLocale(locale) } on:keypress={ setLocale(locale) }>
                            <Icon icon="circle-flags:{locale}" color="white" width="24"/>
                            {locale}
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
{/key}