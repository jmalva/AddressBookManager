import Head from "next/head";
import styles from "./navbar/navbar.module.scss";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
        <div className="container mx-auto py-6 px-20 flex-grow">
          <main>{children}</main>
        </div>
      <Footer />
    </>
  );
}
