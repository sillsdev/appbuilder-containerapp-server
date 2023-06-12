<script>
    export let data;
    const { pack } = data;
</script>

<img class="package-image" src={`${pack.image.baseurl}/${pack.image.files[0].src}`} alt="Package Image"/>
<h1> {pack.app_lang.name} </h1>
<h2> {pack.app_lang.regionname} </h2>

<h2> {pack.listing[0].full_description} </h2>
