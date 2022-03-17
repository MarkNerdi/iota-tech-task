<Dialog title="New Address" class="confirm-dialog" {onClose}>
    <div class="dialog-body">
        <section class="mb4">
            <label for="name-input">Name</label>
            {#if errors.name}
                <div class="error mb0 mt0">{errors.name}</div>
            {/if}
            <input id="name-input" class:error-input={errors.name} placeholder="My wallet..." bind:value={newAddressObj.name} />
        </section>
        <section>
            <label for="address-input">Address</label>
            {#if errors.address}
                <div class="error mt1 mb0">{errors.address}</div>
            {/if}
            <input id="address-input" class:error-input={errors.address} placeholder="e.g.: atoi1qfd89..." bind:value={newAddressObj.address} />
        </section>
    </div>
    <svelte:fragment slot="footer">
        <Button neutral on:click={() => onClose()}>Cancel</Button>
        <Button filled on:click={addNewAddress} class="ml2">Ok</Button>
    </svelte:fragment>
</Dialog>

<script lang="ts">
    import {addAndSaveAddressToStorage} from "@/store/data";
    import {Button} from "attractions";
    import {Dialog} from "@/components";
    import {Address} from "@/types";
    import {Bech32Helper} from "@iota/iota.js";

    export let onClose: Function;

    let newAddressObj: Address = {name: "", address: "", balance: 0};
    let errors = {name: "", address: ""};

    function validateAddress() {
        errors = {name: "", address: ""};
        if (!newAddressObj.name) {
            errors.name = "Name must not be empty!";
        }
        if (!newAddressObj.address) {
            errors.address = "Address must not be empty!";
        } else if (!newAddressObj.address.startsWith("atoi1")) {
            errors.address = "Address must start with atoi1!";
        } else if (!Bech32Helper.matches(newAddressObj.address, Bech32Helper.BECH32_DEFAULT_HRP_DEV)) {
            errors.address = "Address must BECH32 standard!";
        } else if (newAddressObj.address.length < 12) {
            errors.address = "Address must be at least 12 letters long!";
        }
    }

    async function addNewAddress() {
        validateAddress();
        if (!errors.name && !errors.address) {
            await addAndSaveAddressToStorage(newAddressObj);
            onClose();
        }
    }
</script>

<style lang="scss">
    .error-input {
        border: 1px solid red;
    }

    .error {
        font-size: 0.8rem;
        color: red;
        padding: 0 5px;
        margin: 0;
    }
</style>
