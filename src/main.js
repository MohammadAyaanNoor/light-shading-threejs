import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertex from './Shaders/vertex.vert'
import fragment from './Shaders/fragment.frag'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


const canvas = document.querySelector('.webgl');
const gltfLoader = new GLTFLoader();

const scene = new THREE.Scene();

const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms:{
    uTime : new THREE.Uniform(0)
  }
})

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -3;
scene.add(sphere);
const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
  material
)
knot.position.x = 3;
scene.add(knot);

let skull = null;
gltfLoader.load('/models/skull.glb',(gltf)=>{
  skull = gltf.scene;
  skull.traverse((child)=>{
    if(child.isMesh){
      child.material = material;
    }

  })
  scene.add(skull);
})



const sizes ={
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 7;
camera.position.y = 7;
camera.position.z = 7;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1



  const directionalLightHelper = new THREE.Mesh(
    new THREE.PlaneGeometry(),
    new THREE.MeshBasicMaterial()
  )
  directionalLightHelper.position.set(0,0,3);
  directionalLightHelper.material.color.setRGB(0.1,0.1,1)
  directionalLightHelper.material.side = THREE.DoubleSide;
  
  scene.add(directionalLightHelper)

  const pointLightHelper = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1,2),
    new THREE.MeshBasicMaterial()
  )
  pointLightHelper.position.set(0,2.5,0)
  pointLightHelper.material.color.setRGB(1.0,0.1,0.1)
  scene.add(pointLightHelper)
  const pointLightHelper2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1,2),
    new THREE.MeshBasicMaterial()
  )
  pointLightHelper2.position.set(2,2,2)
  pointLightHelper2.material.color.setRGB(0.1,1.0,0.5)
  scene.add(pointLightHelper2)

const clock = new THREE.Clock();

function tick(){
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  if(skull){
    skull.rotation.x = elapsedTime * 0.1 ;
    skull.rotation.y = -elapsedTime * 0.2 ;
  }
  
  sphere.rotation.x = -elapsedTime * 0.2 ;
  sphere.rotation.y =  elapsedTime * 0.1 ;
  knot.rotation.x = -elapsedTime * 0.2 ;
  knot.rotation.y =  elapsedTime * 0.1 ;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();