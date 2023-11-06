import { useEffect } from "react";
import useRecoveryStore from "../../store/recovery/recovery.store";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation/route-path";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { NetworkUtil } from "utils/networks";
import { VoucherDetailsShimmer } from "screens/voucher-details/voucher-details.shimmer";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";

export const Account = () => {
  

    const { accountDetails, setSafeId, setAuthDetails, setAccountDetails, chainId, safeId } = useRecoveryStore((state: any) => state);

    const navigate = useNavigate();


    const updateWalletStore =  (authResponse: any) => { 


        let walletStore: any =  localStorage.getItem("defaultWallet") ? JSON.parse(localStorage.getItem("defaultWallet")!) : {};

       try { 
        if(!(authResponse.safes.includes(walletStore[authResponse.eoa][chainId]?.address))) {
            walletStore[authResponse.eoa][chainId] = '';
        }
       }
       catch (e) {
            
        walletStore[authResponse.eoa] = {};
        walletStore[authResponse.eoa][chainId] = ''; 
    }

        return walletStore;

    }

    const authenticateUser = async (signin=false) => {

      const options: Web3AuthOptions = {
        clientId: process.env.REACT_APP_W3AUTH_CLIENTID || '',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x' + NetworkUtil.getNetworkById(chainId)?.chainId.toString(16),
          rpcTarget: NetworkUtil.getNetworkById(chainId)!.url,
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook']
        }
      }
  
      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }
  
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })
  
      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
      })
  
      await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })
  
      // const safeAuth =  await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
            
      //   chainId: '0x' + NetworkUtil.getNetworkById(chainId)?.chainId.toString(16),
      //   txServiceUrl:  NetworkUtil.getNetworkById(chainId)?.safeService, // Optional. Only if want to retrieve related safes
      //   authProviderConfig: {
      //     rpcTarget: NetworkUtil.getNetworkById(chainId)!.url,
      //     clientId: process.env.REACT_APP_W3AUTH_CLIENTID!,
      //     network: 'aqua',
      //     theme: 'dark'
      //   }
      // })
  
      console.log('asdadadas asd')
      const response = signin ? await web3AuthModalPack?.signIn() : null;
  
      console.log('asdadadas asd')
      console.log(response)
  
      return { response: response, auth: web3AuthModalPack}
    }
    

    useEffect(() => {

    ;(async () => {


      var authStore = localStorage.getItem("openlogin_store");
      if(authStore && JSON.parse(authStore).sessionId) {
        setAuthDetails(JSON.parse(authStore))
         
      }
      else {
        navigate(RoutePath.login)
      }

    const safeAuth = await authenticateUser(true);

    setAccountDetails({provider: safeAuth.auth?.getProvider(), authResponse: safeAuth.response, safeAuth: safeAuth.auth })    

    let walletStore: any =   updateWalletStore(safeAuth.response);
    localStorage.setItem("defaultWallet", JSON.stringify(walletStore))

    if (safeAuth.response?.safes?.length) { 
        
        if(walletStore && !walletStore[safeAuth.response.eoa][chainId]) {

            const eoa = safeAuth.response.eoa;
            walletStore[eoa][chainId] = { address: safeAuth.response.safes[0], deployed: true }
            
            
        }
        localStorage.setItem("defaultWallet", JSON.stringify(walletStore))
        
        if(!safeId) {
            setSafeId(JSON.parse(localStorage.getItem("defaultWallet")!)[safeAuth.response.eoa][chainId].address)
        }


        navigate(RoutePath.wallet)

    }
    else {
        navigate(RoutePath.createRecovery)

    }
    
  })()

  }, [])

  return (<VoucherDetailsShimmer />)
    
};
