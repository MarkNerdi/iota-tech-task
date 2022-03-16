<div class="loading-spinner-container flex-center {$$props.class}">
    <div class="loading-spinner {color}" style="width: {size}px; height: {size}px; borderWidth: {borderWidth}px" />
</div>

<script lang="ts">
    // "primary", "white", "dark"
    export let color = "primary";
    export let size = 30;
    export let borderWidth = 2;
</script>

<style lang="scss">
    .loading-spinner-container {
        width: 100%;

        .loading-spinner {
            border: 2px solid white;
            border-radius: 50%;
            margin: 0 10px;
            /*come on */
            border-top-color: transparent !important;
            animation: spin 1s ease-in-out infinite;
            -webkit-animation: spin 1s ease-in-out infinite;

            &.primary {
                border-color: $primary;
            }

            &.dark {
                border-color: $textColor;
            }

            &.white {
                border-color: white;
            }
        }
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
