'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useTexture } from '@react-three/drei';
import React from 'react';

const Ghost: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  const { size, camera } = useThree();
  const texture = useTexture('/ghost.png');
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const time = useRef<number>(0);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uMouseInfluence: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uMouseInfluence;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.x += sin(pos.y * 4.0 + uTime * 1.2) * 0.15;
        pos.y += cos(pos.x * 3.0 + uTime * 1.0) * 0.1;
        float dist = distance(vec2(pos.x, pos.y), uMouse);
        pos.z += sin(dist * 6.0 - uTime) * 0.15 * uMouseInfluence;
        pos.y += uScroll * 0.8;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv;
        uv += sin(uv.y * 12.0 + uTime * 2.0) * 0.03;
        vec4 color = texture2D(uTexture, uv);
        color.rgb *= vec3(0.5, 0.6, 0.7);
        color.rgb += 0.05 * (sin(uTime * 3.0) * 0.5 + 0.5);
        float alpha = color.a * 0.4 * (1.0 - length(vUv - 0.5) * 0.8);
        gl_FragColor = vec4(color.rgb, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / size.width) * 2 - 1;
      mouse.current.y = -(event.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [size]);

  useFrame(() => {
    time.current += 0.015;
    const t = time.current;

    if (!meshRef.current) return;

    meshRef.current.position.x =
      Math.sin(t * 0.7) * 2.0 + Math.cos(t * 1.1) * 0.4 + Math.sin(t * 1.8) * 0.2;
    meshRef.current.position.y =
      Math.cos(t * 0.5) * 1.5 + Math.sin(t * 1.2) * 0.3 + Math.cos(t * 1.6) * 0.15;
    meshRef.current.position.z = Math.sin(t * 0.3) * 0.6;

    meshRef.current.rotation.z = Math.sin(t * 0.6) * 0.4;

    const ghostPos = meshRef.current.position.clone().project(camera);
    const mouseDist = Math.sqrt(
      Math.pow(ghostPos.x - mouse.current.x, 2) + Math.pow(ghostPos.y - mouse.current.y, 2)
    );
    const interactionRadius = 0.3;
    const mouseInfluence = Math.max(0, 1 - mouseDist / interactionRadius);

    material.uniforms.uTime.value = t;
    material.uniforms.uMouse.value.set(mouse.current.x * 2.5, mouse.current.y * 2.5);
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uScroll.value = scrollYProgress.get();
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[1.4, 1.4]} />
    </mesh>
  );
};

const GhostCanvas: React.FC = () => {
  return (
    <Canvas
      className="fixed inset-0 pointer-events-none z-10"
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true }}
    >
      <Ghost />
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </Canvas>
  );
};

export default GhostCanvas;
