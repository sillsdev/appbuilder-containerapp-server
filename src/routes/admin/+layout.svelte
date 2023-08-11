<script>
    import { HamburgerIcon, LogoutIcon, SettingsIcon } from '$lib/icons';
    import { goHome } from '$lib/data/NavigationFunctions';
    import { logOut } from '$lib/data/AuthFunctions';
    import { currPage, currUser, updatePage, incomingPackages } from '$lib/stores';
</script>

<div class="navbar bg-base-300">
    <div class="navbar-start">
        <label
            for="primary-content-drawer"
            class="btn btn-ghost btn-circle btn-sm drawer-button lg:hidden"
        >
            <HamburgerIcon color="hsl(var(--bc))" />
        </label>
        <li class="btn btn-ghost rounded-lg normal-case text-xl">
            <button on:click={() => goHome()}>Administrator Panel</button>
        </li>
    </div>

    <div class="navbar-end mr-4">
        <details class="dropdown dropdown-end">
            <summary tabIndex="0" class="btn btn-ghost btn-md rounded-lg normal-case text-xl">
                {#if !$currUser.userInitials}
                    <span class="loading loading-spinner loading-md" />
                {:else}
                    {$currUser.userInitials}
                {/if}
            </summary>
            <ul
                class="menu dropdown-content z-[1] bg-base-200 mt-2 p-0 rounded-b-xl justify-center align-middle"
            >
                <li>
                    <a
                        data-tip="Settings"
                        class="btn btn-md btn-ghost tooltip tooltip-left"
                        href="/admin/settings/{$currUser.uid}"><SettingsIcon /></a
                    >
                </li>
                <li>
                    <a
                        data-tip="Log out"
                        class="btn btn-md btn-ghost tooltip tooltip-left rounded-b-xl"
                        on:click={() => logOut()}
                        href="/#"><LogoutIcon color="red" /></a
                    >
                </li>
            </ul>
        </details>
    </div>
</div>

<div class="drawer lg:drawer-open">
    <input id="primary-content-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-row items-start justify-start">
        <slot />
    </div>

    <div class="drawer-side">
        <label for="primary-content-drawer" class="drawer-overlay" />
        <ul
            class="menu mt-16 lg:mt-0 rounded-r-xl p-4 w-3/4 lg:w-64 bg-base-100 text-base-content h-full"
        >
            <!-- <li>
                <button on:click={() => updatePage('Dashboard')}>
                    {#if $currPage === 'Dashboard'}
                        <span class="loading loading-ring loading-xs text-secondary" />
                    {/if}
                    Dashboard
                </button>
            </li> -->
            <li>
                <button on:click={() => updatePage('Active Packages')}>
                    {#if $currPage === 'Active Packages'}
                        <span class="loading loading-ring loading-xs text-secondary" />
                    {/if}
                    Active Packages
                </button>
            </li>
            <li>
                <button on:click={() => updatePage('Incoming Packages')}>
                    {#if $currPage === 'Incoming Packages'}
                        <span class="loading loading-ring loading-xs text-secondary" />
                    {/if}
                    Incoming Packages
                    <span class="badge badge-outline rounded-full badge-accent"
                        >{$incomingPackages.length}</span
                    >
                </button>
            </li>
            {#if $currUser.isAdmin}
                <li>
                    <button on:click={() => updatePage('Users')}>
                        {#if $currPage === 'Users'}
                            <span class="loading loading-ring loading-xs text-secondary" />
                        {/if}
                        Users
                    </button>
                </li>
                <li>
                    <button on:click={() => updatePage('API Keys')}>
                        {#if $currPage === 'API Keys'}
                            <span class="loading loading-ring loading-xs text-secondary" />
                        {/if}
                        API Keys
                    </button>
                </li>
                <li>
                    <button on:click={() => updatePage('Interface Preferences')}>
                        {#if $currPage === 'Interface Preferences'}
                            <span class="loading loading-ring loading-xs text-secondary" />
                        {/if}
                        Interface Preferences
                    </button>
                </li>
            {/if}
        </ul>
    </div>
</div>
