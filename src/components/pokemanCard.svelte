<script>
    /**
	 * @type {{ image: any; name: string; id: any; }}
	 */
     export let pokeman;
</script>

<div class="card">
    <div>
        <img src={pokeman.image} alt={pokeman.name}>
    </div>
    <ul>
        <h2>{pokeman.name.toUpperCase()}</h2>
        <h3>{pokeman.name.substring(0, 1).toUpperCase()}{pokeman.name.substring(1)} is number {pokeman.id} on the index list.</h3>
    </ul>
</div>

<style>
    .card {
        padding: 8px;
        margin-top: 4px;
        height: auto;
        background-color: rgb(150, 150, 150);
        border-radius: 12px;
        display: flex;
    }

    img {
        min-height: 24px;
        justify-content: center;
    }

    h2 {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-weight: 300;
    }

    h3 {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>