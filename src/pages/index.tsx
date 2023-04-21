/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import Head from "next/head";
import Ground from "../components/Models/WorldObjects/Terrain/Ground";
import Lights from "../components/Lights";
import Player1 from "../components/Players/Player1";
import styles from "../styles/Home.module.css";

import { Apple } from "../components/Models/Flora&Fauna/Trees/SmallAppleloader";
import { Pine } from "../components/Models/Flora&Fauna/Trees/Pineloader";
import { Rocks1 } from "../components/Models/WorldObjects/Rocks/Rocks";

import Water from "../components/Models/WorldObjects/Terrain/Water";
import { Suspense } from "react";
import Navbar from "../components/Overlay/Navbar";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>r3-rapier character controller</title>
        <meta name="description" content="r3-rapier character controller" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Suspense fallback={null}>
        <div className={styles.container}>
          <Canvas
            shadows
            legacy={false}
            camera={{
              fov: 55,

              near: 0.01,
              far: 1000,
              position: [3, 2, -4],
              // left: -15,
              // right: 15,
              // top: 1500,
              // bottom: -15,

              zoom: 1.5,
            }}
          >
            <Perf position="bottom-left" />
            <fog attach="fog" args={[" #08b6f9", 5, 80]} />
            <Lights />

            {/* Scenery */}
            <Physics>


              <RigidBody>
                <Apple position={[-6, 4.2, 2]} />
              </RigidBody>
              <RigidBody>
                <Pine position={[8, -0.2, 3]} />
              </RigidBody>
              <RigidBody>
                <Rocks1 position={[-3, -1.2, 3]} scale={[0.5, 0.5, 0.5]} />
              </RigidBody>
              <RigidBody>
                <Rocks1
                  position={[-2, -0.2, 2]}
                  rotation={[0, 47, 0]}
                  scale={[0.5, 0.5, 0.5]}
                />
              </RigidBody>
              <Rocks1
                position={[3, -0.2, 4]}
                rotation={[0, 310, 0]}
                scale={[1, 0.8, 1]}
              />

              <Rocks1
                position={[5, -0.2, 8]}
                rotation={[0, 80, 0]}
                scale={[1, 0.6, 1]}
              />

              {/* Group 2*/}

              <Rocks1 position={[-3, -0.2, -30]} />

              <Rocks1 position={[-5, -0.2, -30]} rotation={[0, 47, 0]} />

              <Rocks1
                position={[-6, -0.2, -30]}
                rotation={[0, 310, 0]}
                scale={[1, 0.8, 1]}
              />

              <Rocks1
                position={[-11, -0.2, -30]}
                rotation={[0, 80, 0]}
                scale={[1, 0.6, 1]}
              />

              {/* Terrain */}

              <RigidBody type="fixed" restitution={0.8} friction={0}>
                <Ground />
              </RigidBody>
              <Water />

              {/* Player */}
              <Player1 />
            </Physics>
          </Canvas>
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
