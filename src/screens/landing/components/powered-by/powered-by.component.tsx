// @ts-nocheck
import { BackedByContainer } from "./powered-by.component.styles";
import { SubTitle, Title } from "../common/title/title.component";
import Safe from "../../assets/images/safe.svg";
import Web3Auth from "../../assets/images/web3auth.png";
import Gelato from "../../assets/images/gelato.svg";
import EAS from "../../assets/images/eas.png";

export const PoweredBy = () => {
  return (
    <BackedByContainer>
       <Title centered>Powered By </Title>

      {/* <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
        quis!
      </p> */}

      <div className="logo-container">
        <img src={Web3Auth} alt="web3auth" />
        <img src={Safe} alt="safe" />
        <img src={Gelato} width={250} alt="gelato" />
        <img src={EAS} width={100} alt="gelato" />
      </div>
    </BackedByContainer>
  );
};
