<svelte:head>
    <title>Wallet List</title>
</svelte:head>

<div id="address-list" class="flex-column wh100">
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
    <Route path="/address/">
        <!-- TODO: <AddressDetail />  -->
    </Route>
</div>

<script>
    import {Route} from "tinro";
    import {addresses} from "@/store/data";
    import {Header} from "@/components";

    $addresses = [
        {name: "Savings Wallet", address: "0x47D73BA5E0EfBeC51F1eAD27758016Bc0978Bbe4", balance: 300},
        {name: "Mamas Wallet", address: "0x5bF734D19458Ea382C6a0724E9EE0A3A1e8A3Dd0", balance: 300},
        {name: "Wallet for daily purchases", address: "0xd4916d592e3e385A6D14bDae77903Aae306f638b", balance: 300}
    ];
</script>

<style lang="scss">
    .list-container {
        width: 100%;
        height: 100%;
        padding: 10px;

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
</style>
