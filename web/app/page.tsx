"use client";
import type { NextPage } from "next";
import styles from "./home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Home: NextPage = () => {
  const [icon, setIcon] = useState("/copy-icon.png");

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npx evmkit create my-evmkit-app");
    setIcon("/check-icon.png");
    setTimeout(() => {
      setIcon("/copy-icon.png");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hi.png"
                width={1390}
                height={1390}
                alt="Background gradient"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>
            <Image
              src="/tokens.png"
              width={819}
              height={430}
              alt="EVM Kit Example asset"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Launch Tokens , Airdrops
                </span>
                <br />
                  conduct transparent Raffles ⚡
              </h1>
              <p className={styles.heroSubtitle}>
                RaffleSphere is the best way to launch tokens and conduct transparent raffles.
              </p>
              <button className={styles.codeButton} onClick={copyToClipboard}>
                <p>token launching .....</p>
                <Image
                  src={icon}
                  alt="Copy"
                  height={16}
                  width={16}
                  className={styles.codeButtonCopy}
                />
              </button>

              <div className={styles.heroCtaContainer}>
                {/* Button in the style of code */}
                <Link
                  className={styles.heroCta}
                  href="/launch"
                >
                  Get Started
                </Link>
                <Link
                  className={styles.secondaryCta}
                  href="https://docs.rafflearena.com/"
                  target="_blank"
                >
                  Docs
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h2 className={styles.sectionTitle}>
            Live Integrations with{" "}
            <em>
              <u>major</u>
            </em>{" "}
            Solana Protocols
          </h2>
          <p className={styles.sectionDescription}>
            Lunch tokens <b>Transparently</b>.{" "}
          </p>
          <div className={styles.slider}>
            <div className={styles.slideTrack}>
              {[
                "squads",
                "bonkbot",
              ].map((protocol) => {
                return (
                  <div className={styles.slide} key={protocol}>
                    <Image
                      src={`/protocols/${protocol}.png`}
                      height={100}
                      width={100}
                      alt={protocol}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <h2 className={styles.sectionTitle}>Typesafe End-to-end</h2>
            <p className={styles.sectionDescription}>
            info
            </p>
            <p className={styles.sectionDescription}>
            info
            </p>
          </div>
          <div className={styles.sectionRight}>
            <Image
              src="/generate-preview.gif"
              width={820}
              height={246}
              alt="yarn generate preview gif"
              className={styles.sectionImage}
            />
            <p className={styles.imageCaption}>
              Demo: <span className={styles.code}>yarn generate</span> provides
              type-safety when interacting with your smart contracts.
            </p>
          </div>
        </div>

        <div
          className={`${styles.section} ${styles.reverse}`}
          style={{ justifyContent: "center", alignItems: "center", gap: 32 }}
        >
          <div className={styles.sectionRight}>
            <h2 className={styles.sectionTitle}>Info headliune2</h2>
            <p className={styles.sectionDescription}>
              info
            </p>
            <ul className={styles.featureList}>
              <li className={`${styles.sectionDescription} ${styles.listItem}`}>
              info
              </li>
              <li className={`${styles.sectionDescription} ${styles.listItem}`}>
              info
              </li>
              <li className={`${styles.sectionDescription} ${styles.listItem}`}>
              info
              </li>
            </ul>
          </div>
          <div className={styles.sectionLeft}>
            <Image
              src="/hero-image.webp"
              width={420}
              height={320}
              alt="yarn generate preview gif"
              className={styles.sectionImage}
              style={{
                // flip
                transform: "scaleX(-1)",
              }}
            />
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h2 className={styles.sectionTitle}>Modern Frontend Tooling</h2>
          <p className={styles.sectionDescription}>
            Built for performance and developer experience.
          </p>

          <div className={styles.toolsContainer}>
            {[
              {
                name: "Next.js",
                description: "A modern full-stack framework for React ",
                image: "tools/nextjs.png",
              },
              {
                name: "shadcn/ui & Tailwind CSS",
                description:
                  "Beautifully designed accessible tailwind components",
                image: "tools/tailwind.png",
              },
            ].map((tool) => {
              return (
                <div className={styles.toolContainer} key={tool.name}>
                  <Image
                    src={`/${tool.image}`}
                    width={96}
                    height={tool.name === "thirdweb" ? 64 : 96}
                    alt={tool.name}
                    className={styles.toolImage}
                    style={
                      tool.name === "thirdweb"
                        ? {
                            marginBottom: 24,
                          }
                        : {}
                    }
                  />
                  <h3 className={styles.toolName}>{tool.name}</h3>
                  <p className={styles.toolDescription}>{tool.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h2 className={styles.sectionTitle}>Join the Community</h2>
          <p className={styles.sectionDescription}>
            You are not alone in this journey. Join the community to get help,
            share your projects, and meet other developers.
          </p>
          <div className={styles.communityContainer}>
            <Link
              href="https://github.com/kamalbuilds"
              target="_blank"
              className={styles.link}
            >
              <Image
                src="/github.png"
                width={48}
                height={48}
                alt="Github icon"
              />
            </Link>
            <Link
              href="https://twitter.com/rafflearena"
              target="_blank"
              className={styles.link}
            >
              <Image
                src="/twitter.png"
                width={36}
                height={36}
                alt="Twitter icon"
              />
            </Link>
            <Link
              href="https://discord.com/invite/"
              target="_blank"
              className={styles.link}
            >
              <Image
                src="/discord.png"
                width={48}
                height={48}
                alt="Discord icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
