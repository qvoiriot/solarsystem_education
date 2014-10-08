// global variables
var renderer, scene, camera, spotlight, stats, cameraControl, directionalLight, composer;
var cameraBG, sceneBG;

// planets variables
var sphere, nuage, lune, mars, jupiter, anneau, espace, mercure, venus, neptune, uranus, saturne, pluton;

//custom varialbes
var projector = new THREE.Projector();
var mouse = { x: 0, y: 0 }, INTERSECTED;
var collidableMeshList = [];
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var sprite1, canvas1, context1, texture1;

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
  var bumpMapTerre = THREE.ImageUtils.loadTexture("assets/textures/planets/earthbumpMap.jpg");
  var specularMapEarth = THREE.ImageUtils.loadTexture("assets/textures/planets/earthspec4k.jpg");
  var materialTerre = new THREE.MeshPhongMaterial({map: matextureTerre, transparent: false});

  materialTerre.bumpMap = bumpMapTerre;
  materialTerre.specularMap = specularMapEarth;
  materialTerre.specular = new THREE.Color(0x262626);

  //texture des nuages
  var matextureNuage = THREE.ImageUtils.loadTexture("assets/textures/planets/fair_clouds_4k.png");
  var materialNuage = new THREE.MeshPhongMaterial({map: matextureNuage, transparent: true});

  //texture du soleil
  var matextureSun = THREE.ImageUtils.loadTexture("assets/textures/planets/sun.jpg");
  var materialSun = new THREE.MeshBasicMaterial({map: matextureSun, transparent: false});

  //texture de la lune
  var matextureLune = THREE.ImageUtils.loadTexture("assets/textures/planets/moonmap.jpg");
  var bumpMapLune = THREE.ImageUtils.loadTexture("assets/textures/planets/moonbumpmap.jpg");
  var materialLune = new THREE.MeshPhongMaterial({map: matextureLune, transparent: false});
  materialLune.bumpMap = bumpMapLune;

  //texture mars
  var matextureMars = THREE.ImageUtils.loadTexture("assets/textures/planets/marsmap_1.jpg");
  var bumpMapMars = THREE.ImageUtils.loadTexture("assets/textures/planets/marbumpMap.jpg");
  var materialMars = new THREE.MeshPhongMaterial({map: matextureMars, transparent: false});
  materialMars.bumpMap = bumpMapMars;

  //texture jupiter
  var matextureJupiter = THREE.ImageUtils.loadTexture("assets/textures/planets/jupitermap.jpg");
  var bumpMapJupiter = THREE.ImageUtils.loadTexture("assets/textures/planets/jupiterbumpMap.jpg");
  var materialJupiter = new THREE.MeshPhongMaterial({map: matextureJupiter, transparent: false});
  materialJupiter.bumpMap =bumpMapJupiter;

  //texture saturn
  var matextureSaturn = THREE.ImageUtils.loadTexture("assets/textures/planets/saturnmap.jpg");
  var bumpMapSaturn = THREE.ImageUtils.loadTexture("assets/textures/planets/saturnbumpMap.jpg");
  var materialSaturn = new THREE.MeshPhongMaterial({map: matextureSaturn, transparent: false});
  materialSaturn.bumpMap =bumpMapSaturn;

  //texture Anneausaturn
  var matextureAnneau = THREE.ImageUtils.loadTexture("assets/textures/planets/saturnring.jpg");
  var materialAnneau = new THREE.MeshPhongMaterial({map: matextureAnneau, transparent: true, opacity : 0.4});

  //texture mercure
  var matextureMercure = THREE.ImageUtils.loadTexture("assets/textures/planets/mercurymap.jpg");
  var bumpMapMercure = THREE.ImageUtils.loadTexture("assets/textures/planets/mercurybumpMap.jpg");
  var materialMercure = new THREE.MeshPhongMaterial({map: matextureMercure, transparent: false});
  materialMercure.bumpMap = bumpMapMercure;

  //texture venus
  var matextureVenus = THREE.ImageUtils.loadTexture("assets/textures/planets/venusmap.jpg");
  var bumpMapVenus = THREE.ImageUtils.loadTexture("assets/textures/planets/venusbump.jpg");
  var materialVenus = new THREE.MeshPhongMaterial({map: matextureVenus, transparent: false});
  materialVenus.bumpMap = bumpMapVenus;

  //texture uranus
  var matextureUranus = THREE.ImageUtils.loadTexture("assets/textures/planets/uranusmap.jpg");
  var bumpMapUranus = THREE.ImageUtils.loadTexture("assets/textures/planets/uranusbumpMap.jpg");
  var materialUranus = new THREE.MeshPhongMaterial({map: matextureUranus, transparent: false});
  materialUranus.bumpMap = bumpMapUranus;

  //texture neptune
  var matextureNeptune = THREE.ImageUtils.loadTexture("assets/textures/planets/neptunemap.jpg");
  var bumpMapNeptune = THREE.ImageUtils.loadTexture("assets/textures/planets/neptunebumpMap.jpg");
  var materialNeptune = new THREE.MeshPhongMaterial({map: matextureNeptune, transparent: false});
    materialNeptune.bumpMap = bumpMapNeptune;
  
    //texture pluton
  var matexturePluton = THREE.ImageUtils.loadTexture("assets/textures/planets/PlutonMap.jpg");
  var bumpMapPluton = THREE.ImageUtils.loadTexture("assets/textures/planets/PlutonBumpMap.jpg");
  var materialPluton = new THREE.MeshPhongMaterial({map: matexturePluton, transparent: false});
  materialPluton.bumpMap = bumpMapPluton;


  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

  // create a render, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;


  //add soleil
  var soleilGeometry = new THREE.SphereGeometry(60, 60, 60);
  soleil = new THREE.Mesh (soleilGeometry, materialSun);
  soleil.position.x = 0;
  soleil.position.y = 0;
  soleil.position.z = 0;
  soleil.name='soleil';
  scene.add(soleil);
  collidableMeshList.push(soleil); 


/*************************************************************/
/**************           CUSTOM SUN             *************/
/*************************************************************/

  // SUPER SIMPLE GLOW EFFECT
  // use sprite because it appears the same from all angles
  var spriteMaterial = new THREE.SpriteMaterial( 
  { 
    map: new THREE.ImageUtils.loadTexture( 'assets/textures/planets/sun_halo.png' ), 
    
    color: 0xfcdc12, transparent: false, blending: THREE.AdditiveBlending
  });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(190, 190, 1.0);
  soleil.add(sprite); // this centers the glow at the mesh


/*************************************************************/
  

  //create mercure
  var mercureGeometry = new THREE.SphereGeometry(4, 60, 60);
  mercure = new THREE.Mesh (mercureGeometry, materialMercure);
  mercure.receiveShadow = true;
  mercure.position.x = 78;
  mercure.position.y = -2;
  mercure.position.z = 0;
  mercure.name='mercure';
  scene.add(mercure);
  collidableMeshList.push(mercure); 

  //create venus
  var venusGeometry = new THREE.SphereGeometry(9, 60, 60);
  venus = new THREE.Mesh (venusGeometry, materialVenus);
  venus.receiveShadow = true;
  venus.position.x = 144;
  venus.position.y = -2;
  venus.position.z = 0;
  venus.name='venus';
  scene.add(venus);
  collidableMeshList.push(venus); 


  // create the ground plane Terre
  var sphereGeometry = new THREE.SphereGeometry(10, 60, 60);
  terre = new THREE.Mesh (sphereGeometry, materialTerre);
  terre.receiveShadow = true;
  terre.position.x = 200;
  terre.position.y = -2;
  terre.position.z = 0;
  terre.name='Terre';
  scene.add(terre);
  collidableMeshList.push(terre); 


  //create nuage
  var nuageGeometry = new THREE.SphereGeometry(10.05, 60, 60);
  nuage = new THREE.Mesh (nuageGeometry, materialNuage);
  nuage.position.x = 200.2;
  nuage.position.y = -2;
  nuage.position.z = 0;
  //nuage.name='nuage';
  scene.add(nuage);

  var luneGeometry = new THREE.SphereGeometry(5, 60, 60);
  lune = new THREE.Mesh (luneGeometry, materialLune);
  lune.receiveShadow = true;
  lune.position.x = 230;
  lune.position.y = -2;
  lune.position.z = 0;
  lune.name='lune';
  scene.add(lune);
  collidableMeshList.push(lune); 


  //add mars
  var marsGeometry = new THREE.SphereGeometry(5, 60, 60);
  mars = new THREE.Mesh (marsGeometry, materialMars);
  mars.receiveShadow = true;
  mars.position.x = 304;
  mars.position.y = -2;
  mars.position.z = 0;
  mars.name='mars';
  scene.add(mars);
  collidableMeshList.push(mars); 


  //add jupiter
  var jupiterGeometry = new THREE.SphereGeometry(112, 60, 60);
  jupiter = new THREE.Mesh (jupiterGeometry, materialJupiter);
  jupiter.receiveShadow = true;
  jupiter.position.x = 1040;
  jupiter.position.y = -2;
  jupiter.position.z = 0;
  jupiter.name='jupiter';
  scene.add(jupiter);
  collidableMeshList.push(jupiter); 

  //add saturn
  var saturnGeometry = new THREE.SphereGeometry(94, 60, 60);
  saturn = new THREE.Mesh (saturnGeometry, materialSaturn);
  saturn.receiveShadow = true;
  saturn.position.x = 1903;
  saturn.position.y = -2;
  saturn.position.z = 0;
  saturn.name='saturn';
  scene.add(saturn);
  collidableMeshList.push(saturn); 

  //add anneau saturn
  var anneauGeometry = new THREE.CylinderGeometry( 250, 63, 1, 80 );
  anneau = new THREE.Mesh (anneauGeometry, materialAnneau);
  anneau.receiveShadow = false;
  anneau.position.x = 1903;
  anneau.position.y = -2;
  anneau.position.z = 0;
  //anneau.name='anneau';
  scene.add(anneau);

  //add uranus
  var uranusGeometry = new THREE.SphereGeometry(40, 60, 60);
  uranus = new THREE.Mesh (uranusGeometry, materialUranus);
  uranus.receiveShadow = true;
  uranus.position.x = 3833;
  uranus.position.y = -2;
  uranus.position.z = 0;
  uranus.name='uranus';
  scene.add(uranus);
  collidableMeshList.push(uranus); 

  //add neptune
  var neptuneGeometry = new THREE.SphereGeometry(38, 60, 60);
  neptune = new THREE.Mesh (neptuneGeometry, materialNeptune);
  neptune.receiveShadow = true;
  neptune.position.x = 6000;
  neptune.position.y = -2;
  neptune.position.z = 0;
  neptune.name='neptune';
  scene.add(neptune);
  collidableMeshList.push(neptune); 


  //add pluton
  var plutonGeometry = new THREE.SphereGeometry(4, 60, 60);
  pluton = new THREE.Mesh (plutonGeometry, materialPluton);
  pluton.receiveShadow = true;
  pluton.position.x = 7800;
  pluton.position.y = -2;
  pluton.position.z = 0;
  pluton.name='pluton';
  scene.add(pluton);
  collidableMeshList.push(pluton); 


  // add ambient light
  ambientLight = new THREE.AmbientLight(0x242424);
  ambientLight.position = new THREE.Vector3(11,11,11);
  ambientLight.name='ambient';
  scene.add(ambientLight);

  var light = new THREE.PointLight( 0xfffffff, 1, 9000 );
  light.position.set( 0, 0, 0 );
  scene.add( light );


/************************************************************/
/******************        SPACE CAR    *********************/
/************************************************************/
// ajout de spaceCar

var spaceCarObj = 'assets/textures/spaceship/car/HN_48_Flying_Car.obj';
var spaceCarMtl = 'assets/textures/spaceship/car/HN_48_Flying_Car.mtl';

        var loader = new THREE.OBJMTLLoader();
        loader.load( spaceCarObj, spaceCarMtl, function ( spaceCar ) {
          spaceCar.scale.set(0.05,0.05,0.05)
          spaceCar.rotation.y = -10;
          spaceCar.position.x = 190;
          spaceCar.position.y = -2;
          spaceCar.position.z = 0  
          spaceCar.name='SpaceCar';
          scene.add( spaceCar );
        } );

        // ici : ajout du code pour le mouvement de la space car 
        
/************************************************************/

  // position and point the camera to the center of the scene
  camera.position.x = -600;
  camera.position.y = 300;
  camera.position.z = -500;
  camera.lookAt(scene.position);

  //addcontrols
  cameraControl = new THREE.OrbitControls(camera);

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


  render();
}


function render() {

  // Vitesses de révolution autour soleil
  var rotSpeed = 0.0005;
  var rotLuneTerre = 0.0005;
  var rotSpeedMars = 0.00026584;
  var rotSpeedJupiter = 0.00004215;
  var rotSpeedSaturn = 0.000016974;
  var rotSpeedMercure = 0.00207605;
  var rotSpeedVenus = 0.00081276;
  var rotSpeedUranus = 0.000005951;
  var rotSpeedNeptune = 0.0000030346;
  var rotSpeedPluton = 0.0000020188;

  //var rotSpeedSpaceCar = 0.002;

  //Vitesses de rotation axiale
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
  var rotPluton = 0.000156431;

  // vitesse de rotation
  terre.rotation.y = terre.rotation.y+ rotTerre;
  nuage.rotation.y = nuage.rotation.y + rotNuage;
  lune.rotation.y = lune.rotation.y + rotLune;
  soleil.rotation.y = soleil.rotation.y+ rotSun;
  mars.rotation.y = mars.rotation.y+rotMars;
  jupiter.rotation.y= jupiter.rotation.y+rotJupiter;
  saturn.rotation.y= saturn.rotation.y+rotSaturn;
  anneau.rotation.y= anneau.rotation.y+rotAnneau;
  mercure.rotation.y = mercure.rotation.y+ rotMercure;
  venus.rotation.y = venus.rotation.y+ rotVenus;
  neptune.rotation.y = neptune.rotation.y+ rotTerre;
  uranus.rotation.x = uranus.rotation.x+ rotUranus;
  neptune.rotation.y = neptune.rotation.y+ rotNeptune;
  pluton.rotation.y = pluton.rotation.y+ rotPluton;



  // vitesse de révolution
  //spaceCar.position.x = spaceCar.position.x * Math.cos(rotSpeedSpaceCar) + spaceCar.position.z * Math.sin(rotSpeedSpaceCar);
  //spaceCar.position.z = spaceCar.position.z * Math.cos(rotSpeedSpaceCar) - spaceCar.position.x * Math.sin(rotSpeedSpaceCar);



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

  pluton.position.x = pluton.position.x * Math.cos(rotSpeedPluton) +pluton.position.z * Math.sin(rotSpeedPluton);
  pluton.position.z = pluton.position.z * Math.cos(rotSpeedPluton) - pluton.position.x  * Math.sin(rotSpeedPluton);


  camera.lookAt(scene.position);

  //update the camera
  cameraControl.update();

  // render using requestAnimationFrame
  requestAnimationFrame(render);

  //renderer.render(scene, camera);

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
