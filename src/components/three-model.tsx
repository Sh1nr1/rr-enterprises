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
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(300, 200);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    // Store references for cleanup and animation
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    let mainObject: THREE.Group | null = null;

    // Enhanced lighting setup with better atmosphere
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x404080 : 0x404040, 
      isDark ? 0.3 : 0.4
    );
    scene.add(ambientLight);

    // Main directional light with enhanced shadows
    const directionalLight = new THREE.DirectionalLight(
      isDark ? 0xffffff : 0xfff8e1, 
      isDark ? 1.5 : 1.2
    );
    directionalLight.position.set(8, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Rim lighting for better object definition
    const rimLight = new THREE.DirectionalLight(
      isDark ? 0x00ffaa : 0x64b5f6, 
      0.4
    );
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // Point light for additional warmth
    const pointLight = new THREE.PointLight(
      isDark ? 0xff6b35 : 0xffa726, 
      0.8, 
      20
    );
    pointLight.position.set(3, 6, 3);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);

    // Environment map for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
    scene.add(cubeCamera);

    // --- Enhanced Model Creation Logic ---
    if (type === "site-preparation") {
      const group = new THREE.Group();

      // Enhanced ground with texture-like appearance
      const groundGeometry = new THREE.PlaneGeometry(10, 10, 32, 32);
      const groundMaterial = new THREE.MeshLambertMaterial({
        color: isDark ? 0x2c3e50 : 0x8d6e63,
      });
      
      // Add subtle height variation to ground
      const groundPositions = groundGeometry.attributes.position.array;
      for (let i = 2; i < groundPositions.length; i += 3) {
        groundPositions[i] += (Math.random() - 0.5) * 0.1;
      }
      groundGeometry.attributes.position.needsUpdate = true;
      groundGeometry.computeVertexNormals();
      
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      group.add(ground);

      // Enhanced excavator body with metallic finish
      const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 2.5);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xf39c12 : 0xff9800,
        metalness: 0.3,
        roughness: 0.4,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.5,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(0, 0.5, 0);
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Enhanced cabin with glass-like material
      const cabinGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const cabinMaterial = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x34495e : 0x455a64,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.3,
        thickness: 0.1,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.8,
      });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.set(-0.3, 1.1, 0);
      cabin.castShadow = true;
      cabin.receiveShadow = true;
      group.add(cabin);

      // Enhanced hydraulic arm with gradient effect
      const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 16);
      const armMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xe67e22 : 0xf57c00,
        metalness: 0.7,
        roughness: 0.2,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.6,
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(1, 1, 0);
      arm.rotation.z = Math.PI / 4;
      arm.castShadow = true;
      group.add(arm);

      // Enhanced bucket with wear simulation
      const bucketGeometry = new THREE.ConeGeometry(0.3, 0.6, 8);
      const bucketMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xbdc3c7 : 0x95a5a6,
        metalness: 0.8,
        roughness: 0.6,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.4,
      });
      const bucket = new THREE.Mesh(bucketGeometry, bucketMaterial);
      bucket.position.set(1.8, 0.3, 0);
      bucket.rotation.x = Math.PI;
      bucket.castShadow = true;
      group.add(bucket);

      // Enhanced tracks with rubber-like material
      for (let i = 0; i < 2; i++) {
        const trackGeometry = new THREE.BoxGeometry(2, 0.3, 0.4);
        const trackMaterial = new THREE.MeshStandardMaterial({
          color: isDark ? 0x2c3e50 : 0x37474f,
          metalness: 0.1,
          roughness: 0.9,
        });
        const track = new THREE.Mesh(trackGeometry, trackMaterial);
        track.position.set(0, 0.15, i === 0 ? -0.8 : 0.8);
        track.castShadow = true;
        track.receiveShadow = true;
        group.add(track);

        // Add track detail segments
        for (let j = 0; j < 10; j++) {
          const segmentGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.4);
          const segment = new THREE.Mesh(segmentGeometry, trackMaterial);
          segment.position.set(-0.9 + j * 0.2, 0.32, i === 0 ? -0.8 : 0.8);
          segment.castShadow = true;
          group.add(segment);
        }
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(5, 4, 5);
      camera.lookAt(0, 0, 0);

    } else if (type === "installation") {
      const group = new THREE.Group();

      // Solar panel installation with enhanced materials
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          const panelGeometry = new THREE.BoxGeometry(1.6, 0.05, 1);
          const panelMaterial = new THREE.MeshPhysicalMaterial({
            color: isDark ? 0x1a1a2e : 0x263238,
            metalness: 0.1,
            roughness: 0.1,
            reflectivity: 0.8,
            transmission: 0.1,
            thickness: 0.02,
            envMap: cubeRenderTarget.texture,
            envMapIntensity: 1.0,
          });
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(j * 1.8 - 2.7, 1.8, i * 1.2 - 1.2);
          panel.rotation.x = -Math.PI / 8;
          panel.castShadow = true;
          panel.receiveShadow = true;
          group.add(panel);

          // Enhanced frame with metallic finish
          const frameGeometry = new THREE.EdgesGeometry(panelGeometry);
          const frameMaterial = new THREE.LineBasicMaterial({
            color: isDark ? 0x00ff88 : 0x2196f3,
            linewidth: 3,
          });
          const frame = new THREE.LineSegments(frameGeometry, frameMaterial);
          frame.position.copy(panel.position);
          frame.rotation.copy(panel.rotation);
          group.add(frame);

          // Enhanced solar cells with iridescent effect
          for (let cellX = 0; cellX < 6; cellX++) {
            for (let cellY = 0; cellY < 10; cellY++) {
              const cellGeometry = new THREE.PlaneGeometry(0.24, 0.08);
              const cellMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(
                  0.6 + (cellX + cellY) * 0.01, 
                  0.8, 
                  isDark ? 0.2 : 0.3
                ),
                metalness: 0.9,
                roughness: 0.1,
                envMap: cubeRenderTarget.texture,
                envMapIntensity: 0.7,
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

      // Enhanced support structures
      for (let i = 0; i < 4; i++) {
        const supportGeometry = new THREE.CylinderGeometry(0.06, 0.08, 2.5, 16);
        const supportMaterial = new THREE.MeshStandardMaterial({
          color: isDark ? 0x7f8c8d : 0x607d8b,
          metalness: 0.8,
          roughness: 0.3,
          envMap: cubeRenderTarget.texture,
          envMapIntensity: 0.5,
        });
        const support = new THREE.Mesh(supportGeometry, supportMaterial);
        support.position.set(i * 1.8 - 2.7, 0.75, 0);
        support.castShadow = true;
        support.receiveShadow = true;
        group.add(support);

        // Enhanced bracing
        const braceGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 12);
        const brace = new THREE.Mesh(braceGeometry, supportMaterial);
        brace.position.set(i * 1.8 - 2.7 + 0.9, 1, 0);
        brace.rotation.z = Math.PI / 6;
        brace.castShadow = true;
        group.add(brace);
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(7, 5, 7);
      camera.lookAt(0, 1, 0);

    } else if (type === "monitoring") {
      const group = new THREE.Group();

      // Enhanced building with architectural details
      const buildingGeometry = new THREE.BoxGeometry(2.5, 2, 2.5);
      const buildingMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x34495e : 0x546e7a,
        metalness: 0.2,
        roughness: 0.7,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.3,
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(0, 1, 0);
      building.castShadow = true;
      building.receiveShadow = true;
      group.add(building);

      // Enhanced windows with realistic glass
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          const windowGeometry = new THREE.PlaneGeometry(0.4, 0.3);
          const windowMaterial = new THREE.MeshPhysicalMaterial({
            color: isDark ? 0x00ff88 : 0x4caf50,
            emissive: new THREE.Color(isDark ? 0x004422 : 0x1b5e20),
            emissiveIntensity: 0.6,
            transmission: 0.7,
            thickness: 0.05,
            roughness: 0.1,
            metalness: 0.0,
            envMap: cubeRenderTarget.texture,
            envMapIntensity: 1.0,
          });
          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(-0.6 + i * 0.6, 1.3 - j * 0.4, 1.26);
          group.add(window);

          // Window frames
          const frameGeometry = new THREE.RingGeometry(0.18, 0.22, 8);
          const frameMaterial = new THREE.MeshStandardMaterial({
            color: isDark ? 0x2c3e50 : 0x37474f,
            metalness: 0.8,
            roughness: 0.2,
          });
          const frame = new THREE.Mesh(frameGeometry, frameMaterial);
          frame.position.copy(window.position);
          frame.position.z += 0.01;
          group.add(frame);
        }
      }

      // Enhanced roof with weathering
      const roofGeometry = new THREE.BoxGeometry(2.8, 0.1, 2.8);
      const roofMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0x2c3e50 : 0x37474f,
        metalness: 0.6,
        roughness: 0.8,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.4,
      });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.set(0, 2.1, 0);
      roof.castShadow = true;
      roof.receiveShadow = true;
      group.add(roof);

      // Enhanced communication tower
      const towerGeometry = new THREE.CylinderGeometry(0.03, 0.05, 3, 16);
      const towerMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xe74c3c : 0xf44336,
        metalness: 0.9,
        roughness: 0.1,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.8,
      });
      const tower = new THREE.Mesh(towerGeometry, towerMaterial);
      tower.position.set(1.5, 3.5, 1.5);
      tower.castShadow = true;
      group.add(tower);

      // Enhanced base with industrial look
      const baseGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.3, 16);
      const base = new THREE.Mesh(baseGeometry, towerMaterial);
      base.position.set(1.5, 2.15, 1.5);
      base.castShadow = true;
      group.add(base);

      // Enhanced antenna with glow effect
      const antennaGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const antennaMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? 0xff3333 : 0xf44336,
        emissive: new THREE.Color(0x440000),
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 0.6,
      });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(1.5, 5, 1.5);
      antenna.castShadow = true;
      group.add(antenna);

      // Enhanced satellite dish
      const dishGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
      const dishMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.1,
        envMap: cubeRenderTarget.texture,
        envMapIntensity: 1.0,
      });
      const dish = new THREE.Mesh(dishGeometry, dishMaterial);
      dish.position.set(1.5, 4.5, 1.5);
      dish.rotation.x = Math.PI / 4;
      dish.castShadow = true;
      group.add(dish);

      // Enhanced security cameras
      for (let i = 0; i < 4; i++) {
        const cameraGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.2, 12);
        const cameraMaterial = new THREE.MeshStandardMaterial({
          color: 0x2c3e50,
          metalness: 0.8,
          roughness: 0.2,
          envMap: cubeRenderTarget.texture,
          envMapIntensity: 0.5,
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

        // Camera lens with glass material
        const lensGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12);
        const lensMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x000000,
          transmission: 0.9,
          thickness: 0.02,
          roughness: 0.0,
          metalness: 0.0,
          envMap: cubeRenderTarget.texture,
          envMapIntensity: 1.0,
        });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.position.copy(camera.position);
        lens.position.y += 0.12;
        lens.rotation.copy(camera.rotation);
        group.add(lens);
      }

      scene.add(group);
      mainObject = group;
      camera.position.set(6, 4, 6);
      camera.lookAt(0, 1, 0);
    }

    mainObjectRef.current = mainObject;

    // Mouse interaction handlers (unchanged)
    const handleMouseDown = (event: MouseEvent) => {
      setMouseDown(true);
      setAutoRotate(false);
      setLastMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseDown || !mainObject) return;

      const deltaX = event.clientX - lastMousePos.x;
      const deltaY = event.clientY - lastMousePos.y;

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
      event.preventDefault();
      if (camera) {
        const zoomSpeed = 0.1;
        const direction = event.deltaY > 0 ? 1 : -1;
        const newPosition = camera.position.clone().multiplyScalar(1 + direction * zoomSpeed);
        const distance = newPosition.length();
        if (distance > 3 && distance < 20) {
          camera.position.copy(newPosition);
        }
      }
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });

    renderer.domElement.style.cursor = "grab";

    // Enhanced animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (mainObject) {
        if (autoRotate) {
          mainObject.rotation.y += 0.005;
        } else {
          mainObject.rotation.x = rotation.x;
          mainObject.rotation.y = rotation.y;
        }

        // Enhanced monitoring animations
        if (type === "monitoring") {
          const time = Date.now() * 0.001;
          
          mainObject.children.forEach((child) => {
            // Enhanced window glow animation
            if (child instanceof THREE.Mesh && 
                child.geometry instanceof THREE.PlaneGeometry &&
                child.material instanceof THREE.MeshPhysicalMaterial) {
              child.material.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.3;
            }
            
            // Enhanced antenna pulsing
            if (child instanceof THREE.Mesh && 
                child.geometry instanceof THREE.SphereGeometry) {
              child.material.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.4;
              child.scale.setScalar(1 + Math.sin(time * 4) * 0.05);
            }
          });
        }

        // Solar panel shimmer effect
        if (type === "installation") {
          const time = Date.now() * 0.001;
          mainObject.children.forEach((child) => {
            if (child instanceof THREE.Mesh && 
                child.material instanceof THREE.MeshStandardMaterial &&
                child.geometry instanceof THREE.PlaneGeometry) {
              const hue = 0.6 + Math.sin(time + child.position.x + child.position.z) * 0.1;
              child.material.color.setHSL(hue, 0.8, 0.3);
            }
          });
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function (unchanged)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
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
  }, [type, isDark, rotation, mouseDown, autoRotate, lastMousePos.x, lastMousePos.y]);

  useEffect(() => {
    const cleanup = renderModel();
    return cleanup;
  }, [renderModel]);

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full h-full group">
      <div ref={mountRef} className="w-full h-full" />

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

export default ThreeJSModel;