<svelte:head>
    <title>Wallet List</title>
</svelte:head>

<div id="address-list" class="flex-column flex-center wh100">
    <Header title="Your IOTA Wallet">
        <div class="search-container flex-row">
            {#if searchOpen}
                <div class="search flex-row">
                    <select name="Address" id="" bind:value={tempFilter.category}>
                        {#each Object.entries(FilterCategories) as category}
                            <option value={category[0]}>{category[1]}</option>
                        {/each}
                    </select>
                    <input
                        placeholder="Search..."
                        bind:value={tempFilter.term}
                        on:keypress={event => {
                            if (event.charCode === 13) filterAddresses();
                        }} />
                    <div class="search-icon">
                        <i class="icon" on:click={filterAddresses}>search</i>
                    </div>
                </div>
            {/if}
            <i class="icon" class:filtered={filter.category && filter.term} on:click={() => (searchOpen = !searchOpen)}>search</i>
        </div>
    </Header>
    <div class="list-container">
        {#each filteredAddresses as address}
            <div class="list-item flex-row flex-center flex-space mb2" on:click={() => removeAddressFromStorage(address)}>
                <p class="name">{address.name}</p>
                <p class="address">{address.address}</p>
                <p class="balance">{address.balance}</p>
            </div>
        {:else}
            <div class="empty">No Addresses found</div>
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
    <AddNewAddressDialog onClose={() => (newAddressDialogOpen = false)} />
{/if}

<script lang="ts">
    import {Route} from "tinro";
    import {addresses, removeAddressFromStorage} from "@/store/data";
    import {Header} from "@/components";
    import AddNewAddressDialog from "@/components/dialogs/AddNewAddressDialog.svelte";
    import {Filter} from "@/types";
    import {FilterCategories} from "@/enums";

    let newAddressDialogOpen: boolean = false;
    let searchOpen: boolean = false;
    let filter: Filter = {category: null, term: null};
    let tempFilter: Filter = {category: null, term: null};

    $: filteredAddresses = $addresses.filter(addr => {
        switch (FilterCategories[filter.category]) {
            case FilterCategories.NAME:
                return addr.name.toLowerCase().includes(filter.term.toLowerCase());
            case FilterCategories.ADDRESS:
                return addr.address.toLowerCase().includes(filter.term.toLowerCase());
            case FilterCategories.BALANCE_BIGGER:
                return addr.balance >= parseInt(filter.term);
            case FilterCategories.BALANCE_SMALLER:
                return addr.balance <= parseInt(filter.term);
            default:
                return true;
        }
    });

    function filterAddresses() {
        filter = {...tempFilter};
        searchOpen = false;
    }

    function openAddNewAddressDialog() {
        newAddressDialogOpen = true;
    }
</script>

<style lang="scss">
    .search-container {
        .search {
            position: absolute;
            width: 100%;
            height: 60px;
            padding: 10px;
            left: 0;
            top: 0;

            select {
                width: 40%;
                font-size: 12px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            input {
                border-radius: 0;
                border: unset;
            }

            .search-icon {
                background-color: white;
                font-weight: 700;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;

                .icon {
                    color: $primary;
                }
            }
        }

        .icon {
            color: white;
            font-size: 30px;
            width: 40px;
            height: 40px;

            &.filtered {
                background-color: white;
                color: $primary;
                font-weight: 700;
                border-radius: 20px;
            }
        }
    }

    .list-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        max-width: 1200px;

        .list-item {
            border-radius: 5px;
            box-shadow: $boxShadowLight;
            text-align: center;

            p {
                font-size: 0.85rem;
                padding: 10px;
            }

            .name {
                width: 20%;
            }

            .address {
                width: 60%;
                word-wrap: break-word;
            }

            .balance {
                width: 20%;
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
