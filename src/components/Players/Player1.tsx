/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from "react";

import {
    OrbitControlsProps,
    OrbitControls,
    useAnimations,
    useGLTF,
    useKeyboardControls,
} from "@react-three/drei";
import { useInput } from "../../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CapsuleCollider, Physics, RigidBody, useRapier } from "@react-three/rapier";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

function directionOffset({
    forward,
    backward,
    left,
    right,
}: {
    forward: any;
    backward: any;
    left: any;
    right: any;
}): number {
    if (!forward && !backward && !left && !right)
        return 42;
    var directionOffset = 0; // w
    if (forward) {
        if (left) {
            directionOffset = Math.PI / 4; //w+a
        } else if (right) {
            directionOffset = -Math.PI / 4; //w+d
        }
    } else if (backward) {
        if (left) {
            directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
        } else if (right) {
            directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
        } else {
            directionOffset = Math.PI; //s
        }
    } else if (left) {
        directionOffset = Math.PI / 2; //a
    } else if (right) {
        directionOffset = -Math.PI / 2; //d
    }

    return directionOffset;
}

const Player1 = (_Props: any) => {
    const { forward, backward, left, right, idle1, idle2, shift, jump, wave1 } = useInput();

    const model = useGLTF("./models/Anthewnia.gltf");
    const { actions } = useAnimations(model.animations, model.scene);

    model.scene.scale.set(1, 1, 1);

    // console.log(model);

    model.scene.traverse((object) => {
        // if (object.isMesh) { isMesh seems deprecated, I pulled Object3d from the console log
        if (object.isObject3D) {
            object.castShadow = true;
        }
    });

    const modelRef = useRef<THREE.Object3D>(null!);
    const rigidBodyRef = useRef<any>();
    const currentAction = useRef("");
    const controlsRef = useRef<OrbitControlsProps>(null!);
    const camera = useThree((state) => state.camera);

    const updateCameraTarget = (moveX: number, moveZ: number) => {
        // move camera
        camera.position.x += moveX;
        camera.position.z += moveZ;

        // update camera target
        cameraTarget.x = model.scene.position.x;
        // cameraTarget.y = model.scene.position.y - 1;
        cameraTarget.y = model.scene.position.y + 1;
        cameraTarget.z = model.scene.position.z;
        if (controlsRef.current) controlsRef.current.target = cameraTarget;
    };
    // const updateRigidTarget = (moveX: number, moveZ: number) => {
    //   // move camera

    //   rigidBodyRef.current.position.x += moveX;
    //   rigidBodyRef.current.position.x += moveZ;

    //   // if (rigidBodyRef.current) rigidBodyRef.current.target = cameraTarget;
    // };

    useEffect(() => {
        let action = "";

        if (forward || backward || left || right) {
            action = "walk";
            if (shift) {
                action = "run";
            }
            if (jump) {
                action = "jump";
            }
        } else if (jump) {
            action = "jump";
        } else if (wave1) {
            action = "wave1";
        } else if (idle1) {
            action = "idle1";
        }
        //  else if (idle2) {
        //   action = "idle2";
        // }
        else {
            action = "idle2";
        }

        if (currentAction.current != action) {
            const nextActionPlay = actions[action];
            const current = actions[currentAction.current];
            current?.fadeOut(0.3);
            nextActionPlay?.reset().fadeIn(0.3).play();
            currentAction.current = action;
        }
    }, [forward, backward, left, right, idle1, idle2, shift, jump, wave1, actions]);

    useFrame((_state, delta) => {
        let newDirectionOffset = directionOffset({
            forward,
            backward,
            left,
            right,
        });
        if (currentAction.current == "run" || currentAction.current == "walk") {
            // model.scene.position.x += 0.1;
            let angleYCameraDirection = Math.atan2(
                camera.position.x - model.scene.position.x,
                camera.position.z - model.scene.position.z
            );

            // diagonal camera angl

            // rotate model
            rotateQuaternion.setFromAxisAngle(
                rotateAngle,
                angleYCameraDirection + newDirectionOffset
            );
            model.scene.quaternion.rotateTowards(rotateQuaternion, 0.1);
            // TO CHNAG

            // calculate directionq
            camera.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

            // run/walk velocity
            const velocity = currentAction.current == "run" ? 5 : 0.5;
            const colliderVelocity = currentAction.current == "run" ? 5 : 0.5

            const angle = Math.atan2(walkDirection.z, walkDirection.x)

            const impulse = {
                x: 200 * delta * Math.cos(angle),
                y: rigidBodyRef.current.linvel().y,
                z: 200 * delta * Math.sin(angle),
            };

            rigidBodyRef.current.setLinvel(impulse);

            //  move modevelocityl & camera
            const moveX = walkDirection.x * velocity * delta;
            const moveZ = walkDirection.z * velocity * delta;
            // model.scene.position.x += moveX;
            // model.scene.position.z += moveZ;
            // updateRigidTarget(moveX, moveZ)
            // updateCameraTarget(moveX, moveZ);
        }
        if (newDirectionOffset === 42)
            rigidBodyRef.current.setLinvel({ x: 0, y: rigidBodyRef.current.linvel().y, z: 0 });
    });

    return (
        <>
            <OrbitControls
                {..._Props}
                ref={controlsRef}
                enableZoom={true}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.5}
                maxDistance={10} // The maximum distance the camera can be from the target
                minDistance={2} // The minimum distance the camera can be from the target
                maxPolarAngle={Math.PI / 2} // The maximum angle between the camera and the target (in radians)
                minPolarAngle={0} // The minimum angle between the camera and the target (in radians)
                target={[0, 1, 0]}
            //  camera={camera}
            />
            <RigidBody
                lockRotations={true}
                ref={rigidBodyRef}
                colliders={false}
                position={[0, 1, 0]}
                restitution={0.2}
                friction={1}
                canSleep={false}
            >
                <CapsuleCollider args={[0.1, 1]} position={[0, 1.1, 0]} />
                <primitive ref={modelRef} object={model.scene} position={[0, 0, 0]} />
            </RigidBody>
        </>
    );
};

export default Player1;
