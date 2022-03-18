<svelte:head>
    <title>Wallet List</title>
</svelte:head>

<div id="address-list" class="flex-column flex-center wh100">
    <Header title="Your IOTA Wallet">
        <div class="search-container flex-row">
            {#if searchOpen}
                <div class="search flex-row">
                    <select name="Address" class="pointer" id="" bind:value={tempFilter.category}>
                        <option value={null}>Filter for...</option>
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
                        <i class="icon pointer" on:click={filterAddresses}>search</i>
                    </div>
                </div>
            {/if}
            <i class="icon pointer" class:filtered={filter.category && filter.term} on:click={() => (searchOpen = !searchOpen)}>search</i>
        </div>
    </Header>
    <div class="list-container">
        <div class="title-row flex-row flex-center flex-space">
            <p class="name pointer {getOrder(OrderCategories.NAME)}" on:click={() => setOrdering(OrderCategories.NAME)}>Name</p>
            <p class="address pointer {getOrder(OrderCategories.ADDRESS)}" on:click={() => setOrdering(OrderCategories.ADDRESS)}>Address</p>
            <p class="balance pointer {getOrder(OrderCategories.BALANCE)}" on:click={() => setOrdering(OrderCategories.BALANCE)}>Balance</p>
        </div>
        {#each filteredAddresses as address}
            <div class="list-item flex-row flex-center flex-space pointer mb2" on:click={() => removeAddress(address)}>
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
</div>

{#if newAddressDialogOpen}
    <AddNewAddressDialog onClose={() => (newAddressDialogOpen = false)} />
{/if}

<script lang="ts">
    import {addresses, removeAddressFromStorage} from "@/store/data";
    import {Header} from "@/components";
    import AddNewAddressDialog from "@/components/dialogs/AddNewAddressDialog.svelte";
    import {Address, Filter, Ordering} from "@/types";
    import {FilterCategories, OrderCategories, Orders} from "@/enums";
    import {openConfirmDialog, showSuccessToast} from "@/store/ui";

    let newAddressDialogOpen: boolean = false;
    let searchOpen: boolean = false;
    let ordering: Ordering = {category: null, order: Orders.NONE};
    let filter: Filter = {category: null, term: null};
    let tempFilter: Filter = {category: null, term: null};
    let filteredAddresses: Address[];

    $: filteredAddresses = $addresses
        .filter(addr => {
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
        })
        .sort((addr1, addr2) => {
            const val1 = addr1[ordering.category];
            const val2 = addr2[ordering.category];
            if (ordering.order === Orders.ASC) {
                return val1 >= val2 ? 1 : -1;
            } else if (ordering.order === Orders.DESC) {
                return val1 <= val2 ? 1 : -1;
            } else {
                return 0;
            }
        });

    $: getOrder = (category: OrderCategories): string => (ordering.category === category ? `order_${ordering.order}` : "");

    function filterAddresses(): void {
        filter = {...tempFilter};
        searchOpen = false;
    }

    function setOrdering(category: OrderCategories): void {
        if (ordering.category === category) {
            ordering = {category: ordering.category, order: (ordering.order + 1) % 3};
        } else {
            ordering = {category: category, order: Orders.DESC};
        }
    }

    function removeAddress(address: Address): void {
        openConfirmDialog({
            title: "Remove Address",
            content: `Do you really want to remove the address from '${address.name}'? This cannot be reverted.`,
            action: () => {
                removeAddressFromStorage(address);
                showSuccessToast("Address removed");
            }
        });
    }

    function openAddNewAddressDialog(): void {
        newAddressDialogOpen = true;
    }
</script>

<style lang="scss">
    .search-container {
        .search {
            position: absolute;
            width: 100%;
            max-width: 1000px;
            height: 60px;
            padding: 10px;
            right: 0;
            top: 0;

            select {
                width: 30%;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;

                @include mobile {
                    width: 40%;
                    font-size: 12px;
                }
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
                border-radius: 5px;
            }
        }
    }

    .list-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        max-width: 1200px;

        .title-row {
            p {
                padding: 0 10px;
                user-select: none;

                @include mobile {
                    font-size: 0.85rem;
                }
            }

            ::after {
                font-family: Material Icons, sans-serif;
                vertical-align: text-bottom;
            }

            .order_1::after {
                content: "arrow_drop_down";
            }

            .order_2::after {
                content: "arrow_drop_up";
            }
        }

        .list-item {
            border-radius: 5px;
            box-shadow: $boxShadowLight;

            p {
                padding: 10px;

                @include mobile {
                    font-size: 0.85rem;
                }
            }
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
