<div class="dialog-background flex-center" on:click|self={onClose} transition:fade={{duration: 100}}>
    <div class="dialog flex-column {$$props.class}">
        {#if title || errors?.length}
            <div class="dialog-header">
                <div class="header-title">{title}</div>
                {#if errors?.length}
                    <ErrorBox {errors} />
                {/if}
            </div>
        {/if}
        <div class="dialog-body">
            {#if loading}
                <LoadingSpinner />
            {:else}
                <slot />
            {/if}
        </div>
        {#if $$slots.footer}
            <div class="dialog-footer">
                <slot name="footer" />
            </div>
        {/if}
    </div>
</div>

<script lang="ts">
    import {ErrorBox, LoadingSpinner} from "@/components";
    import {fade} from "svelte/transition";

    export let title = "";
    export let errors = [];
    export let loading = false;
    export let onClose;
</script>

<style lang="scss">
    $padding: 15px;

    .dialog-background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 900;
        background-color: rgba(0, 0, 0, 0.3);
    }

    @include mobile {
        :global(.pane .dialog) {
            width: unset !important;
            max-width: unset !important;
            height: unset !important;
            max-height: unset !important;
            box-shadow: unset !important;
        }
    }

    .dialog {
        width: calc(100% - 60px);
        max-width: 500px;
        max-height: calc(100% - 60px);
        background-color: white;
        border-radius: 10px;
        box-shadow: $boxShadow;
        color: $textColor;
        z-index: 951;
        cursor: initial;
        line-height: 1.4rem;

        .dialog-header {
            padding: 24px $padding;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            .header-title {
                font-size: 1.7rem;

                @include mobile {
                    font-size: 1.4rem;
                }
            }

            :global(.header-title + .error-box) {
                margin-top: 15px;
            }
        }

        :global(.loading-spinner-container) {
            height: 75px;
        }

        .dialog-body {
            padding: $padding;
        }

        .dialog-footer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            padding: $padding;
            flex-shrink: 0;
        }
    }
</style>
