<svelte:head>
    <title>Wallet List</title>
</svelte:head>

<div id="address-list" class="flex-column flex-center wh100">
    <Header title="Your IOTA Wallets" />
    <div class="list-container">
        {#each $addresses as address}
            <div class="list-item flex-row flex-space mb2" on:click={() => removeAddressFromStorage(address)}>
                <p class="name">{address.name}</p>
                <p class="address">{address.address}</p>
                <p class="balance">{address.balance}</p>
            </div>
        {:else}
            <div class="empty">No Addresses added</div>
        {/each}
    </div>
    <div class="floating-action-button flex-center" on:click={openAddNewAddressDialog}>
        <i class="icon">add</i>
    </div>
    <Route path="/address/">
        <!-- TODO: <AddressDetail />  -->
    </Route>
</div>

{#if newAddressDialogOpen}
    <Dialog title="New Address" class="confirm-dialog" onClose={() => (newAddressDialogOpen = false)}>
        <div class="dialog-body">
            <label for="name-input">Name</label>
            <input id="name-input" bind:value={newAddressObj.name} />
            <label for="address-input">Address</label>
            <input id="address-input" placeholder="0xABC..." bind:value={newAddressObj.address} />
        </div>
        <svelte:fragment slot="footer">
            <Button neutral on:click={() => (newAddressDialogOpen = false)}>Cancel</Button>
            <Button filled on:click={addNewAddress} class="ml2">Ok</Button>
        </svelte:fragment>
    </Dialog>
{/if}

<script lang="ts">
    import {Route} from "tinro";
    import {addAndSaveAddressToStorage, addresses, removeAddressFromStorage} from "@/store/data";
    import {Button} from "attractions";
    import {Header, Dialog} from "@/components";
    import {Address} from "@/types/Address";

    let newAddressObj: Address = {name: "", address: "", balance: 0};
    $: newAddressDialogOpen = false;

    function openAddNewAddressDialog() {
        newAddressObj = {name: "", address: "", balance: 0};
        newAddressDialogOpen = true;
    }

    function addNewAddress() {
        addAndSaveAddressToStorage(newAddressObj);
        newAddressDialogOpen = false;
    }
</script>

<style lang="scss">
    .list-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        max-width: 1200px;

        .list-item {
            padding: 5px;
            border-radius: 5px;
            box-shadow: $boxShadowLight;
            text-align: center;

            .name {
                width: 20%;
            }

            .address {
                width: 70%;
                word-wrap: break-word;
            }

            .balance {
                width: 10%;
            }
        }

        .empty {
            width: 100%;
            height: 100%;
        }
    }

    .floating-action-button {
        position: fixed;
        right: 10px;
        bottom: 10px;
        background-color: $primary;
        width: 65px;
        height: 65px;
        border-radius: 40px;
        align-items: center;

        .icon {
            color: white;
            font-size: 45px;
        }
    }
</style>
