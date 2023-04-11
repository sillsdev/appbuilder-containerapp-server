<script>
    export let pack;
</script>

<a href={pack.permalink}>
    <div id="card" class="card-compact rounded-lg bg-base-100 shadow-xl m-2 p-2">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <div class="w-full inline-flex justify-between">
            <div>
                <h2>{pack.name.toUpperCase()}</h2>
                <h3>
                    Region: {pack.country.substring(0, 1).toUpperCase()}{pack.country.substring(1)}
                </h3>
                <h3>Language Code: {pack.code}</h3>
            </div>
            <figure>
                <img class="mask mask-squircle" src={pack.image} alt="App Image" width="128" />
            </figure>
        </div>
        <div class="divider m-2" />
        <ul>
            <h3 class="overflow-auto">Alternate Names: {pack.altNames}</h3>
            <h3>
                The {pack.name.substring(0, 1).toUpperCase()}{pack.name.substring(1)} App package is
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
