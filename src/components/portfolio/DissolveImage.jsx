'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * DissolveImage — a WebGL particle-dissolve reveal used on Portfolio &
 * About (the uploaded "clair-obscur gommage" effect was WebGPU, which
 * can't be a hard dependency across browsers; this preserves the same
 * feeling — an image that erodes/reassembles into drifting particles on
 * hover — using portable WebGL).
 *
 * The image is sampled onto a point cloud; on hover the points scatter
 * along a noise field and fade, then settle back. Falls back to a plain
 * <img> when WebGL/reduced-motion is unavailable.
 */
export default function DissolveImage({ src, alt = '', className = '', style = {} }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imgFallbackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
    catch (e) { if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'block'; return; }
    if (reduced) { if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'block'; renderer.dispose(); return; }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 10);
    camera.position.z = 1;

    let points, geometry, material, raf = 0, disposed = false;
    let hover = 0, hoverTarget = 0;

    const GRID = 160; // sample resolution

    const loader = new THREE.TextureLoader();
    loader.load(src, (tex) => {
      if (disposed) { tex.dispose(); return; }
      const aspect = tex.image.width / tex.image.height;

      // Build point cloud sampling the image UV grid.
      const count = GRID * GRID;
      const positions = new Float32Array(count * 3);
      const uvs = new Float32Array(count * 2);
      const rnd = new Float32Array(count);
      let i = 0;
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const u = x / (GRID - 1);
          const v = y / (GRID - 1);
          positions[i * 3 + 0] = (u - 0.5) * (aspect >= 1 ? 1 : aspect);
          positions[i * 3 + 1] = (v - 0.5) * (aspect >= 1 ? 1 / aspect : 1);
          positions[i * 3 + 2] = 0;
          uvs[i * 2 + 0] = u;
          uvs[i * 2 + 1] = v;
          rnd[i] = Math.random();
          i++;
        }
      }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));
      geometry.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));

      material = new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        uniforms: {
          uTex: { value: tex },
          uTime: { value: 0 },
          uHover: { value: 0 },
          uSize: { value: 2.0 * dpr },
        },
        vertexShader: /* glsl */ `
          attribute vec2 aUv; attribute float aRnd;
          uniform float uTime; uniform float uHover; uniform float uSize;
          varying vec2 vUv; varying float vAlpha;
          void main(){
            vUv = aUv;
            vec3 p = position;
            float scatter = uHover * (0.4 + aRnd * 0.6);
            float ang = aRnd * 6.2831 + uTime * 0.5;
            p.x += cos(ang) * scatter * 0.15;
            p.y += sin(ang) * scatter * 0.15;
            p.z += (aRnd - 0.5) * scatter * 0.3;
            vAlpha = 1.0 - uHover * (0.3 + aRnd * 0.7);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * (1.0 + uHover * 1.5);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uTex;
          varying vec2 vUv; varying float vAlpha;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            if (dot(c,c) > 0.25) discard;
            vec4 col = texture2D(uTex, vUv);
            gl_FragColor = vec4(col.rgb, col.a * vAlpha);
          }
        `,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);
      if (imgFallbackRef.current) imgFallbackRef.current.style.display = 'none';

      const start = performance.now();
      const render = (now) => {
        raf = requestAnimationFrame(render);
        hover += (hoverTarget - hover) * 0.08;
        material.uniforms.uTime.value = (now - start) / 1000;
        material.uniforms.uHover.value = hover;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(render);
    });

    const size = () => {
      const r = wrap.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      const aspect = r.width / r.height;
      camera.left = -0.5 * aspect; camera.right = 0.5 * aspect;
      camera.top = 0.5; camera.bottom = -0.5;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(wrap);
    size();

    const enter = () => { hoverTarget = 1; };
    const leave = () => { hoverTarget = 0; };
    wrap.addEventListener('pointerenter', enter);
    wrap.addEventListener('pointerleave', leave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener('pointerenter', enter);
      wrap.removeEventListener('pointerleave', leave);
      geometry && geometry.dispose();
      material && material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgFallbackRef} src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'none' }} />
    </div>
  );
}
