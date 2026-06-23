import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create organic displacement shape
    const geometry = new THREE.IcosahedronGeometry(1.8, 64);

    // Shader with subtle coloring matching Obelii luxury design system
    const liquidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color("#1a1c1b") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float u_time;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Organic fluid displacement
          vec3 newPos = position;
          float pulse = sin(position.x * 1.5 + u_time * 0.4) * cos(position.y * 1.5 + u_time * 0.4) * 0.3;
          newPos += normal * pulse;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float u_time;
        
        void main() {
          // Faux-metallic lighting based on normal vectors
          float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Neutral elegant monochrome tone aligned with the quiet luxury aesthetic
          vec3 color = vec3(0.12, 0.12, 0.12) + intensity * vec3(0.55, 0.55, 0.55);
          
          // Very subtle iridescence shift
          color.r += sin(vNormal.x * 6.0 + u_time) * 0.012;
          color.g += cos(vNormal.y * 6.0 + u_time) * 0.012;
          
          gl_FragColor = vec4(color, 0.82);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, liquidMaterial);
    scene.add(mesh);

    // Mouse movement damping state
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      liquidMaterial.uniforms.u_time.value = time * 0.001;

      // Smooth slow rotations
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.0015;

      // Damped mouse movement tracking
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mesh.position.x = mouseX * 0.9;
      mesh.position.y = mouseY * 0.9;

      renderer.render(scene, camera);
    };

    animate(0);

    // Resize observer pattern
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || container.clientWidth || window.innerWidth;
        height = entry.contentRect.height || container.clientHeight || window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      // Memory cleanup
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      liquidMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60 overflow-hidden"
    />
  );
}
