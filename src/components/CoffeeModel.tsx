'use client'

import { useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Group } from 'three'

function Coffee() {
  const model = useGLTF('/coffee_cup..glb')
  const ref = useRef<Group>(null)

  // Вращаем модель
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <primitive
      object={model.scene}
      ref={ref}
      scale={0.5}
      position={[0, -1.5, 0]}
    />
  )
}

export default function CoffeeModel() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <Coffee />
        
      </Suspense>
    </Canvas>
  )
}
