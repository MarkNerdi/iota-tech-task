<Route path="/*">
    <AddressList />
</Route>

{#if $confirmDialog.isActive}
    <ConfirmDialog />
{/if}

<Toast />

{#if !$isOnline}
    <div id="offline-banner" class="flex-center">You're offline. Please connect to the internet</div>
{/if}

<script lang="ts">
    import {isOnline, windowWidth} from "@/store/app";
    import AddressList from "@/views/AddressList.svelte";
    import {Route} from "tinro";
    import {addAddressToStorage, addAndSaveAddressToStorage, fetchAllBalances} from "./store/data";
    import {Address} from "./types";
    import {getLocalStorageItem} from "./utils/localStorage";
    import {confirmDialog} from "@/store/ui";
    import {ConfirmDialog, Toast} from "@/components";

    window.addEventListener("resize", () => ($windowWidth = window.innerWidth));
    window.addEventListener("online", () => ($isOnline = true));
    window.addEventListener("offline", () => ($isOnline = false));

    const dummyAddresses: Address[] = [
        {name: "Savings Wallet", address: "atoi1qzcaa58maak3rwmv9ztk5763xcjntltescw6q2407da23hexhp8sgkqelj9", balance: 0}, // b1ded0fbef6d11bb6c28976a7b51362535fd79861da02aaff37aa8df26b84f04
        {name: "Mamas Wallet", address: "atoi1qqzyk76sfh84cggtnwqf9va5h07ml4dywhqf8cjj8sgy3tchgn2uye6mlue", balance: 0}, // 044b7b504dcf5c210b9b8092b3b4bbfdbfd5a475c093e2523c1048af1744d5c2
        {name: "Wallet for daily purchases", address: "atoi1qrmay0fte4rtmwynwvg47zp0c0esdncxt5mn4673t2uceqk9vek4yecmk40", balance: 0} // f7d23d2bcd46bdb89373115f082fc3f306cf065d373aebd15ab98c82c5666d52
    ];
    const savedAddresses: Address[] = getLocalStorageItem("addresses", []);

    async function init() {
        // Insert demo data
        if (savedAddresses.length === 0) {
            for (const addr of dummyAddresses) {
                await addAndSaveAddressToStorage(addr);
            }
        } else {
            for (const addr of savedAddresses) {
                await addAddressToStorage(addr);
            }
        }
    }

    function polling() {
        fetchAllBalances();
        setTimeout(polling, 5000);
    }

    init();
    setTimeout(polling, 5000);
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
