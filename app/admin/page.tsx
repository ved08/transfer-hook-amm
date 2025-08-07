"use client"

import { AnchorProvider, BN, Program } from "@coral-xyz/anchor"
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import IDL from "./idl.json"
import { CpAmm } from "./types"
import { PublicKey, SystemProgram } from "@solana/web3.js"
import { deriveConfigAddress } from "@/sdk/damm-v2-sdk/src"

export default function CreateConfigPage() {

    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()
    if (!anchorWallet || !publicKey) {
        return <div>Connect wallet</div>
    }
    const provider = new AnchorProvider(connection, anchorWallet)
    const program = new Program<CpAmm>(IDL, provider)
    const createConfigHandler = async () => {
        console.log("Create Config")
        const params = {
            poolFees: {
                baseFee: {
                    cliffFeeNumerator: new BN(2_500_000),
                    numberOfPeriod: 0,
                    reductionFactor: new BN(0),
                    periodFrequency: new BN(0),
                    feeSchedulerMode: 0,
                },
                padding: [],
                dynamicFee: null,
            },
            sqrtMinPrice: new BN("4295048016"),
            sqrtMaxPrice: new BN("79226673521066979257578248091"),
            vaultConfigKey: PublicKey.default,
            poolCreatorAuthority: PublicKey.default,
            activationType: 0,
            collectFeeMode: 0,
        };
        const index = new BN(100)
        const config = deriveConfigAddress(index)
        const tx = await program.methods.createConfig(index, params).accountsPartial({
            config,
            admin: publicKey,
            systemProgram: SystemProgram.programId
        }).transaction()
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        tx.feePayer = publicKey
        console.log("created config with tx: ", tx.serializeMessage().toString("base64"))
    }
    return (
        <div>
            <button onClick={createConfigHandler}>Create Config</button>
        </div>
    )
}