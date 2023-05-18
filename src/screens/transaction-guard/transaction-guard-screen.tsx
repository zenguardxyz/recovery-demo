import { Button, Center, Container, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { GenericCard, Image, Title, VoucherCard } from "../../components";
import { useStyles } from "./transaction-guard-screen.styles";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";
//@ts-ignore
import EmptyState from "../../assets/images/empty.svg";
import useRecoveryStore from "store/recovery/recovery.store";
import { Wallet } from "utils";


const RPC_URL='https://restless-young-layer.base-goerli.discover.quiknode.pro/3860a9e7a99900628604b143682330d4cec99db0'

export const TransactionGuards = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  let { code } = useParams();
  const wallet = new Wallet();
  const { setFetching, setSafeId, accountDetails, setAuthDetails, setRecoveryType } = useRecoveryStore(
    (state: any) => state
  );

  console.log(accountDetails.authResponse?.safes)

  const [modalActive, setModalActive] = useState(code ? true : false);

  const safeCardHandler = async (safeId: any) => {
    setFetching(true);
    setSafeId(safeId);
    navigate(RoutePath.wallet);
    
  };

  useEffect(() => {

    ;(async () => {

    var authStore = localStorage.getItem("openlogin_store");
    if (authStore) { 
      setAuthDetails(JSON.parse(authStore))
    }
    
  })()   
  }, [])



  return (
    <Container>
      <Container className={classes.voucherScreenContainer}>
        <Container sx={{ padding: 0, marginTop: "42px" }}>
          <Title text="Transaction features" />
        </Container>
        <div className={classes.actionsContainer}>
        <GenericCard
            title="Create Session keys"
            name="session"
            onClick={() => {
              setRecoveryType('session');
              // navigate(RoutePath.walletRecovery);
            }}
          />
          <GenericCard
            title="Set Limit"
            name="limit"
            onClick={() => {
              setRecoveryType('limit');
              // navigate(RoutePath.walletRecovery);
            }}
          />
          <GenericCard
            title="2FA transaction"
            name="biometric"
            onClick={() => {
              setRecoveryType('email');
              // navigate(RoutePath.walletRecovery);
            }}
          />
        </div>

      </Container>
    </Container>
  );
};
