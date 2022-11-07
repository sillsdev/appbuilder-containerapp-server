<script>
    /**
     * @type {{ listing: Array<String>;
     *          image_url: String; 
     *          regionname: String; 
     *          projectName: String;
     *          }}
     */
     export let langPackage;
</script>

<div class="card card-side bg-base-100 shadow-xl">
    <figure><img src = "" alt={langPackage.regionname}></figure>
    <div class = "card-body">
        <h2 class = "card-title"> {langPackage.projectName}</h2>
        <p>{ langPackage.projectName }</p>
    </div>
</div>