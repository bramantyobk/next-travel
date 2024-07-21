import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${poppins.style.fontFamily}, sans-serif;
  }
`;
export default function App({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}
