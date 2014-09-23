// global variables
var renderer;
var scene;
var camera;
var spotlight;
var stats;
var cameraControl;
var directionalLight;
var sphere;
var nuage;
var lune;
var cameraBG;
var sceneBG;
var composer;
var mars;
var jupiter;
var anneau;

/**
 * Initializes the scene, camera and objects. Called when the window is
 * loaded by using window.onload (see below)
 */
function init() {

  //add background using a camera
  cameraBG = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -10000, 10000);
  cameraBG.position.z = 50;
  sceneBG = new THREE.Scene();

  var materialColor = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("assets/textures/planets/starry_background.jpg"), depthTest: false});

  var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  bgPlane.position.z = -100;
  bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);

  sceneBG.add(bgPlane);


  //texture de la terre
  var matextureTerre = THREE.ImageUtils.loadTexture("assets/textures/planets/earthmap4k.jpg");
  var normalMap = THREE.ImageUtils.loadTexture("assets/textures/planets/earth_normalmap_flat4k.jpg");
  var specularMapEarth = THREE.ImageUtils.loadTexture("assets/textures/planets/earthspec4k.jpg");
  var materialTerre = new THREE.MeshPhongMaterial({map: matextureTerre, transparent: true});

  materialTerre.normalMap = normalMap;
  materialTerre.specularMap = specularMapEarth;
  materialTerre.specular = new THREE.Color(0x262626);

  //texture des nuages
  var matextureNuage = THREE.ImageUtils.loadTexture("assets/textures/planets/fair_clouds_4k.png");
  var materialNuage = new THREE.MeshPhongMaterial({map: matextureNuage, transparent: true});

  //texture du soleil
  var matextureSun = THREE.ImageUtils.loadTexture("assets/textures/planets/sun.jpg");
  var materialSun = new THREE.MeshPhongMaterial({map: matextureSun, transparent: true});

  //texture de la lune
  var matextureLune = THREE.ImageUtils.loadTexture("assets/textures/planets/moonmap4k.jpg");
  var materialLune = new THREE.MeshPhongMaterial({map: matextureLune, transparent: true});


  //texture mars
  var matextureMars = THREE.ImageUtils.loadTexture("assets/textures/planets/mars.jpg");
  var bumpMapMars = THREE.ImageUtils.loadTexture("assets/textures/planets/MarsElevation_2500x1250.jpg");
  var materialMars = new THREE.MeshPhongMaterial({map: matextureMars, transparent: true});

  materialMars.bumpMap = bumpMapMars;

  //texture jupiter
  var matextureJupiter = THREE.ImageUtils.loadTexture("assets/textures/planets/jupiter.jpg");
  var materialJupiter = new THREE.MeshPhongMaterial({map: matextureJupiter, transparent: true});

  //texture saturn
  var matextureSaturn = THREE.ImageUtils.loadTexture("assets/textures/planets/saturn.jpg");

  var materialSaturn = new THREE.MeshPhongMaterial({map: matextureSaturn, transparent: true});

  //texture Anneausaturn
  var matextureAnneau = THREE.ImageUtils.loadTexture("assets/textures/planets/anneau.jpg");
  var materialAnneau = new THREE.MeshPhongMaterial({map: matextureAnneau, transparent: true, opacity : 0.5});

  //texture mercure
  var matextureMercure = THREE.ImageUtils.loadTexture("assets/textures/planets/mercure.jpg");
  var materialMercure = new THREE.MeshPhongMaterial({map: matextureMercure, transparent: true});

  //texture venus
  var matextureVenus = THREE.ImageUtils.loadTexture("assets/textures/planets/venus.jpg");
  var materialVenus = new THREE.MeshPhongMaterial({map: matextureVenus, transparent: true});

  //texture uranus
  var matextureUranus = THREE.ImageUtils.loadTexture("assets/textures/planets/uranus.jpg");
  var materialUranus = new THREE.MeshPhongMaterial({map: matextureUranus, transparent: true});

  //texture neptune
  var matextureNeptune = THREE.ImageUtils.loadTexture("assets/textures/planets/neptune.jpg");
  var materialNeptune = new THREE.MeshPhongMaterial({map: matextureNeptune, transparent: true});


  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 9000);

  // create a render, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;


  //create mercure
  var mercureGeometry = new THREE.SphereGeometry(4, 60, 60);
  mercure = new THREE.Mesh (mercureGeometry, materialMercure);
  mercure.receiveShadow = true;

  mercure.position.x = 78;
  mercure.position.y = -2;
  mercure.position.z = 0;
  mercure.name='mercure';
  //add the plane to the scene
  scene.add(mercure);

  //create venus
  var venusGeometry = new THREE.SphereGeometry(9, 60, 60);
  venus = new THREE.Mesh (venusGeometry, materialVenus);
  venus.receiveShadow = true;

  venus.position.x = 144;
  venus.position.y = -2;
  venus.position.z = 0;
  venus.name='venus';
  //add the plane to the scene
  scene.add(venus);


  // create the ground plane Terre
  var sphereGeometry = new THREE.SphereGeometry(10, 60, 60);
  terre = new THREE.Mesh (sphereGeometry, materialTerre);
  terre.receiveShadow = true;

  //position the plane
  terre.position.x = 200;
  terre.position.y = -2;
  terre.position.z = 0;
  terre.name='sphere';
  //add the plane to the scene
  scene.add(terre);


  //create nuage
  var nuageGeometry = new THREE.SphereGeometry(10.05, 60, 60);
  nuage = new THREE.Mesh (nuageGeometry, materialNuage);
  //nuage.receiveShadow = true;

  nuage.position.x = 200.2;
  nuage.position.y = -2;
  nuage.position.z = 0;
  nuage.name='nuage';
  //add the plane to the scene
  scene.add(nuage);

  var luneGeometry = new THREE.SphereGeometry(5, 60, 60);
  lune = new THREE.Mesh (luneGeometry, materialLune);
  lune.receiveShadow = true;

  lune.position.x = 230;
  lune.position.y = -2;
  lune.position.z = 0;
  lune.name='lune';
  //add the plane to the scene
  scene.add(lune);


  //add soleil
  var soleilGeometry = new THREE.SphereGeometry(50, 60, 60);
  soleil = new THREE.Mesh (soleilGeometry, materialSun);


  soleil.position.x = 0;
  soleil.position.y = 0;
  soleil.position.z = 0;
  soleil.name='soleil';
  scene.add(soleil);


  //add mars
  var marsGeometry = new THREE.SphereGeometry(5, 60, 60);
  mars = new THREE.Mesh (marsGeometry, materialMars);
  mars.receiveShadow = true;

  mars.position.x = 304;
  mars.position.y = -2;
  mars.position.z = 0;
  mars.name='mars';
  scene.add(mars);


  //add jupiter
  var jupiterGeometry = new THREE.SphereGeometry(44, 60, 60);
  jupiter = new THREE.Mesh (jupiterGeometry, materialJupiter);
  jupiter.receiveShadow = true;

  jupiter.position.x = 416;
  jupiter.position.y = -2;
  jupiter.position.z = 0;
  jupiter.name='jupiter';
  scene.add(jupiter);

  //add saturn
  var saturnGeometry = new THREE.SphereGeometry(37, 60, 60);
  saturn = new THREE.Mesh (saturnGeometry, materialSaturn);
  saturn.receiveShadow = true;

  saturn.position.x = 761;
  saturn.position.y = -2;
  saturn.position.z = 0;
  saturn.name='saturn';
  scene.add(saturn);

  //add anneau saturn
  var anneauGeometry = new THREE.CylinderGeometry( 43, 63, 1, 80 );
  anneau = new THREE.Mesh (anneauGeometry, materialAnneau);
  //anneau.receiveShadow = true;

  anneau.position.x = 761;
  anneau.position.y = -2;
  anneau.position.z = 0;
  anneau.name='anneau';
  scene.add(anneau);


  //add uranus
  var uranusGeometry = new THREE.SphereGeometry(16, 60, 60);
  uranus = new THREE.Mesh (uranusGeometry, materialUranus);
  uranus.receiveShadow = true;

  uranus.position.x = 1533;
  uranus.position.y = -2;
  uranus.position.z = 0;
  uranus.name='uranus';
  scene.add(uranus);

  //add neptune
  var neptuneGeometry = new THREE.SphereGeometry(15, 60, 60);
  neptune = new THREE.Mesh (neptuneGeometry, materialNeptune);
  neptune.receiveShadow = true;

  neptune.position.x = 2400;
  neptune.position.y = -2;
  neptune.position.z = 0;
  neptune.name='neptune';
  scene.add(neptune);




  // add ambient light
  ambientLight = new THREE.AmbientLight(0xffffff,1);
  ambientLight.position = new THREE.Vector3(11,11,11);
  ambientLight.name='ambient';

  scene.add(ambientLight);


  //add directional light
  directionalLight = new THREE.DirectionalLight(0xffffff,1);
  directionalLight.position = new THREE.Vector3(0,0,0);
  directionalLight.name='directional';

  scene.add(directionalLight);


// ajout de navette
  var loader = new THREE.OBJMTLLoader();
  loader.addEventListener( 'load', function ( event ) {
   
     var object = event.content;
   
     object.position.x = 190;
     object.position.y = -2;
     object.position.z = 0//position de l'objet
   
     object.traverse( function( node ) {
        if( node.material ) {
           node.material.side = THREE.DoubleSide;
        }
     });
     scene.add( object );
   
  });

loader.load( 'assets/textures/spaceship/shuttle.obj', 'assets/textures/spaceship/shuttle.mtl' );


  addStatsObject();

  // position and point the camera to the center of the scene
  camera.position.x = 250;
  camera.position.y = -2;
  camera.position.z = 20;
  camera.lookAt(scene.position);

  //addcontrols
  cameraControl = new THREE.OrbitControls(camera);

  //setup the composer steps
  //first render the background
  var bgPass = new THREE.RenderPass(sceneBG, cameraBG);

  //next render the scene (rotating earth), without clearing the current output
  var renderPass = new THREE.RenderPass(scene, camera);
  renderPass.clear = false;

  //finally copy the result to the screen
  var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;

  //add these passes to the composer
  composer = new THREE.EffectComposer(renderer);
  composer.addPass(bgPass);
  composer.addPass(renderPass);
  composer.addPass(effectCopy);

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);



  // call the render function, after the first render, interval is determined
  // by requestAnimationFrame
  render();
}

function addControlGui (controlObject){
  var gui = new dat.GUI();
  gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
  gui.add(controlObject,'opacity', 0.1, 1);
  gui.addColor(controlObject, 'color');
}

function addStatsObject(){
  stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position ='absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);
}

/**
 * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
 * for future renders
 */
function render() {

  //update camera

  // definition des vitesses de revolution autour soleil
  //control.rotationSpeed;
  var rotSpeed = 0.0005;
  var rotLuneTerre = 0.0005;
  var rotSpeedMars = 0.00026584;
  var rotSpeedJupiter = 0.00004215;
  var rotSpeedSaturn = 0.000016974;
  var rotSpeedMercure = 0.00207605;
  var rotSpeedVenus = 0.00081276;
  var rotSpeedUranus = 0.000005951;
  var rotSpeedNeptune = 0.0000030346;

  // définition des vitesses de rotation axiale
  var rotSun = 0.000036935;
  var rotTerre= 0.001;
  var rotNuage = 0.0012;
  var rotLune = 0.002;
  var rotMars = 0.000971742;
  var rotJupiter= 0.00243207;
  var rotSaturn= 0.002338904;
  var rotAnneau= -0.02;
  var rotMercure= 0.000408082;
  var rotVenus = -0.000098498;
  var rotUranus = 0.001337095;
  var rotNeptune = 0.001246563;

  // vitesse de rotation
  terre.rotation.y = terre.rotation.y+ rotTerre;
  nuage.rotation.y = nuage.rotation.y + rotNuage;
  lune.rotation.y = lune.rotation.y + rotLune;
  soleil.rotation.y = soleil.rotation.y+ rotSun;
  mars.rotation.y = mars.rotation.y+rotMars;
  jupiter.rotation.y= jupiter.rotation.y+rotJupiter;
  saturn.rotation.y= saturn.rotation.y+rotSaturn;
  anneau.rotation.y= anneau.rotation.y+rotAnneau;
  mercure.rotation.y = mercure.rotation.y+ rotTerre;
  venus.rotation.y = venus.rotation.y+ rotVenus;
  neptune.rotation.y = neptune.rotation.y+ rotTerre;
  uranus.rotation.x = uranus.rotation.x+ rotUranus;
  neptune.rotation.y = neptune.rotation.y+ rotNeptune;



  // vitesse de révolution
  mercure.position.x = mercure.position.x * Math.cos(rotSpeedMercure) + mercure.position.z * Math.sin(rotSpeedMercure);
  mercure.position.z = mercure.position.z * Math.cos(rotSpeedMercure) - mercure.position.x * Math.sin(rotSpeedMercure);

  venus.position.x = venus.position.x * Math.cos(rotSpeedVenus) + venus.position.z * Math.sin(rotSpeedVenus);
  venus.position.z = venus.position.z * Math.cos(rotSpeedVenus) - venus.position.x * Math.sin(rotSpeedVenus);


  terre.position.x = terre.position.x * Math.cos(rotSpeed) + terre.position.z * Math.sin(rotSpeed);
  terre.position.z = terre.position.z * Math.cos(rotSpeed) - terre.position.x * Math.sin(rotSpeed);

  nuage.position.x = nuage.position.x * Math.cos(rotSpeed) + nuage.position.z * Math.sin(rotSpeed);
  nuage.position.z = nuage.position.z * Math.cos(rotSpeed) - nuage.position.x * Math.sin(rotSpeed);

  lune.position.x = lune.position.x * Math.cos(rotLuneTerre) +lune.position.z * Math.sin(rotLuneTerre);
  lune.position.z = lune.position.z * Math.cos(rotLuneTerre) - lune.position.x  * Math.sin(rotLuneTerre);


  mars.position.x = mars.position.x * Math.cos(rotSpeedMars) +mars.position.z * Math.sin(rotSpeedMars);
  mars.position.z = mars.position.z * Math.cos(rotSpeedMars) - mars.position.x  * Math.sin(rotSpeedMars);

  jupiter.position.x = jupiter.position.x * Math.cos(rotSpeedJupiter) +jupiter.position.z * Math.sin(rotSpeedJupiter);
  jupiter.position.z = jupiter.position.z * Math.cos(rotSpeedJupiter) - jupiter.position.x  * Math.sin(rotSpeedJupiter);

  saturn.position.x = saturn.position.x * Math.cos(rotSpeedSaturn) +saturn.position.z * Math.sin(rotSpeedSaturn);
  saturn.position.z = saturn.position.z * Math.cos(rotSpeedSaturn) - saturn.position.x  * Math.sin(rotSpeedSaturn);

  anneau.position.x = anneau.position.x * Math.cos(rotSpeedSaturn) +anneau.position.z * Math.sin(rotSpeedSaturn);
  anneau.position.z = anneau.position.z * Math.cos(rotSpeedSaturn) - anneau.position.x  * Math.sin(rotSpeedSaturn);

  uranus.position.x = uranus.position.x * Math.cos(rotSpeedUranus) +uranus.position.z * Math.sin(rotSpeedUranus);
  uranus.position.z = uranus.position.z * Math.cos(rotSpeedUranus) - uranus.position.x  * Math.sin(rotSpeedUranus);

  neptune.position.x = neptune.position.x * Math.cos(rotSpeedNeptune) +neptune.position.z * Math.sin(rotSpeedNeptune);
  neptune.position.z = neptune.position.z * Math.cos(rotSpeedNeptune) - neptune.position.x  * Math.sin(rotSpeedNeptune);



  camera.lookAt(scene.position);


  //charge opacity
  //scene.getObjectByName('sphere').material.opacity = control.opacity;

  //change color
  //scene.getObjectByName('sphere').material.color = new THREE.Color(control.color);

  //update stats
  stats.update();

  //update the camera
  cameraControl.update();


  // render using requestAnimationFrame
  requestAnimationFrame(render);

  // renderer.render(scene, camera);
  renderer.autoClear = false;
  composer.render();
}


/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// calls the init function when the window is done loading.
window.onload = init;
// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);
