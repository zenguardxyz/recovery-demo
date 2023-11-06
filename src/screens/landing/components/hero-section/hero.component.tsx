// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSectionContainer, useStyles, SimpleButton, StyledButton } from "./hero.component.styles";
import HeroImage from "../../assets/images/zen-hero.svg";
import HeroImageMob from "../../assets/images/hero-mobile.svg";
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

            <StyledSpan> Smarter Plugin  </StyledSpan>{" "}  Marketplace <br/> For your
            <StyledSpan>  Smart Accounts </StyledSpan>
            
          </h1>
          
          <p className="sub-heading">
          Extending your smart accounts is now as <span className="highlight">easy</span> <br/> and <span className="highlight">secure</span> as installing an app on your smart phone 
          
          <div className="hero-image-mobile">
          <img src={HeroImageMob} alt="Person with voucher" />
        </div>
            
          </p>
          
          <div className="form-group">

         

            <Button  onClick={ ()=>navigate(RoutePath.login)}>Plugin Demo</Button>
            {/* <SimpleButton onClick={ ()=> setOpened(true)}>Explore Plugins</SimpleButton> */}
            <SimpleButton onClick={ ()=> window.location = "https://explore.zenguard.xyz"}>Explore Plugins</SimpleButton>

            
            
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
          <p>  <br/> Powered by <span className="safe"> Safe </span>, enabled by  <StyledSpan> Modular Account Abstraction </StyledSpan> 🛡️ </p>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Person with voucher" />
        </div>
      </div>
    </HeroSectionContainer>
  );
}
