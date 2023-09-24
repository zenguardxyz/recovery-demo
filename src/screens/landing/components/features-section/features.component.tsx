// @ts-nocheck
import { FeaturesContainer, Steps, IconContainer, IconsContainer, FeatureCard, CardsContainer } from './features.component.styles';
import { SubTitle, Title } from "../common/title/title.component";
import Onboard from "../../assets/images/onboard.svg";
import Recovery from "../../assets/images/recovery.svg";
import Deploy from "../../assets/images/deploy.svg";
import Gasless from "../../assets/images/gasless.svg";
import Plugin from "../../assets/images/plugin.svg";
import Finger from "../../assets/images/finger.svg";
import Face from "../../assets/images/faceid.svg";
import Monetize from "../../assets/images/monetize.svg";
import Auditor from "../../assets/images/auditor.svg";
import Audit from "../../assets/images/audit.png";


const data = [
  {
    icon: '/icons/key.svg',
    heading: 'Secure Safes',
    description: 'Backup your secrets on Safes that are secured by robust cryptography techniques and data stores.',
  },
  {
    icon: '/icons/check.svg',
    heading: 'Convenient Claimable Safes',
    description: 'The safes are recovered by the beneficiaries only after the pre-specified claim conditions are met.',
  },
  {
    icon: '/icons/decentralized.svg',
    heading: 'Trustless Protocol',
    description:
      'Safes are guarded by trustless guardians and arbitrators to ensure the highest degree of resilience',
  },
];

export const Features = () => {
  return (
    <FeaturesContainer>
            
    <Title centered>Key Features</Title>
            <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Onboard} width="80px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary">Extended Smart Account</h3>
          <p class="step-description">
          ZenGuard provides basic security and onboarding related plugins such as account recovery, gas sponsored transactions etc.
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
       
          <FeatureCard >
          <IconsContainer>
            
            <img src={Gasless} width="50px" alt='icon' />
            </IconsContainer>
            <h4>GAS sponsorship </h4>
          </FeatureCard>
          <FeatureCard >
            <>
          <IconsContainer>
            <img src={Finger} width="40px" alt='icon' />
            <img src={Face} width="40px" alt='icon' />
            </IconsContainer>
            <h4> Biometric, OTP, Authenticator recovery </h4>
            </>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>

      <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Plugin} width="80px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary">Developer Driven</h3>
          <p class="step-description">
          Tools and infra for seamless experience for plugins developers.
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
          <FeatureCard >
            <>
          <IconsContainer>
            {/* <IconContainer> */}
            <img src={Deploy} width="70px" alt='icon' />
            </IconsContainer>
            <h4> Streamlined plugin publishing</h4>
            </>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            <img src={Monetize} width="90px" alt='icon' />
            </IconsContainer>
            <h4>Incentivise the plugins</h4>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>


      <Steps>
        <div class="step-text-box">
          <IconContainer>
              <img src={Recovery} width="70px" alt='icon' />
            </IconContainer>
          <h3 class="heading-tertiary"> Auditor Verified </h3>
          <p class="step-description">
          Verified auditors can audit and attest the plugins with audit scores and proofs.
          </p>
        </div>
        <div class="step-cards">
        <CardsContainer>
          <FeatureCard >
            <>
          <IconsContainer>
            <img src={Auditor} width="90px" alt='icon' />
            </IconsContainer>
            <h4>Audit labeled by top Audit firms</h4>
            </>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            
            <img src={Audit} width="80px" alt='icon' />
            </IconsContainer>
            <h4> Onchain verifiable audit proofs </h4>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>
    </FeaturesContainer>
  );
};
