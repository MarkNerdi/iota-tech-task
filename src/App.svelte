<Route path="/*">
    <!-- <AddressList /> -->
</Route>

{#if !$isOnline}
    <div id="offline-banner" class="flex-center">You're offline. Please connect to the internet</div>
{/if}

<script>
    import {isOnline} from "@/store/app";
    import AddressList from "@/views/AddressList.svelte";
    import {Route} from "tinro";

    window.addEventListener("online", () => ($isOnline = true));
    window.addEventListener("offline", () => ($isOnline = false));
</script>

<style lang="scss" global>
    @import "styles/variables";
    @import "styles/global";
    @import "styles/ui";
    @import "styles/utils";
    @import "styles/attractions";

    #offline-banner {
        width: 100%;
        height: 25px;
        background-color: $errorRed;
        color: white;
        font-weight: 500;
        font-size: 0.8rem;
        flex-shrink: 0;
        z-index: 4000;

        @include mobile {
            height: 25px;
            font-size: 0.8rem;
        }
    }
</style>
