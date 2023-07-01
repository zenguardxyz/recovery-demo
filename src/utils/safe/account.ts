import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit"




export async function getAccount(provider: ethers.providers.ExternalProvider, safeId: string): Promise<Safe> {
   const safeOwner = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider).getSigner(0)
   const ethAdapter = new EthersAdapter({
     ethers,
     signerOrProvider:safeOwner
   })


   const safeIntance: Safe = await Safe.create({ ethAdapter, safeAddress: safeId })

   return safeIntance;
}

export async function deploy() {

}