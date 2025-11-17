## JukeBox App

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Move to the `anchor_project` directory and use the `anchor` commands for building and testing.

#### Sync the program id:

Running this command will create a new keypair in the `anchor_project/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

```shell
anchor keys sync
```

#### Build the program:

```shell
anchor build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### Ackee Blockchain Security

Solana program task is prepared by [Trinitron](https://github.com/Trinitron) for Season 8 of School of Solana.
