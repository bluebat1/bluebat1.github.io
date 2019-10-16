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

document.getElementById("continue_buttton").onclick = function() {
	document.documentElement.scrollTop = window.innerWidth * 0.3;
}
window.onload = function() {
	check_screen();
	let browser = function() {
		let u = navigator.userAgent,
			app = navigator.appVersion;

		return { //移动终端浏览器版本信息 
			trident: u.indexOf("Trident") > -1, //IE内核
			presto: u.indexOf("Presto") > -1, //opera内核
			isWebKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
			gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
			isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
			iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf("iPad") > -1, //是否iPad
			webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
			isWeChat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
		};
	}();

	function webgl_view() {
		let stats, controls;
		let camera, scene, renderer, light;
		let clock = new THREE.Clock();
		let mixer;
		let container = document.getElementById("exhibition");

		let vw = container.offsetWidth,
			vh = container.offsetHeight;
		console.log("vw:" + vw + "vh:" + vh);
		let start = Date.now(),
			fov = 30;

		let timeUniform = {
			iGlobalTime: {
				type: 'f',
				value: 0.1
			},
			iResolution: {
				type: 'v2',
				value: new THREE.Vector2()
			}
		};
		timeUniform.iResolution.value.x = vw;
		timeUniform.iResolution.value.y = vh;

		init();
		animate();

		function init() {
			camera = new THREE.PerspectiveCamera(45, vw / vh, 1, 10000);
			camera.position.set(0, 100, 300);

			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xa0a0a0);
			scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
			light = new THREE.HemisphereLight(0xffffff, 0x444444);
			light.position.set(0, 200, 0);
			scene.add(light);
			light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 200, 100);
			light.castShadow = true;
			light.shadow.camera.top = 180;
			light.shadow.camera.bottom = -100;
			light.shadow.camera.left = -120;
			light.shadow.camera.right = 120;
			scene.add(light);
			// scene.add( new CameraHelper( light.shadow.camera ) );

			var axis = new THREE.AxesHelper(10);
			scene.add(axis);
			var s_geometry = new THREE.SphereGeometry(200, 32, 32);
			var b_material = new THREE.MeshBasicMaterial({
				color: 0xffff00,
				depthWrite: true,
			});

			var sp_material = new THREE.ShaderMaterial({
				uniforms: timeUniform,
				vertexShader: document.getElementById('vertex-shader').textContent,
				fragmentShader: document.getElementById('fragment-shader').textContent,
				depthWrite: false,
				depthTest: false
			});
			var water = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), sp_material);
			//				water.rotation.x = - Math.PI / 2;
			water.position.set(0, -100, 0);
			scene.add(water);

			let sphere = new THREE.Mesh(s_geometry, b_material);
			//				scene.add( sphere );

			// ground
			let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({
				color: 0x999999,
				depthWrite: false
			}));
			mesh.rotation.x = -Math.PI / 2;
			mesh.receiveShadow = true;
			//				scene.add( mesh );
			let grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
			grid.material.opacity = 0.2;
			grid.material.transparent = true;
			//				scene.add( grid );
			// model
			//				let loader = new THREE.FBXLoader();
			//				loader.load('model/233.fbx', function ( object ) {
			////					mixer = new THREE.AnimationMixer( object );
			////					let action = mixer.clipAction( object.animations[ 0 ] );
			////					action.play();
			////					object.traverse( function ( child ) {
			////						if ( child.isMesh ) {
			////							child.castShadow = true;
			////							child.receiveShadow = true;
			////						}
			////					} );
			//					object.scale.x=0.05;
			//					object.scale.y=0.05;
			//					object.scale.z=0.05;
			////					
			////					scene.add( object );
			////					console.log(object);
			//				} );

			renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(vw, vh);
			renderer.shadowMap.enabled = true;
			container.appendChild(renderer.domElement);

			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.target.set(0, 0, 0);
			controls.update();
			window.addEventListener('resize', onWindowResize, false);
			// stats
			//				stats = new Stats();
			//				container.appendChild( stats.dom );

			camera.lookAt(scene.position);
		}

		function onWindowResize() {
			vw = container.offsetWidth;
			vh = container.offsetHeight;
			camera.aspect = vw / vh;
			camera.updateProjectionMatrix();
			renderer.setSize(vw, vh);
			//console.log(vw+"-"+vh);
		}
		//
		var delta;

		function animate() {
			requestAnimationFrame(animate);
			delta = clock.getDelta();
			if(mixer) mixer.update(delta);
			renderer.render(scene, camera);

			timeUniform.iGlobalTime.value -= delta * 1.5;

			//				stats.update();
		}
	}
	if(browser.isMobile || browser.isIos || browser.iPhone || browser.iPad) {
		let container = document.getElementById("exhibition");
		container.innerHTML = "<center><h2>你的設備無法完美支持<h2></center>";
	} else {
		webgl_view();
	}
}