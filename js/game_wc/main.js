window.onload=function(){
			let container, stats, controls;
			let camera, scene, renderer, light;
			let clock = new THREE.Clock();
			let mixer,vw,vh;
			init();
			animate();
			
			var obj_s = [];
			
			function init() {
				container = document.getElementById("game");
				vw = container.offsetWidth;
				vh = container.offsetHeight;
				
				camera = new THREE.PerspectiveCamera( 45, vw / vh, 1, 2000 );
				camera.position.set( 100, 400, 600 );
				camera.lookAt(0,0,0);
				
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xa0a0a0 );
				scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
				light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 200, 0 );
				scene.add( light );
				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 200, 100 );
				light.castShadow = true;
				light.shadow.camera.top = 180;
				light.shadow.camera.bottom = - 100;
				light.shadow.camera.left = - 120;
				light.shadow.camera.right = 120;
				scene.add( light );
				// scene.add( new CameraHelper( light.shadow.camera ) );
				// ground
				let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );
				let grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				scene.add( grid );
				
				var texture = new THREE.TextureLoader().load( 'js/game_wc/timg.jpg' );
				
				var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffffff,map:texture} );
				var boxs = new THREE.Mesh( geometry, material );
				scene.add( boxs );
				
				obj_s[0]=boxs;
				console.log(obj_s[0]);
				
				
				
				
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( vw, vh );
				renderer.shadowMap.enabled = true;
				
				container.appendChild( renderer.domElement );
				
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 100, 0 );
				controls.update();
				controls.enableDamping = true;
				
				
				window.addEventListener( 'resize', onWindowResize, false );
				// stats
				stats = new Stats();
				container.appendChild( stats.dom );
			}
			function onWindowResize() {
				camera.aspect = vw / vh;
				camera.updateProjectionMatrix();
				renderer.setSize( vw, vh);
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				let delta = clock.getDelta();
				if ( mixer ) mixer.update( delta );
				renderer.render( scene, camera );
				
				
				
				stats.update();
			}
}




