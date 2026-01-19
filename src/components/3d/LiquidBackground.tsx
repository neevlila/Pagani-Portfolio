import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface LiquidBackgroundProps {
    theme: string
}

const LiquidBackground = ({ theme }: LiquidBackgroundProps) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const { viewport } = useThree()

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Vector3(0, 0, 0) },
        uColor2: { value: new THREE.Vector3(0, 0, 0) },
    }), [])

    // Target colors based on theme
    const isDark = theme === 'dark'
    // Dark mode: Deep Blue/Black | Light mode: Soft Platinum/Grey
    const targetColor1 = isDark ? new THREE.Vector3(0.005, 0.005, 0.01) : new THREE.Vector3(0.92, 0.92, 0.94)
    const targetColor2 = isDark ? new THREE.Vector3(0.02, 0.02, 0.05) : new THREE.Vector3(0.96, 0.96, 0.98)

    useFrame((state) => {
        const { clock, mouse } = state
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial
            material.uniforms.uTime.value = clock.getElapsedTime()
            material.uniforms.uMouse.value.lerp(mouse, 0.05)

            // Smoothly transition colors
            material.uniforms.uColor1.value.lerp(targetColor1, 0.05)
            material.uniforms.uColor2.value.lerp(targetColor2, 0.05)
        }
    })

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                transparent
                uniforms={uniforms}
                vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; 
          uniform vec3 uColor1; uniform vec3 uColor2;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(uColor1, uColor2, color), 1.0);
          }
        `}
            />
        </mesh>
    )
}

export default LiquidBackground
