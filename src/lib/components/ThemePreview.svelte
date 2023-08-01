<script>
    export let theme;
</script>

<div
    data-theme={theme}
    class="btn btn-sm bg-base-content btn-ghost rounded-full p-1 mt-1 align-middle items-center text-xs w-48 min-w-48 focus:bg-base-200 hover:animate-none active:animate-none text-base-200"
>
    <div class="flex flex-row align-middle w-full gap-2">
        <div class="flex flex-row w-1/2 justify-center">
            <h1>
                {theme}
            </h1>
        </div>
        <div class="flex flex-row w-1/2 justify-center gap-1">
            <div class="bg-primary rounded-lg w-2 h-4" />
            <div class="bg-secondary rounded-lg w-2 h-4" />
            <div class="bg-accent rounded-lg w-2 h-4" />
            <div class="bg-neutral rounded-lg w-2 h-4" />
        </div>
    </div>
</div>
