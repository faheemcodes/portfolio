import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { profile } from "../data/content";

/**
 * Generates an offscreen 2D Canvas texture containing the obsidian intro screen,
 * subtle dot grid, and crisp centered "faheem.devlabs" typography.
 */
function createIntroScreenTexture(width, height) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");

  ctx.scale(dpr, dpr);

  // 1. Deep Obsidian Glass Base
  ctx.fillStyle = "#0b0b0c";
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Radial Specular Sheen
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    10,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.58
  );
  grad.addColorStop(0, "rgba(229, 218, 195, 0.08)");
  grad.addColorStop(1, "rgba(11, 11, 12, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Engineering Dot Matrix
  ctx.fillStyle = "rgba(255, 255, 255, 0.055)";
  const step = 32;
  for (let x = 16; x < width; x += step) {
    for (let y = 16; y < height; y += step) {
      ctx.fillRect(x, y, 1.2, 1.2);
    }
  }

  const cx = width / 2;
  const cy = height / 2;
  const isMobile = width < 600;

  // 4. Eyebrow: FAHEEM AHMED SOOMRO
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${isMobile ? 10 : 12}px "JetBrains Mono", monospace`;
  ctx.fillStyle = "rgba(229, 218, 195, 0.8)";
  const eyebrowText = profile.name.toUpperCase().split("").join(" ");
  ctx.fillText(eyebrowText, cx, cy - (isMobile ? 38 : 54));

  // 5. Center Wordmark: faheem.devlabs
  const fontSize = Math.min(Math.max(width * 0.068, 34), 76);
  ctx.font = `700 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;

  const part1 = "faheem";
  const dot = ".";
  const part2 = "devlabs";

  const w1 = ctx.measureText(part1).width;
  const wDot = ctx.measureText(dot).width;
  const w2 = ctx.measureText(part2).width;
  const totalW = w1 + wDot + w2;
  const startX = cx - totalW / 2;

  ctx.textAlign = "left";
  ctx.fillStyle = "#f5f5f7";
  ctx.fillText(part1, startX, cy);

  ctx.fillStyle = "#e5dac3";
  ctx.fillText(dot, startX + w1, cy);

  ctx.fillStyle = "#f5f5f7";
  ctx.fillText(part2, startX + w1 + wDot, cy);

  // 6. Subtitle: SOFTWARE ENGINEERING • ARCHITECTURE
  ctx.textAlign = "center";
  ctx.font = `500 ${isMobile ? 9 : 11}px "JetBrains Mono", monospace`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillText(
    "S O F T W A R E   E N G I N E E R I N G   •   A R C H I T E C T U R E",
    cx,
    cy + (isMobile ? 38 : 54)
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Clips a 2D convex polygon (array of THREE.Vector2) against a bounding half-plane:
 *   keep point P if (P.x * nx + P.y * ny <= c)
 * Using Sutherland-Hodgman polygon clipping so outer radial shards are cleanly
 * trimmed to the exact screen rectangle [-hw..hw, -hh..hh] with 0 gaps!
 */
function clipPolygonHalfPlane(poly, nx, ny, c) {
  if (!poly || poly.length === 0) return [];
  const out = [];
  const n = poly.length;

  for (let i = 0; i < n; i++) {
    const cur = poly[i];
    const prev = poly[(i + n - 1) % n];
    const dCur = cur.x * nx + cur.y * ny - c;
    const dPrev = prev.x * nx + prev.y * ny - c;

    if (dCur <= 1e-6) {
      if (dPrev > 1e-6) {
        const t = dPrev / (dPrev - dCur);
        out.push(
          new THREE.Vector2(
            prev.x + t * (cur.x - prev.x),
            prev.y + t * (cur.y - prev.y)
          )
        );
      }
      out.push(cur);
    } else if (dPrev <= 1e-6) {
      const t = dPrev / (dPrev - dCur);
      out.push(
        new THREE.Vector2(
          prev.x + t * (cur.x - prev.x),
          prev.y + t * (cur.y - prev.y)
        )
      );
    }
  }
  return out;
}

function clipPolygonToScreen(poly, hw, hh) {
  let res = poly;
  res = clipPolygonHalfPlane(res, 1, 0, hw); // x <= hw
  res = clipPolygonHalfPlane(res, -1, 0, hw); // x >= -hw
  res = clipPolygonHalfPlane(res, 0, 1, hh); // y <= hh
  res = clipPolygonHalfPlane(res, 0, -1, hh); // y >= -hh
  return res;
}

/**
 * Builds a realistic Radial Spiderweb Glass Impact Fracture:
 * - Impact point near the center
 * - 18 primary radial fracture rays shooting outward at irregular angles
 * - 7 concentric shockwave rings with jagged vertex jitter
 * - Inner impact core shatters into fine needle splinters; outer rings form large jagged glass plates
 * - Also returns a 3D LineSegments mesh of bright white/silver glass fracture cracks that flash on impact!
 */
function buildRadialImpactGlass(viewW, viewH, frontMat, sideMat) {
  const hw = viewW / 2;
  const hh = viewH / 2;
  const maxR = Math.hypot(hw, hh) * 1.25;

  // Impact epicenter (slightly off-center right near the "." in faheem.devlabs)
  const impactX = viewW * 0.015;
  const impactY = viewH * 0.01;

  const numRays = 18;
  const ringFactors = [0.025, 0.065, 0.125, 0.21, 0.34, 0.52, 0.76, 1.08];
  const numRings = ringFactors.length;

  // 1. Generate irregular radial ray base angles
  const baseAngles = [];
  const stepAngle = (Math.PI * 2) / numRays;
  for (let i = 0; i < numRays; i++) {
    const jitter = (Math.random() - 0.5) * stepAngle * 0.42;
    baseAngles.push(i * stepAngle + jitter);
  }

  // 2. Build polar grid vertices [ring][ray] with organic angular & radial jitter
  const ringVertices = [];
  for (let r = 0; r < numRings; r++) {
    const baseRadius = ringFactors[r] * maxR;
    const row = [];
    for (let s = 0; s < numRays; s++) {
      // Slight bend along each radial crack line as it travels outward
      const angleJitter = (Math.random() - 0.5) * stepAngle * 0.24;
      const radJitter = baseRadius * (1 + (Math.random() - 0.5) * 0.22);
      const a = baseAngles[s] + angleJitter;
      row.push(
        new THREE.Vector2(
          impactX + Math.cos(a) * radJitter,
          impactY + Math.sin(a) * radJitter
        )
      );
    }
    ringVertices.push(row);
  }

  const rawPolys = [];
  const crackLinePositions = [];

  const pushCrackEdge = (p1, p2) => {
    crackLinePositions.push(p1.x, p1.y, 0.015, p2.x, p2.y, 0.015);
  };

  const centerPt = new THREE.Vector2(impactX, impactY);

  // Inner core ring (sharp triangular needle splinters radiating from the impact point)
  for (let s = 0; s < numRays; s++) {
    const nextS = (s + 1) % numRays;
    const p1 = ringVertices[0][s];
    const p2 = ringVertices[0][nextS];
    rawPolys.push([centerPt, p1, p2]);
    pushCrackEdge(centerPt, p1);
    pushCrackEdge(p1, p2);
  }

  // Concentric spiderweb rings (split quads diagonally or keep as jagged 4-sided glass shards)
  for (let r = 0; r < numRings - 1; r++) {
    for (let s = 0; s < numRays; s++) {
      const nextS = (s + 1) % numRays;
      const p00 = ringVertices[r][s];
      const p10 = ringVertices[r + 1][s];
      const p11 = ringVertices[r + 1][nextS];
      const p01 = ringVertices[r][nextS];

      pushCrackEdge(p00, p10);
      pushCrackEdge(p10, p11);

      // Subdivide about 65% of ring cells into sharp triangular glass splinters
      // and leave 35% as angular 4-cornered polygonal glass plates
      if ((r + s) % 3 !== 0) {
        if ((r + s) % 2 === 0) {
          rawPolys.push([p00, p10, p11]);
          rawPolys.push([p00, p11, p01]);
          pushCrackEdge(p00, p11);
        } else {
          rawPolys.push([p00, p10, p01]);
          rawPolys.push([p10, p11, p01]);
          pushCrackEdge(p10, p01);
        }
      } else {
        rawPolys.push([p00, p10, p11, p01]);
      }
    }
  }

  // 3. Clip all polygons to the exact viewport rectangle & extrude into 3D glass shards
  const shards = [];
  const extrudeSettings = {
    depth: 0.11,
    bevelEnabled: false,
    steps: 1,
  };

  for (let i = 0; i < rawPolys.length; i++) {
    const clipped = clipPolygonToScreen(rawPolys[i], hw, hh);
    if (clipped.length < 3) continue;

    // Deduplicate near-identical vertices after clipping
    const cleanPts = [];
    for (let j = 0; j < clipped.length; j++) {
      const prev = cleanPts[cleanPts.length - 1];
      if (!prev || prev.distanceTo(clipped[j]) > 1e-4) {
        cleanPts.push(clipped[j]);
      }
    }
    if (
      cleanPts.length >= 3 &&
      cleanPts[0].distanceTo(cleanPts[cleanPts.length - 1]) <= 1e-4
    ) {
      cleanPts.pop();
    }
    if (cleanPts.length < 3) continue;

    // Compute polygon area to skip microscopic slivers
    let area2 = 0;
    let cx = 0;
    let cy = 0;
    for (let j = 0; j < cleanPts.length; j++) {
      const pA = cleanPts[j];
      const pB = cleanPts[(j + 1) % cleanPts.length];
      area2 += pA.x * pB.y - pB.x * pA.y;
      cx += pA.x;
      cy += pA.y;
    }
    if (Math.abs(area2) < 1e-4) continue;

    cx /= cleanPts.length;
    cy /= cleanPts.length;

    const shape = new THREE.Shape();
    shape.moveTo(cleanPts[0].x - cx, cleanPts[0].y - cy);
    for (let j = 1; j < cleanPts.length; j++) {
      shape.lineTo(cleanPts[j].x - cx, cleanPts[j].y - cy);
    }
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.translate(0, 0, -extrudeSettings.depth);

    // Map screen-space UVs [0..1]
    const posAttr = geom.attributes.position;
    const uvAttr = geom.attributes.uv;
    for (let k = 0; k < posAttr.count; k++) {
      const wx = posAttr.getX(k) + cx;
      const wy = posAttr.getY(k) + cy;
      uvAttr.setXY(k, (wx + hw) / viewW, (wy + hh) / viewH);
    }
    uvAttr.needsUpdate = true;

    const mesh = new THREE.Mesh(geom, [frontMat, sideMat]);
    mesh.position.set(cx, cy, 0);

    // Vector from impact epicenter to shard centroid
    const dx = cx - impactX;
    const dy = cy - impactY;
    const dist = Math.hypot(dx, dy);
    const normDist = Math.min(dist / Math.hypot(hw, hh), 1);
    const angle = Math.atan2(dy, dx);

    // Physics: Shards closest to the hit point get blasted earliest;
    // outer shards peel outward radially like heavy tempered glass plates
    const radialSpeed = (2.1 + (1 - normDist) * 2.4 + Math.random() * 1.1) * 1.35;

    shards.push({
      mesh,
      geom,
      originX: cx,
      originY: cy,
      normDist,
      // Natural ripple wave delay from impact epicenter to outer frame
      delay: normDist * 0.34 + Math.random() * 0.06,
      velX: Math.cos(angle) * radialSpeed + dx * 1.15,
      velY: Math.sin(angle) * radialSpeed + dy * 1.05 - 0.65,
      velZ: (1 - normDist) * 3.2 + 1.0 + Math.random() * 1.8,
      rotX: -Math.sin(angle) * (1.5 + Math.random() * 2.4),
      rotY: Math.cos(angle) * (1.5 + Math.random() * 2.4),
      rotZ: (Math.random() - 0.5) * 1.9,
    });
  }

  // Build glowing white/silver spiderweb crack lines overlay for the instant of impact
  const crackGeom = new THREE.BufferGeometry();
  crackGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(crackLinePositions, 3)
  );
  const crackMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const crackLinesMesh = new THREE.LineSegments(crackGeom, crackMat);

  return { shards, crackLinesMesh, crackGeom, crackMat };
}

export default function IntroLoader({ onComplete }) {
  const mountRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const finishIntro = () => {
      setDone(true);
      if (onCompleteRef.current) onCompleteRef.current();
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const fov = 45;
    const cameraZ = 10;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.z = cameraZ;

    const viewH = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * cameraZ;
    const viewW = viewH * (width / height);

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      finishIntro();
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Glass Specular Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 7, 10);
    scene.add(keyLight);

    const impactPointLight = new THREE.PointLight(0xe5dac3, 0, 22);
    impactPointLight.position.set(0, 0, 3.5);
    scene.add(impactPointLight);

    // 4. Screen Texture & Glass Materials
    const screenTexture = createIntroScreenTexture(width, height);

    const frontMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.18,
      metalness: 0.2,
      transparent: true,
      opacity: 1,
    });

    // Frosted silver/champagne glass fracture thickness edge
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0xf3efe6,
      emissive: 0x5c5346,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 1,
    });

    // 5. Build Radial Impact Spiderweb Shards + Crack Lines
    const { shards, crackLinesMesh, crackGeom, crackMat } =
      buildRadialImpactGlass(viewW, viewH, frontMat, sideMat);

    const shardGroup = new THREE.Group();
    shards.forEach((s) => shardGroup.add(s.mesh));
    scene.add(shardGroup);
    scene.add(crackLinesMesh);

    // 6. Natural Cinematic Glass Impact Timeline
    // 0.00s - 1.05s: Calm, intact glass screen
    // 1.05s - 2.05s: Strike & Tension! Spiderweb cracks spread outward from the hit point and hold under tension
    // 2.05s - 4.10s: Graceful 3D slow-motion glass break & drift away from screen
    const IMPACT_TIME = 1.05;
    const CRACK_HOLD = 1.0;
    const SHATTER_TIME = IMPACT_TIME + CRACK_HOLD;
    const FLY_DURATION = 2.05;
    const TOTAL_TIME = SHATTER_TIME + FLY_DURATION;

    const startTime = performance.now();
    let rafId = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeInQuad = (t) => t * t;

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000;

      if (elapsed >= TOTAL_TIME) {
        finishIntro();
        return;
      }

      if (elapsed >= IMPACT_TIME) {
        // Phase A: Spiderweb Crack Spread & Tension Hold (1.05s -> 2.05s)
        const crackT = Math.min((elapsed - IMPACT_TIME) / CRACK_HOLD, 1);
        // Cracks spread over the first 60% of CRACK_HOLD, then hold taut for the remaining 40%
        const spreadProgress = Math.min(crackT / 0.62, 1);
        const crackEase = easeOutCubic(spreadProgress);

        if (elapsed < SHATTER_TIME + 0.25) {
          crackMat.opacity =
            elapsed < SHATTER_TIME
              ? Math.min(spreadProgress * 1.4, 0.85)
              : Math.max(0.85 * (1 - (elapsed - SHATTER_TIME) / 0.25), 0);
          crackLinesMesh.scale.setScalar(0.18 + 0.82 * crackEase);
          impactPointLight.intensity = 5.0 * Math.sin(crackT * Math.PI);
        } else {
          crackMat.opacity = 0;
        }

        if (elapsed > SHATTER_TIME + 0.3) {
          container.style.pointerEvents = "none";
        }

        shards.forEach((s) => {
          // Cracks reach inner shards first, then travel to outer glass edges
          const localCrack = Math.max(
            0,
            Math.min((spreadProgress - s.normDist * 0.55) / 0.45, 1)
          );
          const localCrackEase = easeOutCubic(localCrack);

          // Physical glass strike dent: center shards buckle slightly & catch the light
          const dentZ = (1 - s.normDist) * 0.24 * localCrackEase;
          let x = s.originX * (1 + localCrackEase * 0.022);
          let y = s.originY * (1 + localCrackEase * 0.022);
          let z = dentZ;
          let rx = s.rotX * 0.045 * localCrackEase;
          let ry = s.rotY * 0.045 * localCrackEase;
          let rz = s.rotZ * 0.03 * localCrackEase;

          // Phase B: Natural, weighted 3D release & drift away from screen
          const flyElapsed = elapsed - SHATTER_TIME - s.delay;
          if (flyElapsed > 0) {
            const flyT = Math.min(flyElapsed / (FLY_DURATION - 0.35), 1);
            const drift = easeInOutCubic(flyT);
            const gravityDrop = easeInQuad(flyT) * 1.35;

            x += s.velX * drift;
            y += s.velY * drift - gravityDrop;
            z += s.velZ * drift;
            rx += s.rotX * drift;
            ry += s.rotY * drift;
            rz += s.rotZ * drift;
          }

          s.mesh.position.set(x, y, z);
          s.mesh.rotation.set(rx, ry, rz);
        });

        // Smooth fade out at the end of the drift
        const fadeStart = SHATTER_TIME + FLY_DURATION * 0.68;
        if (elapsed > fadeStart) {
          const fadeT = Math.min(
            (elapsed - fadeStart) / (TOTAL_TIME - fadeStart),
            1
          );
          frontMat.opacity = 1 - fadeT;
          sideMat.opacity = 1 - fadeT;
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      shards.forEach((s) => s.geom.dispose());
      crackGeom.dispose();
      crackMat.dispose();
      frontMat.dispose();
      sideMat.dispose();
      screenTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={mountRef}
      className="intro-webgl-stage"
      aria-hidden="true"
    />
  );
}
