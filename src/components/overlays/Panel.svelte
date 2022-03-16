{#if !$isTabletScreen}
    <div class="panel scrollable flex-column" class:bottom>
        <slot />
    </div>
{:else}
    <BottomSheet {fitHeight} {onClose}>
        <slot />
    </BottomSheet>
{/if}

<script lang="ts">
    import {isTabletScreen} from "@/store/app";
    import BottomSheet from "./BottomSheet.svelte";

    export let bottom = false;
    export let fitHeight = true;
    export let onClose;
</script>

<style lang="scss">
    .panel {
        width: 300px;
        height: 100%;
        padding: 30px 15px 0;
        background-color: $backgroundColor;
        flex-shrink: 0;
        border-left: $border;
        transition: 0.2s;

        &.bottom {
            width: 100%;
            height: 300px;
            border-left: none;
            border-top: $border;
            padding: 15px;
        }
    }
</style>
