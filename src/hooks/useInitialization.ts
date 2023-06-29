
import { createSignClient, signClient } from 'utils/walletConnect';
import { useCallback, useEffect, useRef, useState } from 'react'


export default function useInitialization() {
  const [initialized, setInitialized] = useState(false)
  const prevRelayerURLValue = useRef<string>('')

  const onInitialize = useCallback(async () => {
    try {

      await createSignClient();
      setInitialized(true)
    } catch (err: unknown) {
      console.log(err)
    }
  }, [])

  // restart transport if relayer region changes
//   const onRelayerRegionChange = useCallback(() => {
//     try {
//       signClient.core.relayer.restartTransport(relayerRegionURL)
//       prevRelayerURLValue.current = relayerRegionURL
//     } catch (err: unknown) {
//       alert(err)
//     }
//   }, [relayerRegionURL])

  useEffect(() => {
    if (!initialized) {
      onInitialize()
    }
    // if (prevRelayerURLValue.current !== relayerRegionURL) {
    //   onRelayerRegionChange()
    // }
  }, [initialized, onInitialize ])

  return initialized
}