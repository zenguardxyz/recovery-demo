import {
  Center,
  Container,
  Dialog,
  Group,
  Stack,
  Text,
  Paper,
  Box,
  Loader,
  Modal,
  Skeleton,
  UnstyledButton,
  Notification,
  Chip,
  useMantineTheme,
} from "@mantine/core";
import {
  BackButton,
  ClaimModal,
  Image,
  RecieveModal,
  Send,
  Title,
} from "../../components";
import sampleNFT from "../../artifacts/SampleNFT.json";
//@ts-ignore
import Transaction from "../../assets/icons/transaction.svg";
//@ts-ignore
import SafeIcon from "../../assets/icons/safe.png";
//@ts-ignore
import Base from "../../assets/icons/base.png";
//@ts-ignore
import ETH from "../../assets/icons/eth.svg";
//@ts-ignore
import Gnosis from "../../assets/icons/gno.svg";
//@ts-ignore
import Polygon from "../../assets/icons/matic.svg";
import { IconCopy, IconBell, IconSettings, IconPlus, IconCheck } from "@tabler/icons";
import { useStyles } from "./voucher-details.screen.styles";
import useRecoveryStore from "store/recovery/recovery.store";
import { useEffect, useState } from "react";
import { VoucherDetailsShimmer } from "./voucher-details.shimmer";
import { Actions } from "./components/actions.component";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "navigation";
import { LockedWallet } from "./components/locked-wallet.component";
import { Activity } from "./components/activitity.component";
import { Contract, ethers } from "ethers";
import { MetaTransactionOptions, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import Safe, { EthersAdapter, getSafeContract } from "@safe-global/protocol-kit";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { AddressUtil } from "utils/address";
import NFTDetails  from "utils/artifacts/nft.json";
import { TimeUtil } from "utils/time";
import { getAccount } from "utils/safe";
import { NetworkUtil } from "utils/networks";
import { createContractTransaction, relayTransaction, waitForRelayTransaction } from "utils/gelato";
import { themeOverRide } from "themes/default-theme";
import { Provider } from "@ethersproject/providers";


let nftContract = '';
let safeOwner: Provider;
let safeInstance: Safe;


export const VoucherDetailsScreen = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const { accountDetails, safeId, safeStatus, chainId, confirming, confirmed, setConfirming, setConfirmed } = useRecoveryStore((state: any) => state);
  const [ fetching, setFetching ] =  useState(true);
  const [ balance, setBalance ] = useState('0');
  const [ nftBalance, setNFTBalance ] = useState('0');
  const [ loadingActivities, setLoadingActivities ] = useState(false);
  const [ creating, setCreating ] = useState(false);

  const clipboard = useClipboard({ timeout: 500 });


  useEffect(() => {

    

    ;(async () => {

      try {
      
      nftContract = JSON.parse(JSON.stringify(NFTDetails)).networkAddresses[chainId];
      
      setLoadingActivities(true);
      safeOwner = new ethers.providers.Web3Provider(accountDetails.provider as ethers.providers.ExternalProvider)
      setBalance(ethers.utils.formatEther(await safeOwner.getBalance(safeId)));   
      const NFTInstance = new Contract(nftContract, sampleNFT.abi, safeOwner)
      setNFTBalance((await NFTInstance.balanceOf(safeId)).toString());   

      safeInstance = await getAccount(accountDetails.provider, safeId)

      // console.log(safeInstance)
      setFetching(false);
      setLoadingActivities(false);

      }
      catch(e) {

        safeInstance = new Safe();
        setFetching(false);
        setLoadingActivities(false);

      }

    

    })()
  }, [confirmed, safeStatus])


  const mintNFT = async () => {
    
    setCreating(true);

    while(!JSON.parse(localStorage.getItem("defaultWallet")!)[accountDetails.authResponse.eoa][chainId].deployed ) {
      await TimeUtil.sleep(1000);

    }

    try {
      await safeInstance.isSafeDeployed()
    }
    catch(e) {
      safeInstance = await getAccount(accountDetails.provider, safeId)
    }


    const signedSafeTx = await createContractTransaction(safeInstance, nftContract, sampleNFT.abi, safeOwner, 'mint' )

    setCreating(false);
    setConfirming(true);
    setConfirmed(false);

    const response = await relayTransaction(signedSafeTx, chainId, safeInstance, safeId)

    await waitForRelayTransaction(response.taskId, chainId)


    setConfirmed(true);
    setConfirming(false);
    await TimeUtil.sleep(2000)
    setConfirmed(false);
    
  
  }

  return (
    <>
      {fetching ? (
        <VoucherDetailsShimmer />
      ) : (
        <>
        
          <ClaimModal />

          <Paper withBorder className={classes.voucherDetailsContainer}>
            <Container className={classes.formContainer}>
            <Modal
        centered
        opened={creating}
        onClose={() => !creating}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        withCloseButton={false}
        // overlayOpacity={0.5}
        size={320}
      >
        
        <Box sx={{ padding: "20px" }}>
          <Group>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Loader />
              
              <Text mt={"lg"} align='center'> Minting a new NFT
              <Box sx={{ paddingTop: "20px" }}><Center><Image src={Transaction} width={50}/></Center> </Box>
              </Text>
              
            </Container>
          </Group>
        </Box>
      </Modal>
              <Box mt={20}>
                <BackButton label="Go Back" onClick={() => navigate(-1)} />
              </Box>
              <Container sx={{ padding: 0, marginBottom: "32px" }}>
                <Group
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Title text="Wallet Name" />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(73, 179, 147, 0.1);",
                      padding: "4px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    <Image
                    src={
              { 100: Gnosis, 
                137: Polygon,
                84531: Base,
                5: ETH
              }[chainId as number]} width={28} /> 
                    <Text  sx={{
                      padding: "8px",

                    }}
                    color={"green"}> {NetworkUtil.getNetworkById(chainId)?.name } {NetworkUtil.getNetworkById(chainId)?.type }</Text>
                  </Box>
                  <Group>
                    <IconBell
                      onClick={() => navigate(RoutePath.notifications)}
                      style={{ cursor: "pointer" }}
                    />

                    <IconSettings
                      onClick={() => navigate(RoutePath.walletSettings)}
                      style={{ cursor: "pointer" }}
                    />

                      <IconPlus
                      onClick={() => navigate(RoutePath.createRecovery)}
                      style={{ cursor: "pointer" }}
                    />
                  </Group>
                </Group>
              </Container>

              <Stack>
                <Center mt={20}>
                  <Group>
                   { safeStatus &&  <>
                  <Image src={SafeIcon} width={15} /> 
                  <Chip checked color="green" variant="light" size="xs" radius="md">Deployed</Chip>
                  </>
                  }
                  
                    <UnstyledButton
                    
                   
                      onClick={()=> window.open(
                        `${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${safeId}`,
                        "_blank"
                      )}
                    
                       
                
                    >
                     { AddressUtil.shorternAddress(safeId) }
                      </UnstyledButton>
                      <UnstyledButton>
                      <IconCopy
                      
                color={clipboard.copied ? "green" : "grey"}
                onClick={() =>
                  clipboard.copy(safeId)
                }
              >
                {clipboard.copied ? "Copied" : "Copy"}
              </IconCopy>   
              </UnstyledButton>
                  </Group>
                </Center>

                <Center mt={20} mb={20}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      // eslint-disable-next-line no-restricted-globals
                      // filter: "blur(8px)", //conditional render
                    }}
                  >
                    <Text weight={600} sx={{ fontSize: "30px" }}>
                    { balance }
                    </Text>
                    <Text size="sm">ETH</Text>
                  </Box>
                </Center>

                <Actions address={safeId} mintNFT={mintNFT}/>
                {/* conditional rendering */}

                {/* <LockedWallet /> */}

               
              </Stack>

              <Stack>
                
                
                <Center mt={20} mb={20}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      // eslint-disable-next-line no-restricted-globals
                      // filter: "blur(8px)", //conditional render
                    }}
                  >
                  </Box>
                </Center> 
      { loadingActivities && !creating && <Stack mt={20}>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="10%" />
        </Group>
        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton height={20} mt={6} width="20%" />
        </Group>

        <Group
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
           <Skeleton height={120} mt={6} width="25%" />
        </Group>
        
      </Stack>
               }
               { (!loadingActivities || creating )&&  <Activity activityCount={parseInt(nftBalance)}/> }

              </Stack>
            </Container>
          </Paper>
        </>
      )}
    </>
  );
};