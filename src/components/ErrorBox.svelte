{#if errors.length > 0}
    <div class="error-box flex-row {$$props.class}" class:bigMargin>
        <div class="error-icon icon flex-center">error_outline</div>
        <div class="flex-center flex-column flex-top">
            {#each errors as error}
                <div class="error-text flex-center">{error}</div>
            {/each}
        </div>
    </div>
{/if}

<script>
    export let errors;
    export let bigMargin = false;
</script>

<style lang="scss">
    .error-box {
        width: 100%;
        padding: 5px;
        color: darkred;
        background-color: #ffd7d7;
        border-radius: 5px;
        border: 1px solid darkred;

        &.bigMargin {
            width: calc(100% - 200px);
            margin: 20px 100px;
        }

        .error-icon {
            font-size: 18px;
            margin-right: 5px;
            color: darkred;
        }

        .error-text {
            min-height: 16px;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
    }
</style>
