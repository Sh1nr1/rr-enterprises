"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { RotateCcw, MousePointer } from "lucide-react";


// --- Enhanced Interactive Three.js Model Component ---
const ThreeJSModel = ({ type, isDark }: { type: string; isDark: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainObjectRef = useRef<THREE.Group | null>(null);

  // Interactive controls state

  const [mouseDown, setMouseDown] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  const renderModel = useCallback(() => {
    if (!mountRef.current) return;

    // Clear any existing canvas to prevent duplicates on re-render
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(300, 200);
    renderer.setClearColor(0x000000, 0); // Clear color with full transparency
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    mountRef.current.appendChild(renderer.domElement);

    // Store references for cleanup and animation
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    let mainObject: THREE.Group | null = null; // Object to be animated

    // Enhanced lighting setup for better visual quality
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Main light source
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true; // Enable shadows from this light
    directionalLight.shadow.mapSize.width = 1024; // Shadow map resolution
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x8080ff, 0.3); // Secondary fill light
    fillLight.position.set(-5, 2, -5);
    scene.add(fillLight);

    // --- Model Creation Logic (as in your original code) ---
    if (type === "site-preparation") {
      const group = new THREE.Group();

      const groundGeometry = new THREE.PlaneGeometry(8, 8);
      const groundMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x2c3e50 : 0x8d6e63,
        shininess: 10,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      group.add(ground);

      const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 2.5);
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0xf39c12 : 0xff9800,
        shininess: 30,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(0, 0.5, 0);
      body.castShadow = true;
      group.add(body);

      const cabinGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const cabinMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x34495e : 0x455a64,
      });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.set(-0.3, 1.1, 0);
      cabin.castShadow = true;
      group.add(cabin);

      const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 8);
      const armMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0xe67e22 : 0xf57c00,
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(1, 1, 0);
      arm.rotation.z = Math.PI / 4;
      arm.castShadow = true;
      group.add(arm);

      const bucketGeometry = new THREE.ConeGeometry(0.3, 0.6, 6);
      const bucket = new THREE.Mesh(bucketGeometry, armMaterial);
      bucket.position.set(1.8, 0.3, 0);
      bucket.rotation.x = Math.PI;
      bucket.castShadow = true;
      group.add(bucket);

      for (let i = 0; i < 2; i++) {
        const trackGeometry = new THREE.BoxGeometry(2, 0.3, 0.4);
        const trackMaterial = new THREE.MeshPhongMaterial({
          color: isDark ? 0x2c3e50 : 0x37474f,
        });
        const track = new THREE.Mesh(trackGeometry, trackMaterial);
        track.position.set(0, 0.15, i === 0 ? -0.8 : 0.8);
        track.castShadow = true;
        group.add(track);
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(5, 4, 5);
      camera.lookAt(0, 0, 0);
    } else if (type === "installation") {
      const group = new THREE.Group();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          const panelGeometry = new THREE.BoxGeometry(1.6, 0.05, 1);
          const panelMaterial = new THREE.MeshPhongMaterial({
            color: isDark ? 0x1a1a2e : 0x263238,
            shininess: 100,
            reflectivity: 0.3,
          });
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(j * 1.8 - 2.7, 1.8, i * 1.2 - 1.2);
          panel.rotation.x = -Math.PI / 8;
          panel.castShadow = true;
          panel.receiveShadow = true;
          group.add(panel);

          const frameGeometry = new THREE.EdgesGeometry(panelGeometry);
          const frameMaterial = new THREE.LineBasicMaterial({
            color: isDark ? 0x00ff88 : 0x2196f3,
            linewidth: 2,
          });
          const frame = new THREE.LineSegments(frameGeometry, frameMaterial);
          frame.position.copy(panel.position);
          frame.rotation.copy(panel.rotation);
          group.add(frame);

          for (let cellX = 0; cellX < 6; cellX++) {
            for (let cellY = 0; cellY < 10; cellY++) {
              const cellGeometry = new THREE.PlaneGeometry(0.24, 0.08);
              const cellMaterial = new THREE.MeshPhongMaterial({
                color: isDark ? 0x0f172a : 0x1e293b,
                shininess: 80,
              });
              const cell = new THREE.Mesh(cellGeometry, cellMaterial);
              cell.position.set(
                panel.position.x + (cellX - 2.5) * 0.26,
                panel.position.y + 0.03,
                panel.position.z + (cellY - 4.5) * 0.09
              );
              cell.rotation.copy(panel.rotation);
              group.add(cell);
            }
          }
        }
      }

      for (let i = 0; i < 4; i++) {
        const supportGeometry = new THREE.CylinderGeometry(0.06, 0.08, 2.5, 8);
        const supportMaterial = new THREE.MeshPhongMaterial({
          color: isDark ? 0x7f8c8d : 0x607d8b,
          shininess: 20,
        });
        const support = new THREE.Mesh(supportGeometry, supportMaterial);
        support.position.set(i * 1.8 - 2.7, 0.75, 0);
        support.castShadow = true;
        group.add(support);

        const braceGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 8);
        const brace = new THREE.Mesh(braceGeometry, supportMaterial);
        brace.position.set(i * 1.8 - 2.7 + 0.9, 1, 0);
        brace.rotation.z = Math.PI / 6;
        group.add(brace);
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(7, 5, 7);
      camera.lookAt(0, 1, 0);
    } else if (type === "monitoring") {
      const group = new THREE.Group();

      const buildingGeometry = new THREE.BoxGeometry(2.5, 2, 2.5);
      const buildingMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x34495e : 0x546e7a,
        shininess: 20,
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(0, 1, 0);
      building.castShadow = true;
      building.receiveShadow = true;
      group.add(building);

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          const windowGeometry = new THREE.PlaneGeometry(0.4, 0.3);
          const windowMaterial = new THREE.MeshStandardMaterial({
            color: isDark ? 0x00ff88 : 0x4caf50,
            emissive: new THREE.Color(isDark ? 0x004422 : 0x1b5e20),
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.8,
          });
          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(-0.6 + i * 0.6, 1.3 - j * 0.4, 1.26);
          group.add(window);
        }
      }

      const roofGeometry = new THREE.BoxGeometry(2.8, 0.1, 2.8);
      const roofMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x2c3e50 : 0x37474f,
      });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.set(0, 2.1, 0);
      roof.castShadow = true;
      group.add(roof);

      const towerGeometry = new THREE.CylinderGeometry(0.03, 0.05, 3, 8);
      const towerMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0xe74c3c : 0xf44336,
        shininess: 50,
      });
      const tower = new THREE.Mesh(towerGeometry, towerMaterial);
      tower.position.set(1.5, 3.5, 1.5);
      tower.castShadow = true;
      group.add(tower);

      const baseGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.3, 8);
      const base = new THREE.Mesh(baseGeometry, towerMaterial);
      base.position.set(1.5, 2.15, 1.5);
      base.castShadow = true;
      group.add(base);

      const antennaGeometry = new THREE.SphereGeometry(0.15, 8, 8);
      const antennaMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xff3333 : 0xf44336,
        emissive: new THREE.Color(0x330000),
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(1.5, 5, 1.5);
      antenna.castShadow = true;
      group.add(antenna);

      const dishGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
      const dishMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        shininess: 100,
      });
      const dish = new THREE.Mesh(dishGeometry, dishMaterial);
      dish.position.set(1.5, 4.5, 1.5);
      dish.rotation.x = Math.PI / 4;
      dish.castShadow = true;
      group.add(dish);

      for (let i = 0; i < 4; i++) {
        const cameraGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.2, 8);
        const cameraMaterial = new THREE.MeshPhongMaterial({
          color: 0x2c3e50,
        });
        const camera = new THREE.Mesh(cameraGeometry, cameraMaterial);
        const angle = (i / 4) * Math.PI * 2;
        camera.position.set(
          Math.cos(angle) * 1.5,
          2.3,
          Math.sin(angle) * 1.5
        );
        camera.rotation.y = angle + Math.PI;
        camera.castShadow = true;
        group.add(camera);
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(6, 4, 6);
      camera.lookAt(0, 1, 0);
    }

    mainObjectRef.current = mainObject;

    // Mouse interaction handlers
    const handleMouseDown = (event: MouseEvent) => {
      setMouseDown(true);
      setAutoRotate(false); // Stop auto-rotation on user interaction
      setLastMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseDown || !mainObject) return;

      const deltaX = event.clientX - lastMousePos.x;
      const deltaY = event.clientY - lastMousePos.y;

      // Adjust rotation sensitivity as needed
      setRotation((prev) => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01,
      }));

      setLastMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setMouseDown(false);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // Prevent page scrolling
      if (camera) {
        const zoomSpeed = 0.1;
        const direction = event.deltaY > 0 ? 1 : -1; // Scroll up = zoom out, scroll down = zoom in
        // Limit zoom to prevent camera from going too far or too close
        const newPosition = camera.position.clone().multiplyScalar(1 + direction * zoomSpeed);
        const distance = newPosition.length();
        if (distance > 3 && distance < 20) { // Example limits
          camera.position.copy(newPosition);
        }
      }
    };

    // Add event listeners to the renderer's DOM element
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false }); // Mark as passive: false for preventDefault

    // Cursor styling for interactivity
    renderer.domElement.style.cursor = "grab";

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (mainObject) {
        if (autoRotate) {
          mainObject.rotation.y += 0.005; // Continuous auto-rotation
        } else {
          // Apply user-controlled rotation
          mainObject.rotation.x = rotation.x;
          mainObject.rotation.y = rotation.y;
        }

        // Special animations for monitoring type
        if (type === "monitoring") {
          mainObject.children.forEach((child) => {
            if (
              child instanceof THREE.Mesh &&
              child.geometry instanceof THREE.PlaneGeometry
            ) {
              if (child.material instanceof THREE.MeshStandardMaterial) {
                // Pulsating emissive intensity for windows
                child.material.emissiveIntensity =
                  0.4 + Math.sin(Date.now() * 0.003) * 0.2;
              }
            }
            // Animate antenna glowing
            if (
              child instanceof THREE.Mesh &&
              child.geometry instanceof THREE.SphereGeometry
            ) {
              child.material.emissiveIntensity =
                0.6 + Math.sin(Date.now() * 0.005) * 0.3;
            }
          });
        }
      }

      renderer.render(scene, camera); // Render the scene with the camera
    };
    animate();

    // Cleanup function for when the component unmounts
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      // Remove all event listeners to prevent memory leaks
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);

      // Remove the canvas from the DOM
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose Three.js resources to prevent memory leaks
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [type, isDark, rotation, mouseDown, autoRotate, lastMousePos.x, lastMousePos.y]); // Dependencies for useCallback

  useEffect(() => {
    const cleanup = renderModel(); // Initial render and cleanup
    return cleanup;
  }, [renderModel]); // Re-run effect if renderModel changes

  // Function to reset view to initial auto-rotate state
  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full h-full group">
      <div ref={mountRef} className="w-full h-full" />

      {/* Interactive controls overlay (reset button) */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={resetView}
          className={`p-2 rounded-lg backdrop-blur-sm border transition-all duration-200 hover:scale-110 ${
            isDark
              ? "bg-gray-800/70 border-gray-600/50 text-orange-400 hover:bg-gray-700/70"
              : "bg-white/70 border-gray-300/50 text-blue-600 hover:bg-white/90"
          }`}
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Interaction hint */}
      <div
        className={`absolute bottom-2 left-2 text-xs px-2 py-1 rounded-md backdrop-blur-sm border opacity-60 transition-opacity duration-300 ${
          isDark
            ? "bg-gray-800/70 border-gray-600/50 text-gray-300"
            : "bg-white/70 border-gray-300/50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-1">
          <MousePointer className="w-3 h-3" />
          <span>Click & drag to rotate, scroll to zoom</span>
        </div>
      </div>
    </div>
  );
};

export default ThreeJSModel; // Export the component