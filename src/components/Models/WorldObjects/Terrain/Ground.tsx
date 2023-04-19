/* eslint-disable react/no-unknown-property */
import React from "react";


const Ground: React.FC = () => {
  return (
    <>
      <mesh receiveShadow position={[0, -1, 0]}>
        <cylinderBufferGeometry args={[30, 9, 2, 16]} />
        <meshPhysicalMaterial
          flatShading={false}
          roughness={0.6}
          metalness={0}
          color={"#184e18"}
        />
      </mesh>

    </>
  );
};

export default Ground;
