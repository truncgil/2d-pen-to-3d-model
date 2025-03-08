/**
 * Three.js ile 3D görselleştirme fonksiyonları
 */
class ModelViewer {
    constructor() {
        this.container = document.getElementById('modelViewer');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.isInitialized = false;
        
        // Kontrol düğmeleri
        this.setupControlButtons();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Temel Three.js kurulumu
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        // Kamera oluştur
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 5);
        
        // Renderer oluştur
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Işıklandırma ekle
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1).normalize();
        this.scene.add(directionalLight);
        
        // Kontrol ekleme - OrbitControls uyumluluk kontrolü
        this.setupOrbitControls();
        
        // Zemin ızgarası
        const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
        gridHelper.material.opacity = 0.5;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Pencere yeniden boyutlandırma
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Animasyon döngüsü başlat
        this.animate();
        
        this.isInitialized = true;
    }
    
    setupOrbitControls() {
        // OrbitControls'un tanımlı olup olmadığını kontrol et
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            console.log('OrbitControls başarıyla ayarlandı.');
        } else {
            console.error('OrbitControls tanımlı değil! Kamera kontrolü çalışmayacak.');
            alert('3D kamera kontrolü yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.');
            
            // Alternatif olarak basit bir kamera kontrolü sağla
            this.setupBasicCameraControls();
        }
    }
    
    setupBasicCameraControls() {
        // Basit manuel kamera kontrolü
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) { // Sol tıklama
                this.camera.position.x += e.movementX * 0.01;
                this.camera.position.y -= e.movementY * 0.01;
            }
        });
        
        this.renderer.domElement.addEventListener('wheel', (e) => {
            this.camera.position.z += e.deltaY * 0.01;
        });
    }
    
    onWindowResize() {
        if (!this.isInitialized) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    setupControlButtons() {
        const rotateLeft = document.getElementById('rotateLeft');
        const rotateRight = document.getElementById('rotateRight');
        const downloadModel = document.getElementById('downloadModel');
        
        rotateLeft.addEventListener('click', () => {
            if (this.model) {
                this.model.rotation.y -= Math.PI / 12;
            }
        });
        
        rotateRight.addEventListener('click', () => {
            if (this.model) {
                this.model.rotation.y += Math.PI / 12;
            }
        });
        
        downloadModel.addEventListener('click', () => {
            if (this.model) {
                this.downloadModel();
            } else {
                alert('Henüz bir model oluşturulmadı.');
            }
        });
    }
    
    showModel(modelData) {
        this.init();
        
        // Eski modeli kaldır
        if (this.model) {
            this.scene.remove(this.model);
        }
        
        this.model = modelData;
        this.scene.add(this.model);
        
        // Kamerayı modele göre konumlandır
        this.resetCamera();
    }
    
    resetCamera() {
        if (!this.model) return;
        
        // Model etrafında dolaşmayı kolaylaştırmak için kamerayı konumlandır
        const box = new THREE.Box3().setFromObject(this.model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        
        this.model.position.x = this.model.position.x - center.x;
        this.model.position.y = this.model.position.y - center.y;
        this.model.position.z = this.model.position.z - center.z;
        
        this.camera.position.copy(center);
        this.camera.position.x += size / 2.0;
        this.camera.position.y += size / 5.0;
        this.camera.position.z += size * 1.5;
        this.camera.lookAt(center);
        
        this.camera.updateProjectionMatrix();
        if (this.controls) {
            this.controls.update();
        }
    }
    
    downloadModel() {
        // GLB formatında 3D model indirme
        // Not: Bu fonksiyon GLTFExporter kullanılarak genişletilebilir
        alert('Model indirme fonksiyonu henüz uygulanmadı.');
    }
}

// Sayfa yüklendiğinde görselleştiriciyi oluştur
document.addEventListener('DOMContentLoaded', () => {
    window.modelViewer = new ModelViewer();
}); 