import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createWrapper } from "next-redux-wrapper";
import store, { persistor } from "@/redux/store";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${poppins.style.fontFamily}, sans-serif;
  }
`;

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalStyle />
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
