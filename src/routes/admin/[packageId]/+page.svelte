<script>
    import Icon from '@iconify/svelte';
    export let data;
    const { pack } = data;
</script>

<div class="flex flex-row  justify-items-stretch columns-2 items-center">

    <div class="btn btn-ghost m-1 p-2">
        <a href="/admin">
            <Icon icon="ion:caret-back" color="white" width="32"/>
        </a>
    </div>
    
    <div class="flex justify-center items-center h-12">
        <h1 class="text-center text-lg font-bold "> Package Description </h1>
    </div>
</div>

<div class="hero">
    <img class="rounded-xl" src={`${pack.image.baseurl}/${pack.image.files[0].src}`} alt="Package Image"/>
</div>

<div class="px-4 m-4 flex-auto">

    <div class="m-2">
        <h1 class="font-bold inline text-base"> Language Name : </h1>
        <h2 class="font-semibold inline text-lg"> {pack.app_lang.name} </h2>
        {#if pack.app_lang.names.length > 0}
            {#each pack.app_lang.names as lang }
                <h2 class="font-semibold inline text-lg">, {lang} </h2>
            {/each}
        {:else}

        {/if}
    </div>
    
    <div class="m-2">
        <h1 class="font-bold inline"> Region : </h1> 
        <h2 class="font-semibold inline text-lg"> {pack.app_lang.regionname} </h2>
    </div>

    <div class="m-2">
        <h1 class="font-bold inline"> Language Tag : </h1> 
        <h2 class="font-semibold inline text-lg uppercase"> {pack.app_lang.tag} </h2>
    </div>
    
    <div class="m-2">
        <h1 class="font-bold"> Description : </h1>
        <h2 class="font-semibold inline text-lg"> {pack.listing[0].full_description} </h2>
    </div>

    <div class="m-2">
        <h1 class="font-bold"> Package Size : </h1>
        <h2 class="font-semibold inline text-lg"> {pack.size} </h2>
    </div>
    
</div>

<style>
    img { 
        min-width: 50%;
    }
</style>