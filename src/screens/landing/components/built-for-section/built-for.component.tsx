// @ts-nocheck
import { FeaturesContainer, Steps, IconContainer, IconsContainer, FeatureCard, CardsContainer } from './built-for.component.styles';
import { SubTitle, Title } from "../common/title/title.component";
import Onboard from "../../assets/images/onboard.svg";
import Recovery from "../../assets/images/recovery.svg";
import Safe from "../../assets/images/safe.svg";
import Code from "../../assets/images/code.svg";
import Module from "../../assets/images/module.svg";
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

export const BuiltFor = () => {
  return (
    <FeaturesContainer>
            
    <Title centered>Built For</Title>
            <Steps>
        <div class="step-cards">
        <CardsContainer>
        <FeatureCard >
          <IconsContainer>
            <img src={Code} width="50px" alt='icon' />
            </IconsContainer>
            <h4>DApp developers </h4>
            <SubTitle centered> The most secure way to  provide DApp features via smart accounts as verified modules</SubTitle>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            <img src={Safe} width="150px" alt='icon' />
          </IconsContainer>
            <h4>Safe account extensions</h4>
            <SubTitle centered> Existing Safe account users can enhance their wallet by securely plugging new verified features via unified marketplace</SubTitle>
          </FeatureCard>
          <FeatureCard >
          <IconsContainer>
            
            <img src={Module} width="60px" alt='icon' />
            </IconsContainer>
            <h4>Customized wallet experience</h4>
            <SubTitle centered> Custodial or non-custodial wallets can customize their wallets with 2FA, recovery, easy onboarding features</SubTitle>
          </FeatureCard>
          </CardsContainer>
          </div>
      </Steps>
    </FeaturesContainer>
  );
};
