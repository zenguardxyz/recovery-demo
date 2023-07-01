import { Contract, ethers, Signer } from "ethers";
import Safe, { EthersAdapter, getSafeContract } from "@safe-global/protocol-kit"
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { NetworkUtil } from "utils/networks";
import { Provider } from "@ethersproject/providers";
import { MetaTransactionOptions, SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { RelayResponse } from '@gelatonetwork/relay-sdk';
import { TimeUtil } from "utils/time";




export async function createContractTransaction( safeInstance: Safe, contractAddress: string, contractABI: any, signerOrProvider: Signer | Provider, method: string, params?: Array<any>): Promise<SafeTransaction> {



    console.log(contractABI)

    const NFTInstance = new Contract(contractAddress, contractABI, signerOrProvider)

    let addGuardian =  NFTInstance.interface.encodeFunctionData(method, params)
    
    const safeTransactionData: SafeTransactionDataPartial = {
      to: contractAddress,
      value: "0",
      data: addGuardian 
    }


    const transaction = await safeInstance.createTransaction({safeTransactionData})

        
    const signedSafeTx = await safeInstance.signTransaction(transaction)
    


   return signedSafeTx;
}

export async function relayTransaction(signedSafeTx: SafeTransaction, chainId: any, safeInstance: Safe, safeId: string ): Promise<RelayResponse> {

  const gasLimit = '100000'

  const options: MetaTransactionOptions = {
    gasLimit,
    isSponsored: true
  }
      
  const GELATO_RELAY_API_KEY = NetworkUtil.getNetworkById(chainId)?.type == 'Mainnet' ? process.env.REACT_APP_GELATO_RELAY_API_KEY_MAINNET : process.env.REACT_APP_GELATO_RELAY_API_KEY;

  const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY)

  const safeSingletonContract = await getSafeContract({ ethAdapter: safeInstance.getEthAdapter() , safeVersion: await safeInstance.getContractVersion() })

  const encodedTx = safeSingletonContract.encode('execTransaction', [
    signedSafeTx.data.to,
    signedSafeTx.data.value,
    signedSafeTx.data.data,
    signedSafeTx.data.operation,
    signedSafeTx.data.safeTxGas,
    signedSafeTx.data.baseGas,
    signedSafeTx.data.gasPrice,
    signedSafeTx.data.gasToken,
    signedSafeTx.data.refundReceiver,
    signedSafeTx.encodedSignatures()
  ])


  const relayTransaction = {
    target: safeId,
    encodedTransaction: encodedTx,
    chainId: chainId,
    options
  }


  const response = await relayKit.relayTransaction(relayTransaction)

  return response;

}






export async function waitForRelayTransaction(taskId: any, chainId: any): Promise<boolean> {


  const GELATO_RELAY_API_KEY = NetworkUtil.getNetworkById(chainId)?.type == 'Mainnet' ? process.env.REACT_APP_GELATO_RELAY_API_KEY_MAINNET : process.env.REACT_APP_GELATO_RELAY_API_KEY;

  const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY)

let taskStatus = null;
do {
await TimeUtil.sleep(1000)
console.log(taskStatus?.taskState)
console.log('Waiting')
try {
taskStatus = await relayKit.getTaskStatus(taskId);
}
catch(e)
{
  // pass
}

} while(taskStatus?.taskState != 'ExecSuccess' && taskStatus?.taskState != 'Cancelled') 


return taskStatus?.taskState == 'ExecSuccess'


}