/* eslint-disable react/no-unknown-property */
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { Sky } from "@react-three/drei";

const Lights: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, DirectionalLightHelper, 5, "red");
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        // ref={lightRef}
        intensity={0.4}
        position={[-20, 10, -25]}
        castShadow
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        color={"#e0d48c"}
      />
      <hemisphereLight args={["#dfb969", "#f175eb", 0.4]} />
      {/* <pointLight color={"#241c97"} position={[0, 0, -10]} intensity={0.9} /> */}

      <Sky
        distance={300} // Camera distance (default=450000)
      // sunPosition={[0, 100, 0]} // Sun position normal (default=[0, 1, 0])
      />

    </>
  );
};
export default Lights;
