import {get, writable, Writable} from "svelte/store";
import {Address} from '../types/Address';
import {setLocalStorageItem} from '../utils/localStorage';
import {getBalanceOfIOTAAddress} from "../utils/addressUtils";


export const addresses: Writable<Address[]> = writable([]);

export async function addAddressToStorage(address: Address) {
    const balance = await getBalanceOfIOTAAddress(address.address);
    address.balance = balance;
    const newAddresses: Address[] = [...get(addresses), address];
    addresses.set(newAddresses);
    return newAddresses;
}

export async function addAndSaveAddressToStorage(address: Address) {
    const newAddresses = await addAddressToStorage(address);
    setLocalStorageItem("addresses", newAddresses)
}

export function removeAddressFromStorage(address: Address) {
    const newAddresses: Address[] = get(addresses).filter(a => a.address !== address.address);
    setLocalStorageItem("addresses", newAddresses)
    addresses.set(newAddresses);
}