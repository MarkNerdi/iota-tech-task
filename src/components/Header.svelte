<header class="first-row flex-row flex-space">
    <div class="title flex-center" class:pl4={hideLeftIcon}>{title}</div>
    <div class="flex-row flex-center right-slot">
        <slot />
    </div>
</header>

<script lang="ts">
    import {meta, router} from "tinro";

    export let title;
    export let hideLeftIcon = false;

    const route = meta();
</script>

<style lang="scss">
    header {
        width: 100%;
        flex-shrink: 0;
        padding: 10px;
        border-bottom: $border;
        z-index: 700;
        background-color: $primary;
        color: white;
        height: 60px;

        .title {
            font-size: 30px;
            padding-left: 10px;

            @include mobile {
                padding-left: 0;
                font-size: 1.4rem;
            }
        }

        .right-slot {
            :global(.button) {
                margin-top: 0;
                margin-bottom: 0;
            }

            @include mobile {
                padding-right: 10px;
            }
        }

        @include mobile {
            box-shadow: $boxShadowLight;
        }
    }
</style>
