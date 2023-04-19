import React from "react";


import styles from "../../styles/Home.module.css";

const Navbar = () => {
  return (
    <>

      <main className={styles.title}>
        Anthewnia
        <h3 className={styles.tag}>- StudioHuit</h3>
      </main>
      <div className={styles.social}>
        <div className={styles.line} />
      </div>

      <div className={styles.content} >
        <h1 className={styles.h1} >Anthewnia</h1>

        <h4 className={styles.h4}>Controls</h4>
        <p className={styles.p}>
          Movement: W A S D <br />
          Wave: Q <br />
          Idle: E <br />
          Run: Shift <br />
          Jump: Space <br />
        </p>

        <button className={styles.button}>
          <a className={styles.a} href="https://hello.studiohuit.xyz">Studio Huit</a>
        </button>
      </div>
    </>
  );
};

export default Navbar;







