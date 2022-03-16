<div id="toast" on:click={hideToast} class={$toast.mode} class:toast-is-visible={toastIsActive}>{$toast.text}</div>

<script lang="ts">
    import {hideToast, toast} from "@/store/ui";

    $: toastIsActive = $toast.mode?.length > 0;
    $: if (toastIsActive) {
        setTimeout(hideToast, 5000);
    }
</script>

<style lang="scss">
    #toast {
        width: 325px;
        position: fixed;
        top: -150px;
        right: 0;
        left: 0;
        margin-right: auto;
        margin-left: auto;
        padding: 15px;
        color: white;
        font-weight: 500;
        cursor: pointer;
        z-index: 10000;
        word-break: break-word;
        transition: 0.5s;
        border-radius: 3px;

        @include mobile {
            width: 100%;
            top: unset !important;
            bottom: -150px;
            border-radius: 0;
        }

        &.toast-is-visible {
            top: 20px !important;
            transition: 0.5s;

            @include mobile {
                top: unset !important;
                bottom: 0;
            }
        }

        &.info {
            background-color: #dddddd;
            color: $textColor;
        }

        &.ok {
            background-color: $green;
        }

        &.error {
            background-color: $errorRed;
        }
    }
</style>
