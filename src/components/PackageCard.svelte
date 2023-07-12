<script>
    export let pack;
</script>

<a href={pack.publish_url}>
    <div id="card" class="card-compact rounded-lg bg-base-300 shadow-xl m-2 p-2">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <div class="w-full inline-flex justify-between">
            <div>
                <h2>{pack.app_lang.name.toUpperCase()}</h2>
                <h3>
                    Region: {pack.app_lang.region
                        .substring(0, 1)
                        .toUpperCase()}{pack.app_lang.region.substring(1)}
                </h3>
                <h3>Language Code: {pack.app_lang.iso639_3}</h3>
            </div>
            <figure>
                <img class="mask mask-squircle" src={pack.img} alt="App Image" width="128" />
            </figure>
        </div>
        <div class="divider m-2" />
        <ul>
            <h3 class="overflow-auto">Alternate Names: {pack.app_lang.names}</h3>
            <h3>
                The {pack.app_lang.name.substring(0, 1).toUpperCase()}{pack.app_lang.name.substring(
                    1
                )} App package is
                {Math.floor(pack.size / 1000)} MB.
            </h3>
        </ul>
    </div>
</a>

<style>
    #card {
        display: flex;
        flex-direction: column;
        min-width: 80%;
        max-width: 90%;
    }

    h2 {
        font-family: 'Arial Narrow Bold', sans-serif;
        font-weight: 700;
        color: white;
    }

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        color: rgb(200, 200, 200);
    }
</style>
