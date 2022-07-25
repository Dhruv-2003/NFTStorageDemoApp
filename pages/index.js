import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { StoreMetadata } from "../components/StoreMetadata";
export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfsUri, setIpfsUri] = useState("");
  const [ipfs, setIpfs] = useState("");

  const upload = async () => {
    try {
      const metadata = await StoreMetadata(img, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
      console.log("NFT metadata uploaded to IPFS");
      window.alert(
        "NFT metadata uploaded to ipfs , Click on IPFS link to use the data"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload metadata on IPFS</title>
        <meta
          name="description"
          content="Create and Upload metadata to IPFS in just a click"
        />
        <link rel="icon" href="/nfticon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>NFT3</a>
        </h1>

        <p className={styles.description}>
          Get started by filling the form for Metadata
        </p>

        <div className={styles.form}>
          <div className={styles.firstrow}>
            <input
              className={styles.input}
              type="text"
              value={name}
              placeholder="Name of the NFT"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles.secondrow}>
            <input
              className={styles.input}
              type="text"
              value={description}
              placeholder="Description for the NFT"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className={styles.thirdrow}></div>
          <label className={styles.inputLabel}>
            <input
              className={styles.inputBox}
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            ></input>
          </label>
          <div className={styles.buttonRow}>
            <button onClick={upload} className={styles.button}>
              Lets Go 🚀
            </button>
          </div>
          <div className={styles.secondrow}>
            {ipfsUri ? (
              <a className={styles.returnText} href={ipfsUri}>
                Ipfs Link{" "}
              </a>
            ) : (
              <a className={styles.returnText}>File is yet to upload</a>
            )}
          </div>
          {/* <div className={styles.secondrow}>
            {ipfs ? (
              <a className={styles.returnText} href={ipfs}>
                Ipfs URI {" "}
              </a>
            ) : (
              <a className={styles.returnText}>File is yet to upload</a>
            )}
          </div> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/0xdhruva"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by @0xDhruva
        </a>
        <a href="">Github</a>
      </footer>
    </div>
  );
}
