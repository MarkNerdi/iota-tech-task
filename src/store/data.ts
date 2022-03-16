import {get, writable, Writable} from "svelte/store";
import {Address} from '../types/Address';
import {setLocalStorageItem} from '../utils/localStorage';


export const addresses: Writable<Address[]> = writable([]);

export function addAddressToStorage(address: Address) {
    const newAddresses: Address[] = [...get(addresses), address];
    setLocalStorageItem("addresses", newAddresses)
    addresses.set(newAddresses);
}

export function removeAddressFromStorage(address: Address) {
    const newAddresses: Address[] = get(addresses).filter(a => a.address !== address.address);
    setLocalStorageItem("addresses", newAddresses)
    addresses.set(newAddresses);
}