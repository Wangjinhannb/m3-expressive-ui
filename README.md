# WANXIANG V4 - Lion Pass 1

This branch is an isolated visual-quality prototype for the Lion chapter of WANXIANG.

## Goal

The target is not "a working Three.js demo". The target is a frame that can stand alone as a refined digital-art scene, then remain convincing when the viewer drags the camera or inspects details.

This pass focuses only on:

- restrained camera parallax and drag-to-look;
- separate material responses for paper shell, lacquer, metallic gold, fur and cloth;
- layered lighting instead of flat ambient light;
- independent eye, brow, ear, jaw and mane responses;
- subtle idle motion so the scene never feels frozen;
- tap / Space drum impulses;
- mobile-aware rendering budget;
- a hidden tuning panel for repeated visual iteration.

## Run

Use a local HTTP server. Direct file opening may be blocked by browser ES-module rules.

### Option A - VS Code

Open the folder and use Live Server.

### Option B - Python

```powershell
python -m http.server 8080
```

This command starts a simple local web server in the current folder so browser ES modules can load correctly.

Then open:

```text
http://localhost:8080
```

## Controls

- Move pointer: very small camera parallax.
- Drag: constrained look-around.
- Click / tap: wake impulse.
- Space: wake impulse.
- Sound: enables synthesized drum feedback.
- D: opens the tuning panel.
- Reset: returns to the authored framing.

## Important

This is a visual-quality benchmark scene, not the final culturally verified lion model.

The current geometry is built in code so camera, materials, lighting and interaction can be tuned immediately. The final competition build should replace the procedural lion geometry with a culturally verified optimized GLB while preserving the same camera, material separation and interaction rig.

## Reference direction

A downloadable cultural-heritage lion head model from Hong Kong Shue Yan University's Teaching and Learning Development Office is available on Sketchfab under CC Attribution. It is useful as a form reference, but at about 1.1M triangles it should be retopologized before use in a mobile web build.

## Tech

- Three.js 0.186.1
- EffectComposer
- restrained UnrealBloomPass
- SMAA on desktop
- ACES Filmic tone mapping
- procedural fiber bump texture
- custom damped spring responses
- Web Audio drum synthesis

No AI-generated image is used as a runtime scene texture.
