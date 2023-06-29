import React from "react";
import { useLocation } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { AppLayout } from "./components";
import { LandingPageNavigation, Navigation } from "./navigation";
import { useTheme } from "./hooks";
import useWalletConnectEventsManager from "hooks/useWalletConnectEventsManager";
import useInitialization from "hooks/useInitialization";


function App() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const { pathname } = useLocation();


  const initialized = useInitialization();
      
  useWalletConnectEventsManager(initialized);



  // routes for landing page
  if (pathname === "/" || pathname === "/teams")
    return <LandingPageNavigation />;

  return (
    initialized ?
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: "Inter",
          colorScheme,
          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
        }}
        withGlobalStyles
        withNormalizeCSS
        
        
      >
        <AppLayout>
          <Navigation />
        </AppLayout>
      </MantineProvider>
    </ColorSchemeProvider> : <> </>
  );
}

export default App;
