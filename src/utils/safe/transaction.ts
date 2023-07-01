import { Contract, ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit"
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";




export async function createModuleEnableTransaction( safeInstance: Safe, module: string): Promise<SafeTransaction> {



      
  let enableModuleTrans = await safeInstance.createEnableModuleTx(module);
  let signedSafeTx = await safeInstance.signTransaction(enableModuleTrans)

 return signedSafeTx;
}
