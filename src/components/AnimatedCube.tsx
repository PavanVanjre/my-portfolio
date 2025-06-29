import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function AnimatedCube() {
  return (
    <div className="w-12 h-12">
      <Canvas>
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={5}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial 
            color="hsl(var(--primary))" 
            emissive="hsl(var(--primary))"
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>
      </Canvas>
    </div>
  );
} 