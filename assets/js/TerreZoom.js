    // global variables
    var renderer;
    var scene;
    var camera;
    var spotlight;
    var stats;
    var cameraControl;
    var directionalLight;
    var cameraBG;
    var composer;
    var sceneBG;
    var terre, lune, nuage;

    /**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
  function terreZoom() {

    alert("dans la fonction");
  //texture de la terre
  var matextureTerre = THREE.ImageUtils.loadTexture("../assets/textures/planets/earthmap4k.jpg");
  var bumpMapTerre = THREE.ImageUtils.loadTexture("../assets/textures/planets/earthbumpMap.jpg");
  //var specularMapEarth = THREE.ImageUtils.loadTexture("assets/textures/planets/earthspec4k.jpg");
  var materialTerre = new THREE.MeshPhongMaterial({map: matextureTerre, transparent: false});

  materialTerre.bumpMap = bumpMapTerre;
  //materialTerre.specularMap = specularMapEarth;
  materialTerre.specular = new THREE.Color(0x262626);

  //texture des nuages
  var matextureNuage = THREE.ImageUtils.loadTexture("../assets/textures/planets/fair_clouds_4k.png");
  var materialNuage = new THREE.MeshPhongMaterial({map: matextureNuage, transparent: true});


    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;


  // create the ground plane Terre
  var sphereGeometry = new THREE.SphereGeometry(8, 60, 60);
  terre = new THREE.Mesh (sphereGeometry, materialTerre);
  terre.receiveShadow = true;
  terre.position.x = 0;
  terre.position.y = 0;
  terre.position.z = 0;
  terre.name='Terre';
  scene.add(terre);


  //create nuage
  var nuageGeometry = new THREE.SphereGeometry(8.1, 60, 60);
  nuage = new THREE.Mesh (nuageGeometry, materialNuage);
  nuage.position.x = 0;
  nuage.position.y = -2;
  nuage.position.z = 0;
  //nuage.name='nuage';
  scene.add(nuage);


        // add ambient light
        ambientLight = new THREE.AmbientLight(0x111111,1);
        ambientLight.position = new THREE.Vector3(11,11,11);
        ambientLight.name='ambient';

        scene.add(ambientLight);


        //add directional light
        directionalLight = new THREE.DirectionalLight(0xffffff,1);
        directionalLight.position = new THREE.Vector3(100,100,-50);
        directionalLight.name='directional';

        scene.add(directionalLight);

        // position and point the camera to the center of the scene
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);

        //addcontrols
        cameraControl = new THREE.OrbitControls(camera);

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);


        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        renderTerreZoom();
    }

    /**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
    function renderTerreZoom() {

        //update camera
        var rotTerre = 0.0005; //control.rotationSpeed;
        var rotNuage = 0.0006;

        terre.rotation.y = terre.rotation.y+ rotTerre;
        nuage.rotation.y = nuage.rotation.y + rotNuage;


        camera.lookAt(scene.position);

        //update the camera
        cameraControl.update();
        renderer.render(scene, camera);




        // render using requestAnimationFrame
        requestAnimationFrame(render);


    }


    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
    function handleResizeTerre() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // calls the init function when the window is done loading.
    //window.onload = terre;
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResizeTerre, false);

