// 基本的Three.js设置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);  // 设置背景颜色为白色
document.body.appendChild(renderer.domElement);


// 增加环境光和方向光的强度
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);  // 增强环境光的强度
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);  // 增强方向光的强度
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// 添加点光源以进一步增加亮度
const pointLight = new THREE.PointLight(0xffffff, 1.5);  // 创建一个点光源
pointLight.position.set(5, 5, 5);  // 设置点光源的位置
scene.add(pointLight);  // 将点光源添加到场景中

// 轨道控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // 启用阻尼效果
controls.dampingFactor = 0.01;  // 设置阻尼因子
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;

// 摄像机位置
camera.position.set(0, 2, 5);
controls.update();

// 加载HDRI环境贴图（可选）
const rgbeLoader = new THREE.RGBELoader();
rgbeLoader.setPath('path/to/your/hdri/').load('your-hdri-file.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = null;  // 保持背景为白色
}, undefined, function(error) {
    console.error('An error occurred while loading the HDRI:', error);
});

// 加载器
const loader = new THREE.GLTFLoader();
let model;

// 加载模型
loader.load('models/model.gltf', function(gltf) {
    model = gltf.scene;

    // 遍历模型并设置材质属性以响应光照

    scene.add(model);
    console.log("Model loaded successfully");
}, undefined, function(error) {
    console.error("An error occurred while loading the model:", error);
});

// 窗口调整大小处理
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
