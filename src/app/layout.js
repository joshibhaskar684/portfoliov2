import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AiBot from "@/components/ai/AiBoat";


export const metadata = {
  title: "Bhaskar Joshi",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >

      <head>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=ZCOOL+QingKe+HuangYou&display=swap" rel="stylesheet"/>

        </head>

      
      <body className="">
          <Navbar/>
          {children}
          <Footer/>
          <AiBot/>

          </body>
      
    </html>
  );
}
