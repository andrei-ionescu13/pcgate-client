import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { SettingsProvider, useSettings } from "@/contexts/settings-context";
import { createCustomTheme } from "../theme";
import createEmotionCache from "../createEmotionCache";
// import { store } from '../store';
import { Layout } from "layout/layout";
import { CookiesProvider } from "react-cookie";
import { appWithTranslation } from "next-i18next";
import AppI, { AppProps } from "next/app";
import { appFetch } from "@/utils/app-fetch";
import { getSession } from "@/utils/get-session";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { wrapper } from "../store";
import { setWishlistProducts } from "../store/slices/wishlist";
import nextI18nConfig from "../../next-i18next.config";
import { getCookie } from "cookies-next";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";
import { setCart } from "@/store/slices/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ReactNode } from "react";
import { NextComponentType, NextPageContext } from "next/types";

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
NProgress.configure({ showSpinner: false });

const AppWrapper = (Component: any) => {
  const Children = ({ decoded, ...rest }) => {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              // staleTime: 1000
            },
          },
        })
    );
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={props.pageProps.dehydratedState}>
          <CookiesProvider>
            <ReduxProvider store={store}>
              <AuthProvider decoded={decoded}>
                <Component {...props} />
              </AuthProvider>
            </ReduxProvider>
          </CookiesProvider>
        </Hydrate>
      </QueryClientProvider>
    );
  };

  return Children;
};

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) => {
  const theme = createCustomTheme("dark");
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            closeOnClick={false}
            pauseOnHover={false}
            position="top-center"
            autoClose={3000}
            limit={3}
          />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </SettingsProvider>
    </CacheProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

const FinalApp = AppWrapper(appWithTranslation(App, nextI18nConfig));

FinalApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const decoded = await getSession(ctx.req, ctx.res);
  const appProps = await AppI.getInitialProps(appContext);

  return {
    ...appProps,
    decoded,
  };
};

export default FinalApp;
