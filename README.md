# IOTA TECH TASK

The task is to develop an application to monitor IOTA addresses for their latest balances.
Your code will be written in Svelte and Typescript.
### Task Requirements
- Allow user to enter IOTA addresses;
- Maintain a list of these addresses and their current balance and display the list in the UI;
- Use an IOTA node (through ZMQ feed or polling) to continuously check for the addresses’
balance;
- You can use any IOTA library but the easiest will be https://github.com/iotaledger/iota.js;
- Allow the user to remove an address from the list;
- Allow the user to search for an address by the address itself or balance;
- Use git for versioning;
- Choose your own UI design and feel free to use existing component libraries if you want to;
- https://docs.iota.org/ will be a helpful resource.

## Implemented Features

- The user can add a new address with the big floating button.
    - The dialog includes validation (Name required, Address required and correct format)
- The list is updated instantly using store-variables
- On save, the balance for the new address will be fetched (from the `chrysalis devnet`)
- Every 5 seconds, the (potentially) new balances will be fetched for each address and updated in the UI (can be tested with the IOTA faucet on `https://faucet.chrysalis-devnet.iota.cafe/`)
- For each list item the user has 2 interactions:
    - Copy to clipboard: copies the address into the clipboard for later use
    - Delete: After asking for confirmation, the element will be deleted from the list
- The list is also saved into the browsers local storage to persist the data on reload
- The list can be filtered within the header according the there listed filter criteria
- The list can be ordered in ascending and descending order by clicking on the lists labels (`Name`, `Address`, `Balance`)
- The application is optimized for mobile and desktop use
- For easy development and deployment, the application can be build with the `Dockerfile` and run with the `docker-compose.yml` files
- The web app is available on: "https://iota.crewup.dev"
