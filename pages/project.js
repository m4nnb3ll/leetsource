import React, { createContext, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { Header, Main } from "../routes/Project/containers";
import { Footer } from "../routes/Home/containers";

export const ProjectContext = createContext();

const Project = ({ data }) => {
  console.log(data);
  const router = useRouter();
  // Width States
  const [size, setSize] = useState(0);
  const [width, setWidth] = useState(0);

  // Getting Window Width
  useEffect(() => {
    window.addEventListener("resize", () => setSize(window.innerWidth));
    setWidth(window.innerWidth);
    if (!data[0]) router.push("/notfound");
  }, [size]);
  return (
    data &&
    data[0] && (
      <ProjectContext.Provider
        value={{
          data: data,
          width: width,
          title: data[0]?.projects[0]?.title,
          description: data[0]?.projects[0]?.description,
        }}
      >
        <div className="project__container">
          <Head>
            <title>Leet Source - {data[0]?.projects[0]?.title}</title>
            <meta
              name="google-site-verification"
              content="ovvmP3s_dWVp7bb05Bb8nGIrneErM1TaR8UDf2Yu32c"
            />
            <meta
              name="description"
              content={data[0]?.projects[0]?.description}
            />
            <meta
              name="keywords"
              content="1337 Pool, 42 Cursus, 1337 Ecole, C Programming"
            />
            <meta name="robots" content="index, follow" />
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="Astroboy" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Main />
          <Footer size="wide" />
        </div>
      </ProjectContext.Provider>
    )
  );
};

Project.getInitialProps = async (ctx) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/project/?project=${ctx.query.project}`
  );
  return { data: data };
};

export default Project;
