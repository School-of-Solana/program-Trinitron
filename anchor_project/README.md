## JukeBox App

This is a Solana program written in Rust using the Anchor framework and Codama for client generation.

#### Install Dependencies

```shell
npm install
```

#### Sync the program id:

Running this command will create a new keypair in the `anchor_project/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

```shell
anchor keys sync
```

#### Build the program:

```shell
anchor build
```

#### Build codama client:

```shell
codama run js
```

#### Run the tests

```shell
anchor test
```

#### Deploy to Devnet

```shell
anchor deploy --provider.cluster devnet
```

### Ackee Blockchain Security

Solana program task is prepared by [Trinitron](https://github.com/Trinitron) for Season 8 of School of Solana.
