import { useCallback, useEffect } from "react"
import useRecoveryStore from "store/recovery/recovery.store";
import { signClient } from "utils/walletConnect"


export default function useWalletConnectEventsManager(initialized: boolean) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
   const { safeId, proposalParams, setProposalParams } = useRecoveryStore(
    (state: any) => state
  );

  const onSessionProposal = useCallback(
    (proposal: any) => {

        const { params } = proposal;
        console.log('session_proposal', params)
        setProposalParams(params);
      
    },
    []
  )

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: any) => {
      console.log('session_request', requestEvent)
      const { topic, params } = requestEvent
      const { request } = params
      const requestSession = signClient.session.get(topic)

      switch (request.method) {

      }
    },
    []
  )

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized) {

        console.log('initialised ........................................................................')
      signClient.on('session_proposal', onSessionProposal)
      signClient.on('session_request', onSessionRequest)
      // TODOs
    //   signClient.on('session_ping', data => console.log('ping', data))
    //   signClient.on('session_event', data => console.log('event', data))
      signClient.on('session_update', data => console.log('update', data))
      signClient.on('session_delete', data => console.log('delete', data))
    }
  }, [initialized, onSessionProposal, onSessionRequest])
}