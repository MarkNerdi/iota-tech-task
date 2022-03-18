<Dialog title="New Address" class="confirm-dialog" {onClose}>
    <div class="dialog-body">
        <section class="mb4">
            <label for="name-input">
                Name {#if errors.name}<span class="error">{errors.name}</span>{/if}
            </label>
            <input id="name-input" class:error-input={errors.name} placeholder="My wallet..." bind:value={newAddressObj.name} />
        </section>
        <section>
            <label for="address-input">
                Address {#if errors.address}<span class="error">{errors.address}</span>{/if}
            </label>
            <input id="address-input" class:error-input={errors.address} placeholder="e.g.: atoi1qfd89..." bind:value={newAddressObj.address} />
        </section>
    </div>
    <svelte:fragment slot="footer">
        <Button neutral on:click={() => onClose()}>Cancel</Button>
        <Button filled on:click={addNewAddress} class="ml2">Ok</Button>
    </svelte:fragment>
</Dialog>

<script lang="ts">
    import {addAndSaveAddressToStorage, addresses} from "@/store/data";
    import {Button} from "attractions";
    import {Dialog} from "@/components";
    import {Address} from "@/types";
    import {Bech32Helper} from "@iota/iota.js";
    import {showSuccessToast} from "@/store/ui";

    export let onClose: Function;

    let newAddressObj: Address = {name: "", address: "", balance: 0};
    let errors = {name: "", address: ""};

    function validateAddress() {
        errors = {name: "", address: ""};
        newAddressObj.name = newAddressObj.name.trim();
        newAddressObj.address = newAddressObj.address.trim();
        if (!newAddressObj.name) {
            errors.name = "must not be empty!";
        }
        if (!newAddressObj.address) {
            errors.address = "must not be empty!";
        } else if (!newAddressObj.address.startsWith("atoi1")) {
            errors.address = "must start with atoi1!";
        } else if (!Bech32Helper.matches(newAddressObj.address, Bech32Helper.BECH32_DEFAULT_HRP_DEV)) {
            errors.address = "must BECH32 standard!";
        } else if (newAddressObj.address.length < 12) {
            errors.address = "must be at least 12 letters long!";
        } else if ($addresses.some(addr => addr.address === newAddressObj.address)) {
            errors.address = "must be unique!";
        }
    }

    async function addNewAddress() {
        validateAddress();
        if (!errors.name && !errors.address) {
            await addAndSaveAddressToStorage(newAddressObj);
            showSuccessToast("Address added");
            onClose();
        }
    }
</script>

<style lang="scss">
    .error-input {
        border: 1px solid $errorRed;
    }

    .error {
        font-size: 0.8rem;
        color: $errorRed;
        padding: 0 5px;
        margin: 0;
    }
</style>
