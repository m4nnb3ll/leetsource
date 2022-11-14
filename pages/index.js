import React, { createContext, useState, useEffect } from "react";
import Head from "next/head";
import { Header, Main, Footer } from "../routes/Home/containers";

export var HomeContext = createContext();
export default function Home() {
  const [size, setSize] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => setSize(window.innerWidth));
    setWidth(window.innerWidth);
  }, [size]);

  return (
    <HomeContext.Provider value={{ width: width }}>
      <div className="home__container">
        <Head>
          <title>Leet Source</title>
          <meta
            name="description"
            content="A list of resources that every 1337FIL Student need in order to get better in programming"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Main />
        <Footer />
      </div>
    </HomeContext.Provider>
  );
}