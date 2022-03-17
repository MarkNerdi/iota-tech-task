import {Bip39, Bip32Path} from "@iota/crypto.js";
import {Converter} from "@iota/util.js";
import {Bech32Helper, Ed25519Address, Ed25519Seed, ED25519_ADDRESS_TYPE, generateBip44Address, SingleNodeClient} from "@iota/iota.js";

const client = new SingleNodeClient("https://api.lb-0.h.chrysalis-devnet.iota.cafe");

async function generateIotaAddresses() {

    const info = await client.info();

    const randomMnemonic = Bip39.randomMnemonic();
    const baseSeed = Ed25519Seed.fromMnemonic(randomMnemonic);

    const addressGeneratorAccountState = {
        accountIndex: 0,
        addressIndex: 0,
        isInternal: false
    };
    let hexAddresses = [];
    let iotaAddresses = [];
    for (let i = 0; i < 3; i++) {
        const path = generateBip44Address(addressGeneratorAccountState);

        const addressSeed = baseSeed.generateSeedFromPath(new Bip32Path(path));
        const addressKeyPair = addressSeed.keyPair();

        const indexEd25519Address = new Ed25519Address(addressKeyPair.publicKey);
        const indexPublicKeyAddress = indexEd25519Address.toAddress();

        const hexAddr = Converter.bytesToHex(indexPublicKeyAddress);
        const iotaAddr = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, indexPublicKeyAddress, info.bech32HRP);
        hexAddresses.push(hexAddr);
        iotaAddresses.push(iotaAddr);
    }

    console.log(hexAddresses);
    console.log(iotaAddresses);
}

export async function getBalanceOfIotaAddress(address: string): Promise<number> {
    const addrInBytes = Bech32Helper.fromBech32(address, Bech32Helper.BECH32_DEFAULT_HRP_DEV);
    const hexAddr = Converter.bytesToHex(addrInBytes.addressBytes);
    const response = await client.addressEd25519(hexAddr);
    return response.balance;
}