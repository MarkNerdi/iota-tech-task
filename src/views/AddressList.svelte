<svelte:head>
    <title>Wallet List</title>
</svelte:head>

<div id="address-list" class="flex-column flex-center wh100">
    <Header title="Your IOTA Wallets" />
    <div class="list-container">
        {#each $addresses as address}
            <div class="list-item flex-row flex-space mb2">
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

<script>
    import {Route} from "tinro";
    import {addresses} from "@/store/data";
    import {Button} from "attractions";
    import {Header} from "@/components";
    import {Dialog} from "@/components";

    $addresses = [
        {name: "Savings Wallet", address: "0x47D73BA5E0EfBeC51F1eAD27758016Bc0978Bbe4", balance: 300},
        {name: "Mamas Wallet", address: "0x5bF734D19458Ea382C6a0724E9EE0A3A1e8A3Dd0", balance: 300},
        {name: "Wallet for daily purchases", address: "0xd4916d592e3e385A6D14bDae77903Aae306f638b", balance: 300}
    ];

    let newAddressObj = {name: "", address: ""};
    $: newAddressDialogOpen = false;

    function openAddNewAddressDialog() {
        newAddressObj = {name: "", address: ""};
        newAddressDialogOpen = true;
    }

    function addNewAddress() {
        $addresses = [...$addresses, {...newAddressObj, balance: 0}];
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
        width: 75px;
        height: 75px;
        border-radius: 40px;
        align-items: center;

        .icon {
            color: white;
            font-size: 50px;
        }
    }
</style>
