'use client';

import React, { useEffect, useRef } from 'react';

export const PaintHeroShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const gl =
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
      if (!gl) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Fluid Acrylic Wet Paint Mixing
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      // Simplex noise / turbulence
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y;
        
        vec2 mouseNorm = u_mouse / u_resolution.xy;
        float distToMouse = distance(st, mouseNorm);
        float mouseWave = sin(distToMouse * 12.0 - u_time * 2.5) * exp(-distToMouse * 3.5);

        // Domain warping for wet acrylic impasto swirl
        vec2 q = vec2(
          snoise(st * 2.0 + vec2(0.0, u_time * 0.08)),
          snoise(st * 2.0 + vec2(5.2, 1.3 + u_time * 0.06))
        );

        vec2 r = vec2(
          snoise(st * 3.0 + 4.0 * q + vec2(1.7 - u_time * 0.05, 9.2) + mouseWave * 0.4),
          snoise(st * 3.0 + 4.0 * q + vec2(8.3, 2.8 + u_time * 0.05) + mouseWave * 0.4)
        );

        float f = snoise(st * 2.5 + 4.0 * r);

        // Artora signature luxury colors:
        // Deep Void Black (#0A0A0C), Electric Crimson (#FF2A5F), Liquid Gold (#E6B93F), Cyber Violet (#7C3AED)
        vec3 colVoid = vec3(0.039, 0.039, 0.047);
        vec3 colCrimson = vec3(1.0, 0.165, 0.373);
        vec3 colGold = vec3(0.902, 0.725, 0.247);
        vec3 colViolet = vec3(0.486, 0.227, 0.929);

        // Layer color blending
        vec3 color = mix(colVoid, colViolet, clamp(length(q), 0.0, 1.0) * 0.85);
        color = mix(color, colCrimson, clamp(length(r.x), 0.0, 1.0) * 0.7);
        color = mix(color, colGold, clamp(f * f * 2.5, 0.0, 1.0) * 0.6);

        // Impasto light specular ridge effect
        float ridge = smoothstep(0.4, 0.7, f);
        color += colGold * ridge * 0.25;

        // Subtle vignette
        float vignette = 1.0 - smoothstep(0.5, 1.5, length(st - 0.5));
        color *= vignette;

        gl_FragColor = vec4(color, 0.75);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    let startTime = Date.now();

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const currentTime = (Date.now() - startTime) * 0.001;
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform2f(mouseLocation, mouse.x, mouse.y);
      gl.uniform1f(timeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  } catch (err) {
    console.warn('WebGL Shader init error:', err);
  }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65 mix-blend-screen transition-opacity duration-1000"
      />
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-void/60 to-void pointer-events-none" />
    </div>
  );
};
