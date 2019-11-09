let scrollFunc_back = null;

function onclick_showIFrame(url) {
	let window2 = document.getElementById("window2");
	let window2_close = document.getElementById("window2_close");
	let window2_bg = document.getElementById("window2_bg");
	window2.src = url;
	window2.style.display = "block";
	window2_close.style.display = "block";
	window2_bg.style.display = "block";
	//滚动滑轮触发scrollFunc方法ie谷歌
	scrollFunc_back = window.onmousewheel = document.onmousewheel;
	window.onmousewheel = document.onmousewheel = function(evt) {
		document.documentElement.scrollTop = 0;
	}
	//常規
	scrollFunc_back = window.onscroll;
	window.onscroll = function(evt) {
		document.documentElement.scrollTop = 0;
	}
}

function check_screen() {
	var shade = document.createElement("div");
	shade.style.position = "fixed";
	shade.style.width = "100vw";
	shade.style.height = "100vh";
	shade.style.background = "#FFFFFF";
	shade.innerHTML = "<center><h2>請橫屏食用~＼⊙＿⊙／<h2></center>";
	shade.id = "shade";
	if(window.innerWidth > window.innerHeight) {
		shade.style.display = "none";
	} else {
		shade.style.display = "block";
	}
	document.body.appendChild(shade);

	window.addEventListener("resize", function() {
		if(window.innerWidth > window.innerHeight) {
			shade.style.display = "none";
		} else {
			shade.style.display = "block";
		}
	});
}

document.getElementById("window2_close").onclick = function() {
	let window2 = document.getElementById("window2");
	window2.src = "";
	window2.style.display = "none";
	document.getElementById("window2_close").style.display = "none";
	document.getElementById("window2_bg").style.display = "none";

	window.onmousewheel = document.onmousewheel = scrollFunc_back;
	window.onscroll = scrollFunc_back;
}

window.onload = function() {
//	check_screen();
//	let browser = function() {
//		let u = navigator.userAgent,
//			app = navigator.appVersion;
//
//		return { //移动终端浏览器版本信息 
//			trident: u.indexOf("Trident") > -1, //IE内核
//			presto: u.indexOf("Presto") > -1, //opera内核
//			isWebKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
//			gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
//			isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//			isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//			isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
//			iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
//			iPad: u.indexOf("iPad") > -1, //是否iPad
//			webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
//			isWeChat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
//		};
//	}();

	function webgl_view() {
		let stats, controls;
		let camera, scene, renderer, light;
		let container = document.getElementById("exhibition");

		let vw = container.offsetWidth,
			vh = container.offsetHeight;
		let start = Date.now();
		let objs={};
		
		let canvas = document.createElement("canvas");
		canvas.width = vw;
		canvas.height = vh;
		container.appendChild(canvas);
		
		// Load the 3D engine
		var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
		// CreateScene function that creates and return the scene
		var createScene = function(){
		    // Create a basic BJS Scene object
		    scene = new BABYLON.Scene(engine);
		    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
		    //VirtualJoysticksCamera UniversalCamera
		    camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 10, -30), scene);
		    // Target the camera to scene origin
		    camera.setTarget(BABYLON.Vector3.Zero());
		    // Attach the camera to the canvas
		    camera.attachControl(canvas, true);
		    //camera.maxZ = 100;//视野
			//替换 控制 键
			camera.keysUp = [87];
		    camera.keysDown = [83];
		    camera.keysLeft = [65];
		    camera.keysRight = [68];
		    
		    camera.rotation.x = 0.1; //
		    
		    //Enable Collisions
//		    scene.enablePhysics();
//		    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
			scene.collisionsEnabled = true;
			
			camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
			camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5)
			camera.checkCollisions = true;
//			camera.applyGravity = true;
//		    camera.addChild
		    
		    
		    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
		    var l_HemisphericLight = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
		    var l_PointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, -10), scene);
		    var l_PointLight2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 1, -10), scene);
		    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
//		    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
//		    // Move the sphere upward 1/2 of its height
//		    sphere.position.y = 2;
//		    sphere.checkCollisions = true;
//		    sphere.applyGravity = true;
//		    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
		    
		    // Water material
		    var waterMaterial = new BABYLON.WaterMaterial("waterMaterial", scene, new BABYLON.Vector2(512, 512));
		    waterMaterial.bumpTexture = new BABYLON.Texture("img/texture/waterbump.png", scene);
		    waterMaterial.windForce = -10;
		    waterMaterial.waveHeight = 0.05;
		    waterMaterial.bumpHeight = 0.1;
		    waterMaterial.waveLength = 0.1;
		    waterMaterial.waveSpeed = 50.0;
		    waterMaterial.colorBlendFactor = 0;
		    waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
		    waterMaterial.colorBlendFactor = 0;
		    waterMaterial.opacity = 0.5;
		    
		    // Water mesh
		    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 1200, 1200, 32, scene, false);
		    waterMesh.material = waterMaterial;
		    
		    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
		    var ground = BABYLON.Mesh.CreateGround('ground1', 1200, 1200, 32, scene, false);
		    ground.material = new  BABYLON.StandardMaterial("texture1", scene);
			
		    ground.material.diffuseTexture = new BABYLON.Texture("img/20129917170910519344.jpg", scene);
//			ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
		    ground.checkCollisions = true;
		    
		    
		    
		    
		    var ffBox = new BABYLON.Mesh.CreateBox("box", 1000.0, scene, true, BABYLON.Mesh.DOUBLESIDE);
		    ffBox.material = new  BABYLON.StandardMaterial("texture2", scene);
		    ffBox.material.reflectionTexture = new BABYLON.CubeTexture("img/skybox/skybox", scene);
		    ffBox.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		    ffBox.material.disableLighting = true;
		    ffBox.targetPosition = camera.position;
		    ffBox.rotation.y = Math.PI;
		    
		    
		    BABYLON.SceneLoader.LoadAssetContainer("./model/", "Hua.babylon", scene, function (container) {
			    var meshes = container.meshes;
			    var materials = container.materials;
			    //...
			    console.log(container);
				for (var i = 0; i < meshes.length; i++) {
//					meshes[i].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
//					meshes[i].position = new BABYLON.Vector3(0.0, -2.0, 0.0);
					waterMaterial.addToRenderList(meshes[i]);
					meshes[i].checkCollisions = true;
				}
			    // Adds all elements to the scene
			    container.addAllToScene();
			});
		    
		    
		    
		    
		    objs.ffBox = ffBox;
		    objs.camera = camera;
		    
		    waterMaterial.addToRenderList(ground);
		    waterMaterial.addToRenderList(ffBox);
		    
		    
		    
		    console.log(objs.camera);
		    // Return the created scene
//		    return scene;
		}
		
		createScene();

	
	// run the render loop
		engine.runRenderLoop(function(){
			objs.ffBox.position = objs.camera.globalPosition;
			if(objs.camera.position.x>1000){
				objs.camera.position.x = 1000;
			}else if(objs.camera.position.x<-1000){
				objs.camera.position.x = -1000;
			}else if(objs.camera.position.z>1000){
				objs.camera.position.z = 1000;
			}else if(objs.camera.position.z<-1000){
				objs.camera.position.z = -1000;
			}else if(objs.camera.position.y>20){
				objs.camera.position.y = 20;
			}
			
		    scene.render();
		});
		window.addEventListener('resize', function(){
		    engine.resize();
		});
	}
//	if(browser.isMobile || browser.isIos || browser.iPhone || browser.iPad) {
//		let container = document.getElementById("exhibition");
//		container.innerHTML = "<center><h2>你的設備無法完美支持<h2></center>";
//	} else {
//		
//	}
	webgl_view();
}