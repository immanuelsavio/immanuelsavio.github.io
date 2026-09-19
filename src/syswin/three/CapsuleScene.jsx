import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/*
  Hero scene: a two-tone capsule that splits open as the page scrolls, releasing
  micro-granules, surrounded by slowly drifting tablets. Pure three.js geometry,
  lit by a generated studio environment (no external HDR files).

  Inputs arrive through refs (pointer, scroll progress) so nothing here causes
  React re-renders.
*/

const COBALT = '#1F3FD1';
const PEARL = '#F3F5FA';

function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
    scene.environment = env;
    return () => { env.dispose(); pmrem.dispose(); scene.environment = null; };
  }, [gl, scene]);
  return null;
}

function useMaterials(dark) {
  return useMemo(() => ({
    cobalt: new THREE.MeshPhysicalMaterial({ color: COBALT, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06, sheen: 0.4, sheenColor: new THREE.Color('#8FA4FF') }),
    pearl: new THREE.MeshPhysicalMaterial({ color: PEARL, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 }),
    inside: new THREE.MeshStandardMaterial({ color: dark ? '#0D1A3A' : '#DCE3F2', roughness: 0.9, side: THREE.BackSide }),
    tablet: new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.3 }),
    tabletBlue: new THREE.MeshPhysicalMaterial({ color: '#C9D4FF', roughness: 0.4, clearcoat: 0.6 }),
    granule: new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', roughness: 0.35, clearcoat: 0.5 }),
    granuleBlue: new THREE.MeshPhysicalMaterial({ color: '#7F95FF', roughness: 0.35, clearcoat: 0.5 }),
  }), [dark]);
}

/** Half a capsule: open cylinder + hemisphere cap. dir = 1 (top) or -1 (bottom). */
function CapsuleHalf({ radius, length, material, inside, dir }) {
  return (
    <group rotation={[dir < 0 ? Math.PI : 0, 0, 0]}>
      <mesh material={material} position={[0, length / 4, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, length / 2, 96, 1, true]} />
      </mesh>
      <mesh material={inside} position={[0, length / 4, 0]}>
        <cylinderGeometry args={[radius * 0.985, radius * 0.985, length / 2, 96, 1, true]} />
      </mesh>
      <mesh material={material} position={[0, length / 2, 0]}>
        <sphereGeometry args={[radius, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
}

// Rounded tablet silhouette via a lathe profile (flat top, soft bevelled edge).
function useTabletGeometry() {
  return useMemo(() => {
    const pts = [];
    const r = 0.5;
    const h = 0.16;
    const bevel = 0.07;
    pts.push(new THREE.Vector2(0, h + 0.03));
    for (let i = 0; i <= 12; i += 1) {
      const a = (i / 12) * (Math.PI / 2);
      pts.push(new THREE.Vector2(r - bevel + Math.sin(a) * bevel, h - bevel + Math.cos(a) * bevel));
    }
    for (let i = 0; i <= 12; i += 1) {
      const a = (i / 12) * (Math.PI / 2);
      pts.push(new THREE.Vector2(r - bevel + Math.cos(a) * bevel, -(h - bevel) - Math.sin(a) * bevel));
    }
    pts.push(new THREE.Vector2(0, -h - 0.03));
    const g = new THREE.LatheGeometry(pts, 64);
    g.computeVertexNormals();
    return g;
  }, []);
}

const rand = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
};

function Scene({ pointer, progress, dark, reduce }) {
  const m = useMaterials(dark);
  const tabletGeo = useTabletGeometry();
  const rig = useRef();
  const top = useRef();
  const bottom = useRef();
  const floaters = useRef([]);
  const { viewport } = useThree();

  // Seeded layout so the composition is identical on every load.
  const tablets = useMemo(() => {
    const r = rand(7);
    return Array.from({ length: 11 }, (_, i) => ({
      pos: [-0.2 + r() * 5.2, (r() - 0.5) * 4.6, -1.5 - r() * 3.5],
      rot: [r() * Math.PI, r() * Math.PI, 0],
      scale: 0.35 + r() * 0.45,
      speed: 0.25 + r() * 0.35,
      blue: i % 3 === 0,
    }));
  }, []);

  const granuleData = useMemo(() => {
    const r = rand(42);
    return Array.from({ length: 90 }, (_, i) => {
      const dir = new THREE.Vector3(r() - 0.5, (r() - 0.5) * 0.6, r() - 0.3).normalize();
      return { dir, dist: 0.8 + r() * 2.6, size: 0.03 + r() * 0.045, blue: i % 4 === 0, spin: r() * 6 };
    });
  }, []);

  const granuleMeshes = useRef([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = reduce ? 0 : progress.current;
    const open = THREE.MathUtils.smoothstep(p, 0.02, 0.6);

    if (rig.current) {
      const tx = reduce ? 0 : pointer.current.x * 0.35;
      const ty = reduce ? 0 : pointer.current.y * 0.25;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, tx + (reduce ? 0.5 : t * 0.12), 3, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -ty + 0.15, 3, delta);
      rig.current.rotation.z = THREE.MathUtils.damp(rig.current.rotation.z, -0.55 + open * 0.35, 3, delta);
      rig.current.position.y = (reduce ? 0 : Math.sin(t * 0.8) * 0.08) + open * 0.3;
    }
    if (top.current) top.current.position.y = THREE.MathUtils.damp(top.current.position.y, open * 0.95, 6, delta);
    if (bottom.current) bottom.current.position.y = THREE.MathUtils.damp(bottom.current.position.y, -open * 0.95, 6, delta);

    granuleMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const g = granuleData[i];
      const d = open * g.dist;
      mesh.position.set(g.dir.x * d * 1.6, g.dir.y * d + Math.sin(t + g.spin) * 0.04 * open, g.dir.z * d);
      const s = open > 0.01 ? g.size * (0.4 + open * 0.6) : 0.0001;
      mesh.scale.setScalar(s / 0.05);
    });

    floaters.current.forEach((mesh, i) => {
      if (!mesh) return;
      const f = tablets[i];
      const bob = reduce ? 0 : Math.sin(t * f.speed + i) * 0.18;
      mesh.position.set(f.pos[0], f.pos[1] + bob - p * (1 + f.scale) * 1.2, f.pos[2]);
      mesh.rotation.x = f.rot[0] + (reduce ? 0 : t * f.speed * 0.4);
      mesh.rotation.y = f.rot[1] + (reduce ? 0 : t * f.speed * 0.3);
    });
  });

  // Push the capsule right on wide screens so the headline has room on the left.
  const x = viewport.width > 7 ? viewport.width * 0.27 : 0;
  // On narrow screens the copy sits at the bottom, so the capsule takes the top half.
  const y = viewport.width > 7 ? 0 : viewport.height * 0.2;
  const s = viewport.width > 7 ? 0.88 : 0.55;

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={dark ? 0.25 : 0.5} />
      <directionalLight position={[4, 6, 5]} intensity={dark ? 1.4 : 1.1} />
      <directionalLight position={[-6, -2, -3]} intensity={0.6} color="#8FA4FF" />

      <group position={[x, y, 0]} scale={s}>
        <group ref={rig}>
          <group ref={top}>
            <CapsuleHalf radius={0.62} length={2.1} material={m.cobalt} inside={m.inside} dir={1} />
          </group>
          <group ref={bottom}>
            <CapsuleHalf radius={0.6} length={2.1} material={m.pearl} inside={m.inside} dir={-1} />
          </group>
          {granuleData.map((g, i) => (
            <mesh
              key={i}
              ref={(el) => { granuleMeshes.current[i] = el; }}
              material={g.blue ? m.granuleBlue : m.granule}
              scale={0.0001}
            >
              <sphereGeometry args={[0.05, 16, 12]} />
            </mesh>
          ))}
        </group>
      </group>

      {tablets.map((f, i) => (
        <mesh
          key={i}
          ref={(el) => { floaters.current[i] = el; }}
          geometry={tabletGeo}
          material={f.blue ? m.tabletBlue : m.tablet}
          scale={f.scale}
          position={f.pos}
        />
      ))}
    </>
  );
}

export default function CapsuleScene({ progress, dark, reduce, active }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; }}
    >
      <Scene pointer={pointer} progress={progress} dark={dark} reduce={reduce} />
    </Canvas>
  );
}
