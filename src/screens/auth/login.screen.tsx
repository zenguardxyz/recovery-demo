import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Box,
  Modal,
  Loader,
  Container,
} from "@mantine/core";
import { GoogleButton, MetaMaskButton } from "../../components";

import { SafeEventEmitterProvider, CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Web3AuthModalPack } from '@safe-global/auth-kit'


import { RoutePath } from "navigation";

import useRecoveryStore from "store/recovery/recovery.store";
import { NetworkUtil } from "utils/networks";
import { Web3AuthOptions } from "@web3auth/modal";

export function LoginScreen(props: any) {


  
  let navigate = useNavigate();

  const [signingIn, setSigningIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const { setAccountDetails, safeId, chainId } = useRecoveryStore(
    (state: any) => state
  );

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any>(
    null
  )
  const [safeAuth, setSafeAuth] = useState<any>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)


  const authenticateUser = async (signin=false) => {


    console.log(process.env.REACT_APP_W3AUTH_CLIENTID)

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
      txServiceUrl: NetworkUtil.getNetworkById(chainId)?.safeService
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
      console.log(authStore)
      if(authStore && JSON.parse(authStore).idToken) {
         navigate(RoutePath.account)
      }
      else {
      setLoginStatus(false);
      
      const safeA =  await authenticateUser(false);
      console.log(safeA)
      setLoginStatus(true);
      setSafeAuth(safeA.auth);
      }
    

   

    })()
  }, [])



  const handleLogin = async () => {
    if (!safeAuth) return

    const response = await safeAuth.signIn()


    setSafeAuthSignInResponse(response)
    setProvider(safeAuth.getProvider() as SafeEventEmitterProvider)

    setAccountDetails({provider: safeAuth.getProvider() as SafeEventEmitterProvider, authResponse: response, safeAuth: safeAuth} )

    navigate(RoutePath.account)
  }



  const logout = async () => {
    if (!safeAuth) return

    await safeAuth.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }

  return (
    <>
      <Modal
        centered
        opened={signingIn}
        onClose={() => !signingIn}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        // opacity={0.5}
        size={320}
      >
        <Box radius="md" sx={{ padding: "20px" }} {...props}>
          <Group>
            <Container
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
            </Container>
            <Text sx={{ textAlign: "center" }}>
              {" "}
              Signing you in. This may take a
              couple of seconds ...
            </Text>
          </Group>
          
        </Box>
      </Modal>

      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          padding: "10px",
        })}
      >
        <Paper radius="md" p="xl" sx={{ width: "500px" }} withBorder {...props}>
          <Text size="lg" weight={900}>
            Welcome to ZenGuard👋
          </Text>

          {errorMessage.length > 0 && (
            <Box mt="md">
              <Text size="md" color="red">
                {errorMessage}
              </Text>
            </Box>
          )}

              <Box mt="md">
              <Text size="sm" >
            Get started just with your social accounts, email or even your existing wallets. It's that simple!
            .
          </Text>
            </Box>


          <Group position="apart" mt="xl">
            <Button
              type="submit"
              fullWidth
              onClick={handleLogin}
              disabled={!loginStatus}
              style={{
                background:
                  "linear-gradient(132.56deg, #61FF47 -20.89%, #89B8FF 99.53%, #FF70F1 123.47%)",
              }}
            >
              { loginStatus ? "Get started" : "Wait for a second ..." }
            </Button>
          </Group>

          <Divider label="" labelPosition="center" my="lg" />

          {/* <Text size="sm" align="center">
            By logging in, you are agreeing to the{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/terms",
                  "_blank"
                )
              }
            >
              Terms of Service{" "}
            </StyledSpan>{" "}
            and{" "}
            <StyledSpan
              onClick={() =>
                window.open(
                  "https://resources.safient.io/legal/privacy",
                  "_blank"
                )
              }
            >
              Privacy policy
            </StyledSpan>
            .
          </Text> */}
        </Paper>
      </Box>
    </>
  );
}
