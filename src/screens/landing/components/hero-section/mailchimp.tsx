// @ts-nocheck
import { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";

import { Paragraph, SubTitle } from "../common/title/title.component";
import {
  StyledInput,
  StyledForm,
  WaitlistFormContainer,
  useStyles,
  StyledButton,
  SubscriptionSuccess,
} from "./hero.component.styles";
import { RoutePath } from "../../../../navigation/route-path";
import { margin } from "polished";

export function WaitListForm() {

  const navigate = useNavigate();
  
  const [_email, setEmail] = useState("");
  const [state, handleSubmit] = useForm('xknlwdoo');
  const [discordId, setDiscordId] = useState("");

  const { classes } = useStyles();

  return (
    <StyledForm>
      <SubTitle
        className={state.succeeded  ? "hidden" : "waitlist-heading"}
      >
        Do you want to integrate ZenGuard to your DApp or existing Wallet? 🚀
      </SubTitle>

      {!state.succeeded && (
        <div>
          {" "}
          <StyledInput
            value={_email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
          />
          <StyledInput
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            type="text"
            placeholder="Your Telegram/ Discord username (optional)"
          />
          <StyledButton onClick={ () => {handleSubmit({'email': _email, discord: discordId})}}>Get Early Access</StyledButton>
        </div>
      )}

      <div className="response">
        {state.submitting && <div className="sending">Submitting...</div>}
        {Boolean(state.errors.length) && (
          <div
            className="error"
            style={{ color: "#ff0000" }}
            dangerouslySetInnerHTML={{
              __html: "Something went wrong, please try again!",
            }}
          />
        )}
        {state .succeeded && (
          <SubscriptionSuccess>
            <i style={{ color: "#12ff80" }} className="fa-solid fa-circle-check" />
            <div
              className="success"
              style={{ color: "#12ff80" }}
              dangerouslySetInnerHTML={{
                __html: "Thanks for registering. We will get back to you soon!",
              }}
            />

            <Paragraph className="sub-title solutions-heading">
              {" "}
              Mean while you can check the demo
            </Paragraph>

            <StyledButton style={{marginTop: 30}} onClick={ () => {navigate(RoutePath.login)}}>Try Demo</StyledButton>
          </SubscriptionSuccess>
        )}
      </div>
    </StyledForm>
  );
}
