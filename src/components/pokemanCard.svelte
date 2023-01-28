<script>
    export let pack;
</script>

<div class="card">
    
    <ul>
        <h2>{pack.name.toUpperCase()}</h2>
        <h3>Region: {pack.country.substring(0,1).toUpperCase()}{pack.country.substring(1)}</h3>
        <h3>Alternate Names: {pack.altNames}</h3>
        <h3>Language Code (ISO-693 3): {pack.code}</h3>
        <h3>The {pack.name.substring(0, 1).toUpperCase()}{pack.name.substring(1)} App package is {pack.size / 1000} MB.</h3>
    </ul>

</div>

<style>
    .card {
        padding: 2px;
        display: flex;
        overflow: hidden;
        margin-top: 4px;
        height: auto;
        background-color: rgba(100, 100, 100, .8);
        border-radius: 12px;
    }

    h2 {
        font-family: 'Arial Narrow Bold', sans-serif;
        font-weight: 700;
        color: white;
    }

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        color:rgb(200, 200, 200);
    }
</style>
