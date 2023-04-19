/* eslint-disable react/no-unknown-property */
import React from "react";
import * as THREE from "three";

const Water: React.FC = () => {
  return (
    <>
      <mesh position={[0, -0.21, 0]} receiveShadow rotation-x={Math.PI * -0.5}>
        <circleBufferGeometry args={[100, 32]} />

        <meshPhysicalMaterial
          flatShading={false}
          roughness={0.6}
          metalness={0}
          color={"#2ad5f3"}
        />

      </mesh>
    </>
  );
};

export default Water;
