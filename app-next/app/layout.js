import "./globals.css";
import Providers from "@/components/Provider/Provider";

export const metadata = {
  title: "HackYourFuture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
