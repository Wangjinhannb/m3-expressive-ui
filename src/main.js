import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

const mobile = matchMedia('(max-width: 760px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const config = {
  exposure: 1.08,
  bloom: mobile ? 0.10 : 0.18,
  cameraSway: 0.70,
  keyLight: 5.4,
  rimLight: 2.2,
  breath: reducedMotion ? 0 : 0.24
};

const stage = document.querySelector('#stage');
const loading = document.querySelector('#loading');
const soundButton = document.querySelector('#soundButton');
const resetButton = document.querySelector('#resetButton');
const debugPanel = document.querySelector('#debugPanel');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080705);
scene.fog = new THREE.FogExp2(0x080705, 0.065);

const camera = new THREE.PerspectiveCamera(mobile ? 38 : 32, innerWidth / innerHeight, 0.1, 100);
camera.position.set(mobile ? 0.35 : 0.75, 0.18, mobile ? 7.7 : 6.45);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
  stencil: false
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = config.exposure;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
stage.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), config.bloom, 0.62, 0.88);
composer.addPass(bloomPass);
if (!mobile) composer.addPass(new SMAAPass(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio()));

const clock = new THREE.Clock();

const pointer = new THREE.Vector2();
const pointerSoft = new THREE.Vector2();
let dragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragYawStart = 0;
let dragPitchStart = 0;
let manualYaw = 0;
let manualPitch = 0;

const state = {
  wake: 0,
  lastBeat: 0,
  sound: false
};

const lion = new THREE.Group();
lion.position.set(mobile ? 0.45 : 1.05, 0.08, 0);
lion.rotation.set(0.03, -0.10, -0.018);
scene.add(lion);

const rig = new THREE.Group();
rig.add(lion);
scene.add(rig);

function proceduralFiberTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#888';
  ctx.fillRect(0, 0, size, size);
  const image = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const weave = Math.sin(x * 0.55) * 10 + Math.sin(y * 0.71) * 7;
      const noise = (Math.random() - 0.5) * 22;
      const v = Math.max(0, Math.min(255, 126 + weave + noise));
      image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

const fiber = proceduralFiberTexture();
fiber.colorSpace = THREE.NoColorSpace;

const paperMat = new THREE.MeshStandardMaterial({
  color: 0x7d1718,
  roughness: 0.82,
  metalness: 0.02,
  bumpMap: fiber,
  bumpScale: 0.035
});
const lacquerMat = new THREE.MeshPhysicalMaterial({
  color: 0x6d0f13,
  roughness: 0.30,
  metalness: 0.05,
  clearcoat: 0.22,
  clearcoatRoughness: 0.42,
  bumpMap: fiber,
  bumpScale: 0.012
});
const blackLacquer = new THREE.MeshPhysicalMaterial({
  color: 0x110b09,
  roughness: 0.28,
  metalness: 0.03,
  clearcoat: 0.20,
  clearcoatRoughness: 0.35
});
const goldMat = new THREE.MeshStandardMaterial({
  color: 0xb69455,
  roughness: 0.33,
  metalness: 0.78
});
const cyanMat = new THREE.MeshStandardMaterial({
  color: 0x315f67,
  roughness: 0.48,
  metalness: 0.08
});
const ivoryMat = new THREE.MeshStandardMaterial({
  color: 0xe5dcc6,
  roughness: 0.46,
  metalness: 0.01
});
const mouthMat = new THREE.MeshStandardMaterial({
  color: 0x160607,
  roughness: 0.72
});
const furMat = new THREE.MeshStandardMaterial({
  color: 0x941a18,
  roughness: 0.92,
  metalness: 0
});
const furDarkMat = new THREE.MeshStandardMaterial({
  color: 0x3a0a0a,
  roughness: 0.96,
  metalness: 0
});

const headRoot = new THREE.Group();
lion.add(headRoot);

const shellGeo = new THREE.SphereGeometry(1.55, 96, 64);
shellGeo.scale(1.0, 0.91, 0.78);
const shell = new THREE.Mesh(shellGeo, paperMat);
shell.castShadow = shell.receiveShadow = true;
shell.position.z = 0;
headRoot.add(shell);

const facePlate = new THREE.Mesh(new THREE.SphereGeometry(1.43, 80, 56, 0, Math.PI * 2, 0.08, Math.PI * 0.82), blackLacquer);
facePlate.scale.set(1, 0.90, 0.74);
facePlate.position.z = 0.13;
facePlate.rotation.x = -0.02;
headRoot.add(facePlate);

function ring(radius, tube, colorMat, position, rotation = [0, 0, 0], arc = Math.PI * 2) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 80, arc), colorMat);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  return mesh;
}

const crownRing = ring(1.30, 0.055, goldMat, [0, 0.1, 0.75], [0, 0, 0]);
crownRing.scale.y = 0.90;
headRoot.add(crownRing);

const foreheadDisk = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.075, 64), lacquerMat);
foreheadDisk.rotation.x = Math.PI / 2;
foreheadDisk.position.set(0, 0.78, 1.07);
headRoot.add(foreheadDisk);

const foreheadGold = ring(0.34, 0.035, goldMat, [0, 0.78, 1.115], [Math.PI / 2, 0, 0]);
headRoot.add(foreheadGold);

const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.13, 1), cyanMat);
gem.scale.set(1.35, 1.65, 0.48);
gem.position.set(0, 0.82, 1.20);
gem.rotation.z = Math.PI / 4;
headRoot.add(gem);

const horn = new THREE.Group();
const hornBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.23, 0.22, 32), goldMat);
hornBase.position.y = 0.03;
horn.add(hornBase);
const hornCone = new THREE.Mesh(new THREE.ConeGeometry(0.145, 0.78, 48), ivoryMat);
hornCone.position.y = 0.48;
hornCone.rotation.z = -0.04;
horn.add(hornCone);
horn.position.set(0, 1.20, 0.31);
horn.rotation.x = -0.12;
headRoot.add(horn);

function createEye(side) {
  const g = new THREE.Group();
  const s = side;
  const socket = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.09, 18, 72), goldMat);
  socket.rotation.x = Math.PI / 2;
  g.add(socket);

  const white = new THREE.Mesh(new THREE.SphereGeometry(0.38, 56, 40), ivoryMat);
  white.scale.z = 0.48;
  white.position.z = 0.025;
  g.add(white);

  const iris = new THREE.Mesh(new THREE.SphereGeometry(0.20, 48, 32), cyanMat);
  iris.scale.z = 0.52;
  iris.position.z = 0.27;
  g.add(iris);

  const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.105, 40, 28), blackLacquer);
  pupil.scale.z = 0.60;
  pupil.position.z = 0.385;
  g.add(pupil);

  const catchLight = new THREE.Mesh(new THREE.SphereGeometry(0.035, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  catchLight.position.set(-0.055 * s, 0.075, 0.47);
  g.add(catchLight);

  g.position.set(0.58 * s, 0.36, 1.03);
  g.rotation.x = -0.03;
  return { group: g, iris, pupil };
}

const leftEye = createEye(-1);
const rightEye = createEye(1);
headRoot.add(leftEye.group, rightEye.group);

function createBrow(side) {
  const s = side;
  const pts = [
    new THREE.Vector3(-0.39 * s, 0.03, 0),
    new THREE.Vector3(-0.16 * s, 0.17, 0.04),
    new THREE.Vector3(0.10 * s, 0.19, 0.02),
    new THREE.Vector3(0.34 * s, 0.05, 0)
  ];
  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.055, 10, false), goldMat);
  const g = new THREE.Group();
  g.add(tube);
  g.position.set(0.58 * s, 0.79, 1.06);
  return g;
}

const leftBrow = createBrow(-1);
const rightBrow = createBrow(1);
headRoot.add(leftBrow, rightBrow);

function createEar(side) {
  const s = side;
  const g = new THREE.Group();
  const outer = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.72, 5), paperMat);
  outer.scale.set(1.1, 1, 0.35);
  outer.rotation.z = -s * 0.23;
  g.add(outer);

  const inner = new THREE.Mesh(new THREE.ConeGeometry(0.23, 0.47, 5), cyanMat);
  inner.scale.set(1, 1, 0.26);
  inner.position.z = 0.09;
  inner.rotation.z = -s * 0.23;
  g.add(inner);

  g.position.set(1.37 * s, 0.55, 0.25);
  g.rotation.y = -s * 0.38;
  return g;
}

const leftEar = createEar(-1);
const rightEar = createEar(1);
headRoot.add(leftEar, rightEar);

const nose = new THREE.Mesh(new THREE.SphereGeometry(0.26, 48, 32), goldMat);
nose.scale.set(1.15, 0.72, 0.70);
nose.position.set(0, -0.09, 1.27);
headRoot.add(nose);

const noseInset = new THREE.Mesh(new THREE.SphereGeometry(0.15, 40, 28), blackLacquer);
noseInset.scale.set(1.1, 0.62, 0.42);
noseInset.position.set(0, -0.08, 1.43);
headRoot.add(noseInset);

function muzzle(side) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.48, 52, 36), paperMat);
  m.scale.set(1.10, 0.63, 0.44);
  m.position.set(0.36 * side, -0.36, 1.11);
  return m;
}
headRoot.add(muzzle(-1), muzzle(1));

const jaw = new THREE.Group();
jaw.position.set(0, -0.72, 0.42);
const jawOuter = new THREE.Mesh(new THREE.SphereGeometry(0.86, 64, 40), paperMat);
jawOuter.scale.set(1.0, 0.42, 0.57);
jawOuter.position.z = 0.58;
jaw.add(jawOuter);
const jawGold = ring(0.63, 0.045, goldMat, [0, 0.01, 0.94], [Math.PI / 2, 0, 0], Math.PI);
jawGold.rotation.z = Math.PI;
jaw.add(jawGold);
const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.57, 48, 30), mouthMat);
mouth.scale.set(1, 0.30, 0.30);
mouth.position.set(0, 0.05, 0.93);
jaw.add(mouth);

for (const x of [-0.18, 0.18]) {
  const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.20, 4), ivoryMat);
  tooth.position.set(x, -0.01, 1.13);
  tooth.rotation.x = Math.PI;
  jaw.add(tooth);
}
headRoot.add(jaw);

function tubeStroke(points, material, radius = 0.025) {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 8, false), material);
}

const cheekLines = [
  [-1, [
    [-1.05, 0.04, 1.0], [-1.14, -0.22, 1.04], [-1.02, -0.49, 1.0], [-0.78, -0.62, 1.03]
  ]],
  [1, [
    [1.05, 0.04, 1.0], [1.14, -0.22, 1.04], [1.02, -0.49, 1.0], [0.78, -0.62, 1.03]
  ]]
];
for (const [, arr] of cheekLines) {
  headRoot.add(tubeStroke(arr.map(p => new THREE.Vector3(...p)), goldMat, 0.033));
}

for (const side of [-1, 1]) {
  const swirl1 = tubeStroke([
    new THREE.Vector3(0.22 * side, 0.96, 1.10),
    new THREE.Vector3(0.42 * side, 1.08, 1.02),
    new THREE.Vector3(0.72 * side, 0.98, 0.99),
    new THREE.Vector3(0.86 * side, 0.84, 1.00)
  ], goldMat, 0.027);
  headRoot.add(swirl1);

  const swirl2 = tubeStroke([
    new THREE.Vector3(0.82 * side, 0.08, 1.10),
    new THREE.Vector3(1.03 * side, -0.03, 1.05),
    new THREE.Vector3(1.18 * side, -0.20, 0.91)
  ], cyanMat, 0.035);
  headRoot.add(swirl2);
}

function pompom(position, color = 0xb62d25, radius = 0.16) {
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.65, 20, 14), new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
  group.add(core);
  const tuftGeo = new THREE.ConeGeometry(radius * 0.07, radius * 0.42, 5);
  const tuftMat = new THREE.MeshStandardMaterial({ color, roughness: 1 });
  const count = mobile ? 26 : 42;
  const inst = new THREE.InstancedMesh(tuftGeo, tuftMat, count);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );
    dummy.position.copy(dir).multiplyScalar(radius * 0.62);
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    dummy.scale.setScalar(0.8 + Math.random() * 0.45);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  group.add(inst);
  group.position.set(...position);
  return group;
}

const poms = [
  pompom([-1.13, 1.05, 0.48], 0xa92d24, 0.17),
  pompom([1.13, 1.05, 0.48], 0xa92d24, 0.17),
  pompom([-1.43, -0.07, 0.42], 0x2e6970, 0.15),
  pompom([1.43, -0.07, 0.42], 0x2e6970, 0.15)
];
headRoot.add(...poms);

const maneGroup = new THREE.Group();
headRoot.add(maneGroup);

function createMane() {
  const segments = mobile ? 150 : 260;
  const geo = new THREE.ConeGeometry(0.06, 0.40, 5);
  geo.translate(0, 0.20, 0);
  const inst = new THREE.InstancedMesh(geo, furMat, segments);
  const instDark = new THREE.InstancedMesh(geo, furDarkMat, Math.floor(segments * 0.35));
  const dummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const x = Math.cos(a) * 1.53;
    const y = Math.sin(a) * 1.38 + 0.02;
    const z = 0.06 + Math.sin(a * 3.0) * 0.06;
    const dir = new THREE.Vector3(Math.cos(a), Math.sin(a) * 0.92, 0.12).normalize();
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromUnitVectors(up, dir);
    const scale = 0.76 + Math.sin(a * 5.0) * 0.10 + Math.random() * 0.30;
    dummy.scale.set(1, scale, 1);
    dummy.rotation.z += (Math.random() - 0.5) * 0.08;
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }

  const darkCount = Math.floor(segments * 0.35);
  for (let i = 0; i < darkCount; i++) {
    const a = (i / darkCount) * Math.PI * 2 + 0.08;
    const x = Math.cos(a) * 1.61;
    const y = Math.sin(a) * 1.46;
    const dir = new THREE.Vector3(Math.cos(a), Math.sin(a), 0.1).normalize();
    dummy.position.set(x, y, -0.02);
    dummy.quaternion.setFromUnitVectors(up, dir);
    dummy.scale.set(0.88, 0.74 + Math.random() * 0.18, 0.88);
    dummy.updateMatrix();
    instDark.setMatrixAt(i, dummy.matrix);
  }
  maneGroup.add(instDark, inst);
}
createMane();

const neckCloth = new THREE.Mesh(
  new THREE.PlaneGeometry(3.1, 2.9, 48, 48),
  new THREE.MeshStandardMaterial({
    color: 0x5f1115,
    roughness: 0.74,
    metalness: 0.02,
    side: THREE.DoubleSide,
    bumpMap: fiber,
    bumpScale: 0.02
  })
);
neckCloth.position.set(0, -1.65, -0.55);
neckCloth.rotation.x = -0.16;
headRoot.add(neckCloth);

const pedestal = new THREE.Mesh(
  new THREE.CylinderGeometry(2.15, 2.55, 0.36, 96),
  new THREE.MeshStandardMaterial({ color: 0x15110e, roughness: 0.84, metalness: 0.05 })
);
pedestal.position.set(0.0, -2.25, -0.65);
pedestal.receiveShadow = true;
lion.add(pedestal);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(12, 96),
  new THREE.MeshStandardMaterial({ color: 0x090806, roughness: 0.98, metalness: 0 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.43;
floor.receiveShadow = true;
scene.add(floor);

const keyLight = new THREE.SpotLight(0xffc98c, config.keyLight, 14, Math.PI * 0.26, 0.48, 1.4);
keyLight.position.set(-4.6, 4.8, 5.2);
keyLight.target.position.set(0.6, 0.2, 0);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
scene.add(keyLight, keyLight.target);

const rimLight = new THREE.SpotLight(0x6f9eaa, config.rimLight, 12, Math.PI * 0.30, 0.60, 1.3);
rimLight.position.set(4.8, 2.4, -3.8);
rimLight.target.position.set(0.5, 0.15, 0);
scene.add(rimLight, rimLight.target);

const fill = new THREE.PointLight(0x8b4438, 0.68, 8, 2);
fill.position.set(2.0, -0.3, 3.7);
scene.add(fill);

const topWarm = new THREE.PointLight(0xffd6a2, 0.52, 10, 2);
topWarm.position.set(-0.8, 4.5, 1.2);
scene.add(topWarm);

const dustGeo = new THREE.BufferGeometry();
const dustCount = mobile ? 90 : 180;
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
  dustPos[i * 3] = (Math.random() - 0.5) * 10;
  dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
  dustPos[i * 3 + 2] = (Math.random() - 0.5) * 7;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(
  dustGeo,
  new THREE.PointsMaterial({
    color: 0xd8b98b,
    size: mobile ? 0.012 : 0.016,
    transparent: true,
    opacity: 0.20,
    depthWrite: false
  })
);
scene.add(dust);

class Spring {
  constructor(stiffness, damping) {
    this.k = stiffness;
    this.d = damping;
    this.x = 0;
    this.v = 0;
    this.target = 0;
  }
  impulse(value) { this.v += value; }
  update(dt) {
    const a = -this.k * (this.x - this.target) - this.d * this.v;
    this.v += a * dt;
    this.x += this.v * dt;
    return this.x;
  }
}

const headKick = new Spring(45, 9.6);
const jawKick = new Spring(90, 12.5);
const earKickL = new Spring(66, 8.5);
const earKickR = new Spring(66, 8.5);
const browKick = new Spring(100, 14);
const maneKick = new Spring(85, 4.2);

let audioCtx = null;
function drum() {
  if (!state.sound) return;
  audioCtx ||= new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(105, t);
  osc.frequency.exponentialRampToValueAtTime(52, t + 0.16);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.68, t + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.42);

  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.18, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.3);
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 950;
  filter.Q.value = 0.7;
  const nGain = audioCtx.createGain();
  nGain.gain.value = 0.08;
  noise.connect(filter).connect(nGain).connect(audioCtx.destination);
  noise.start(t);
}

function wakeLion() {
  const now = performance.now();
  const rapid = now - state.lastBeat < 360;
  state.lastBeat = now;
  state.wake = Math.min(1, state.wake + (rapid ? 0.20 : 0.10));

  headKick.impulse(rapid ? 1.85 : 1.15);
  jawKick.impulse(rapid ? 2.7 : 1.65);
  earKickL.impulse(rapid ? 2.2 : 1.25);
  earKickR.impulse(rapid ? -1.9 : -1.15);
  browKick.impulse(rapid ? 1.8 : 0.95);
  maneKick.impulse(rapid ? 2.8 : 1.55);
  drum();
}

function damp(current, target, lambda, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

stage.addEventListener('pointerdown', e => {
  dragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragYawStart = manualYaw;
  dragPitchStart = manualPitch;
  stage.setPointerCapture(e.pointerId);
});

stage.addEventListener('pointermove', e => {
  const r = stage.getBoundingClientRect();
  pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);

  if (dragging) {
    manualYaw = THREE.MathUtils.clamp(dragYawStart + (e.clientX - dragStartX) * 0.0036, -0.18, 0.18);
    manualPitch = THREE.MathUtils.clamp(dragPitchStart + (e.clientY - dragStartY) * 0.0025, -0.10, 0.10);
  }
});

stage.addEventListener('pointerup', e => {
  const moved = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
  dragging = false;
  if (moved < 9) wakeLion();
});

stage.addEventListener('pointercancel', () => { dragging = false; });

soundButton.addEventListener('click', () => {
  state.sound = !state.sound;
  soundButton.textContent = state.sound ? 'SOUND ON' : 'SOUND';
  if (state.sound) {
    audioCtx ||= new AudioContext();
    audioCtx.resume();
    wakeLion();
  }
});

resetButton.addEventListener('click', () => {
  manualYaw = 0;
  manualPitch = 0;
  state.wake = 0;
});

addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'd') debugPanel.hidden = !debugPanel.hidden;
  if (e.code === 'Space') {
    e.preventDefault();
    wakeLion();
  }
});

debugPanel.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    config[input.dataset.key] = Number(input.value);
    renderer.toneMappingExposure = config.exposure;
    bloomPass.strength = config.bloom;
    keyLight.intensity = config.keyLight;
    rimLight.intensity = config.rimLight;
  });
});

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
}
addEventListener('resize', resize);

setTimeout(() => loading.classList.add('hide'), 450);

const initialRot = lion.rotation.clone();

function animate() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  const t = clock.elapsedTime;

  pointerSoft.x = damp(pointerSoft.x, pointer.x, 4.2, dt);
  pointerSoft.y = damp(pointerSoft.y, pointer.y, 4.2, dt);

  const sway = config.cameraSway;
  const targetX = (mobile ? 0.35 : 0.75) + pointerSoft.x * 0.17 * sway;
  const targetY = 0.18 + pointerSoft.y * 0.11 * sway;
  camera.position.x = damp(camera.position.x, targetX, 3.4, dt);
  camera.position.y = damp(camera.position.y, targetY, 3.4, dt);

  const look = new THREE.Vector3(
    (mobile ? 0.35 : 0.68) + pointerSoft.x * 0.13 * sway,
    0.10 + pointerSoft.y * 0.08 * sway,
    0.15
  );
  camera.lookAt(look);

  const headValue = headKick.update(dt);
  const jawValue = jawKick.update(dt);
  const earL = earKickL.update(dt);
  const earR = earKickR.update(dt);
  const browValue = browKick.update(dt);
  const maneValue = maneKick.update(dt);

  const breathe = Math.sin(t * 0.68) * 0.012 * config.breath;
  lion.rotation.y = damp(lion.rotation.y, initialRot.y + manualYaw + pointerSoft.x * 0.035 + headValue * 0.012, 7.5, dt);
  lion.rotation.x = damp(lion.rotation.x, initialRot.x + manualPitch - pointerSoft.y * 0.018 - headValue * 0.007 + breathe, 7.5, dt);

  jaw.rotation.x = THREE.MathUtils.clamp(jawValue * 0.08, -0.02, 0.28);
  leftEar.rotation.z = -0.10 + earL * 0.055;
  rightEar.rotation.z = 0.10 + earR * 0.055;
  leftBrow.rotation.z = -0.03 - browValue * 0.018;
  rightBrow.rotation.z = 0.03 + browValue * 0.018;

  const eyeYaw = THREE.MathUtils.clamp(pointerSoft.x * 0.09 + manualYaw * 0.20, -0.11, 0.11);
  const eyePitch = THREE.MathUtils.clamp(pointerSoft.y * 0.055 - manualPitch * 0.14, -0.07, 0.07);
  leftEye.iris.position.x = -eyeYaw;
  rightEye.iris.position.x = -eyeYaw;
  leftEye.iris.position.y = eyePitch;
  rightEye.iris.position.y = eyePitch;
  leftEye.pupil.position.x = -eyeYaw * 1.18;
  rightEye.pupil.position.x = -eyeYaw * 1.18;
  leftEye.pupil.position.y = eyePitch * 1.12;
  rightEye.pupil.position.y = eyePitch * 1.12;

  maneGroup.rotation.z = Math.sin(t * 0.9) * 0.003 * config.breath + maneValue * 0.015;
  maneGroup.scale.x = 1 + Math.abs(maneValue) * 0.006;
  maneGroup.scale.y = 1 + Math.abs(maneValue) * 0.012;

  poms.forEach((p, i) => {
    p.rotation.z = Math.sin(t * 1.2 + i) * 0.02 * config.breath + maneValue * (i % 2 ? -0.016 : 0.016);
  });

  dust.rotation.y = t * 0.012;
  dust.position.y = Math.sin(t * 0.18) * 0.05;

  const wakeGlow = state.wake;
  fill.intensity = 0.68 + wakeGlow * 0.55;
  rimLight.intensity = config.rimLight + wakeGlow * 0.45;

  composer.render();
  requestAnimationFrame(animate);
}

animate();
