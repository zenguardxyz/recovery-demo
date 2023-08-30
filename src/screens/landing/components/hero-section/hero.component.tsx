// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSectionContainer, useStyles, SimpleButton, StyledButton } from "./hero.component.styles";
import HeroImage from "../../assets/images/zen-hero.png";
import { StyledSpan } from "../common/span/span.component";
import { Button } from "../common/button/button.component";
import { WaitListForm } from "./mailchimp";
import { RoutePath } from "../../../../navigation/route-path";

import { SafeEventEmitterProvider } from '@web3auth/base'
import { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData } from '@safe-global/auth-kit'

export function HeroSection({}) {

  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 400px)");

  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<SafeAuthSignInData | null>(
		null
	  )
	  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>()
	  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)

  const navigate = useNavigate();


  return (
    <HeroSectionContainer>
      <div className="hero">
        <div className="hero-form">
          <h1>
          Programmable   <StyledSpan>  Wallet </StyledSpan> <br/>  For Your   
            <StyledSpan> Peace  </StyledSpan>{" "}  of Mind
          </h1>
          <p className="sub-heading">
          Smart contract Wallet SDK where recovery made <span className="highlight">secure</span>, <br/> features made <span className="highlight">programmble</span>, onboarding made <span className="highlight">simple</span>  <p>  <br/> Powered by <span className="safe"> Safe </span>, enabled by  <StyledSpan> Account Abstraction </StyledSpan> 🛡️ </p>
          </p>
          <div className="form-group">

            <Button  onClick={ ()=>navigate(RoutePath.login)}>Try Demo</Button>
            {/* <SimpleButton onClick={ ()=> setOpened(true)}>Explore Plugins</SimpleButton> */}
            <SimpleButton onClick={ ()=> window.location = "https://garden.zenguard.xyz"}>Explore Plugins</SimpleButton>
            <Modal
              sx={{ alignItems: "center" }}
              size={isMobile ? "350px" : "600px"}
              padding="40px"
              centered
              opened={opened}
              onClose={() => setOpened(false)}
              classNames={{
                modal: classes.modal,
                title: classes.title,
              }}
              withCloseButton={false}
            >
              <div className="waitlist-form">
                <WaitListForm  />
              </div>
            </Modal>
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Person with voucher" />
        </div>
      </div>
    </HeroSectionContainer>
  );
}
