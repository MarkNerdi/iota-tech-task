<svelte:head>
    <title>Your IOTA Wallet</title>
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
        {#if filteredAddresses.length > 0}
            <div class="title-row flex-row flex-center flex-space">
                <p class="name pointer {getOrder(OrderCategories.NAME)}" on:click={() => setOrdering(OrderCategories.NAME)}>Name</p>
                <p class="address pointer {getOrder(OrderCategories.ADDRESS)}" on:click={() => setOrdering(OrderCategories.ADDRESS)}>Address</p>
                <p class="balance pointer {getOrder(OrderCategories.BALANCE)}" on:click={() => setOrdering(OrderCategories.BALANCE)}>Balance</p>
                <div class="button" />
            </div>
        {/if}
        {#each filteredAddresses as address}
            <div class="list-item flex-row flex-center flex-space mb2" class:pointer={$isMobileScreen}>
                <p class="name">{address.name}</p>
                <p class="address">
                    {address.address}
                    {#if !$isMobileScreen}
                        <i class="icon pointer ml1" on:click={() => copyAddress(address.address)}>content_copy</i>
                    {/if}
                </p>
                <p class="balance">{address.balance}</p>
                <div class="button flex-center">
                    {#if !$isMobileScreen}
                        <i class="icon remove pointer" on:click={() => removeAddress(address)}>clear</i>
                    {:else}
                        <DropdownShell let:toggle>
                            <i class="icon more" on:click={toggle}>more_vert</i>
                            <Dropdown right>
                                <div on:click={toggle}>
                                    <p class="flex-row flex-center flex-left" on:click={() => copyAddress(address.address)}>
                                        <i class="icon mr1">content_copy</i>
                                        Copy to clipboard
                                    </p>
                                    <p class="flex-row flex-center flex-left" on:click={() => removeAddress(address)}>
                                        <i class="icon mr1">clear</i>
                                        Delete
                                    </p>
                                </div>
                            </Dropdown>
                        </DropdownShell>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="empty">No Addresses inserted</div>
        {/each}
        <div class="flex-center">
            <div class="floating-action-button pointer flex-center" on:click={() => (newAddressDialogOpen = true)}>
                <i class="icon">add</i>
            </div>
        </div>
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
    import copy from "copy-to-clipboard";
    import {isMobileScreen} from "@/store/app";
    import {Dropdown, DropdownShell} from "attractions";

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
                    return addr.name.toLowerCase().includes(filter.term?.toLowerCase());
                case FilterCategories.ADDRESS:
                    return addr.address.toLowerCase().includes(filter.term?.toLowerCase());
                case FilterCategories.BALANCE_BIGGER:
                    return !parseInt(filter.term) || addr.balance >= parseInt(filter.term);
                case FilterCategories.BALANCE_SMALLER:
                    return !parseInt(filter.term) || addr.balance <= parseInt(filter.term);
                default:
                    return true;
            }
        })
        .sort((addr1, addr2) => {
            let val1 = addr1[ordering.category];
            let val2 = addr2[ordering.category];
            if (typeof val1 == "string") val1 = val1.toLowerCase();
            if (typeof val2 == "string") val2 = val2.toLowerCase();

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

    function copyAddress(addr: string): void {
        copy(addr);
        showSuccessToast("Copied to clipboard");
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
        padding-bottom: 70px;
        max-width: 1200px;
        overflow: auto;

        .title-row {
            p {
                padding: 0 10px;
                user-select: none;
                color: grey;

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
            padding-left: 10px;
            height: 70px;

            @include mobile {
                padding-left: 0;
            }

            p {
                padding: 5px 10px;

                @include mobile {
                    font-size: 0.9rem;
                }
            }
        }

        .name {
            width: 20%;
        }

        .address {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;

            .icon {
                display: inline;
                font-size: 1.1rem;
                color: grey;
            }
        }

        .balance {
            width: 10%;

            @include mobile {
                width: 20%;
            }
        }

        .button {
            width: 10%;

            .remove {
                width: 40px;
                color: $errorRed;
                height: 40px;
            }

            .more {
                color: grey;
            }

            p {
                font-size: 1rem;
                margin: 0;
                padding: 10px 15px;
            }
        }

        .empty {
            width: 100%;
            height: 80%;

            @include mobile {
                height: 100%;
            }
        }
    }

    .floating-action-button {
        background-color: $primary;
        width: 65px;
        height: 65px;
        border-radius: 40px;
        align-items: center;

        @include mobile {
            position: fixed;
            right: 10px;
            bottom: 10px;
            width: 55px;
            height: 55px;
        }

        .icon {
            color: white;
            font-size: 45px;

            @include mobile {
                font-size: 37px;
            }
        }
    }
</style>
