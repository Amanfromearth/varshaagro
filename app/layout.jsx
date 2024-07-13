import { Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_Kannada({ subsets: ["latin"] });

export const metadata = {
  title: "Varsha Agro",
  description: "Varsha Agro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
