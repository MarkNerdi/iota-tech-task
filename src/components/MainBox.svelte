<div class="main-box scrollable wh100" class:padding={!noPadding} on:scroll={onBoxScroll}>
    {#if $initialLoadingPaginator || initialLoading}
        <LoadingSpinner color="primary" class="wh100" size={50} />
    {:else if $emptyPaginator || empty}
        <div class="empty wh100 flex-center flex-column">
            <div class="icon empty-icon">{emptyIcon}</div>
            <div class="empty-text bold">{emptyTextKey}</div>
        </div>
    {:else}
        <slot />
    {/if}
    {#if $loadingMoreItemsPaginator || loadingMoreItems}
        <div class="loading-more-items">
            <LoadingSpinner size={30} color="primary" />
        </div>
    {/if}
</div>

<script>
    import {LoadingSpinner} from "@/components";

    export let paginator = null;
    export let initialLoading = false;
    export let loadingMoreItems = false;
    export let empty = false;
    export let emptyIcon = "";
    export let emptyTextKey = "";
    export let noPadding = false;
    export let onScroll = () => null;
    export let onScrollToBottom = () => null;

    const initialLoadingPaginator = paginator?.initialLoading;
    const emptyPaginator = paginator?.isEmpty;
    const loadingMoreItemsPaginator = paginator?.loadingMoreItems;

    const offset = 300;

    function onBoxScroll(event) {
        onScroll();
        if (event.target.scrollTop >= event.target.scrollHeight - event.target.clientHeight - offset) {
            onScrollToBottom();
        }
    }
</script>

<style lang="scss">
    .empty {
        min-height: 200px;
        font-size: 1.2rem;

        .empty-icon {
            font-size: 100px;
        }

        .empty-text {
            font-size: 1.1rem;
            text-align: center;
        }
    }

    .loading-more-items {
        width: 100%;
        height: 80px;
        position: relative;
        top: 25px;
    }
</style>
