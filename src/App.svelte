<Route path="/*">
    <AddressList />
</Route>

{#if !$isOnline}
    <div id="offline-banner" class="flex-center">You're offline. Please connect to the internet</div>
{/if}

<script lang="ts">
    import {isOnline} from "@/store/app";
    import AddressList from "@/views/AddressList.svelte";
    import {Route} from "tinro";
    import {addAddressToStorage, addresses} from "./store/data";
    import {getLocalStorageItem} from "./utils/localStorage";

    window.addEventListener("online", () => ($isOnline = true));
    window.addEventListener("offline", () => ($isOnline = false));

    $addresses = getLocalStorageItem("addresses", []);

    if ($addresses.length === 0) {
        addAddressToStorage({name: "Savings Wallet", address: "0x47D73BA5E0EfBeC51F1eAD27758016Bc0978Bbe4", balance: 300});
        addAddressToStorage({name: "Mamas Wallet", address: "0x5bF734D19458Ea382C6a0724E9EE0A3A1e8A3Dd0", balance: 300});
        addAddressToStorage({name: "Wallet for daily purchases", address: "0xd4916d592e3e385A6D14bDae77903Aae306f638b", balance: 300});
    }
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
