/**
 * 2D çizimden 3D model oluşturma fonksiyonları
 * Bu modül, çizim verilerini alıp Three.js ile 3D modele dönüştürür.
 */
class ModelGenerator {
    constructor() {
        this.isGenerating = false;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const generateButton = document.getElementById('generateModel');
        generateButton.addEventListener('click', () => {
            if (!this.isGenerating) {
                this.generate2Dto3D();
            }
        });
    }
    
    async generate2Dto3D() {
        if (!window.drawingTool || !window.modelViewer) {
            console.error('Çizim aracı veya model görüntüleyici bulunamadı');
            return;
        }
        
        this.isGenerating = true;
        
        try {
            // Kullanıcıya işlem yapıldığını bildir
            const generateButton = document.getElementById('generateModel');
            const originalText = generateButton.textContent;
            generateButton.textContent = 'İşleniyor...';
            generateButton.disabled = true;
            
            // Çizim verilerini al
            const imageData = window.drawingTool.getImageData();
            const strokesData = window.drawingTool.getStrokesData();
            
            // 3D model oluştur - Basit yaklaşım: Extrude
            const model = await this.createBasicExtrusion(strokesData);
            
            // Alternatif olarak, daha gelişmiş bir NeRF tabanlı modelleme kullanabiliriz:
            // const model = await this.createNerfModel(imageData);
            
            // Modeli görüntüle
            window.modelViewer.showModel(model);
            
            // Buton durumunu geri al
            generateButton.textContent = originalText;
            generateButton.disabled = false;
            
        } catch (error) {
            console.error('Model oluşturulurken hata:', error);
            alert('Model oluşturulurken bir hata oluştu: ' + error.message);
        } finally {
            this.isGenerating = false;
        }
    }
    
    async createBasicExtrusion(strokesData) {
        // Çizim vurgu verilerini al
        const strokes = JSON.parse(strokesData);
        if (!strokes || strokes.length === 0) {
            throw new Error('Çizim verisi bulunamadı');
        }
        
        // Ana grup
        const modelGroup = new THREE.Group();
        
        // Çeviriciler ve parametreler
        const extrude = 0.5; // Ekstrüzyon derinliği
        const material = new THREE.MeshStandardMaterial({
            color: 0xcd853f, // Ahşap rengi
            roughness: 0.8,
            metalness: 0.2,
            side: THREE.DoubleSide
        });
        
        // Çizimleri 2D olarak süpür
        const allPoints = [];
        
        // Tüm noktaları topla ve normalize et
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        strokes.forEach(stroke => {
            stroke.points.forEach(point => {
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
                
                allPoints.push(new THREE.Vector2(point.x, -point.y)); // Y yönünü ters çevir
            });
        });
        
        // Çizim boyutlarını al
        const width = maxX - minX;
        const height = maxY - minY;
        const centerX = minX + width / 2;
        const centerY = minY + height / 2;
        
        // Basit ekstrüzyon şekli - dikdörtgen ana forma
        const baseShape = new THREE.Shape();
        const normalizedPoints = strokes[0].points.map(p => 
            new THREE.Vector2((p.x - centerX) / 100, -(p.y - centerY) / 100)
        );
        
        if (normalizedPoints.length > 0) {
            baseShape.moveTo(normalizedPoints[0].x, normalizedPoints[0].y);
            for (let i = 1; i < normalizedPoints.length; i++) {
                baseShape.lineTo(normalizedPoints[i].x, normalizedPoints[i].y);
            }
            baseShape.closePath();
            
            // Şekli ekstrüde et
            const extrudeSettings = {
                steps: 1,
                depth: extrude,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelSegments: 3
            };
            
            const geometry = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            
            modelGroup.add(mesh);
        }
        
        // Alternatif olarak, bir "outline" (çevresel hat) ekleyelim
        // Daha gerçekçi bir nesne için çizgi temelli bir yaklaşım
        if (strokes.length > 0) {
            const outlineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x2c3e50,
                linewidth: 2
            });
            
            for (const stroke of strokes) {
                const points = stroke.points.map(p => 
                    new THREE.Vector3(
                        (p.x - centerX) / 100, 
                        -(p.y - centerY) / 100, 
                        extrude + 0.01
                    )
                );
                
                if (points.length > 1) {
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(lineGeometry, outlineMaterial);
                    modelGroup.add(line);
                }
            }
        }
        
        return modelGroup;
    }
    
    async createNerfModel(imageData) {
        // Bu fonksiyon, daha gelişmiş bir 3D dönüşüm için NeRF benzeri bir yaklaşım kullanabilir
        // Not: Bu, sadece bir mockup/taslak fonksiyondur gerçek NeRF uygulaması için
        // TensorFlow.js veya harici bir API kullanılması gerekebilir
        
        alert('NeRF tabanlı model oluşturma henüz uygulanmadı. Basit ekstrüzyon modeli kullanılıyor.');
        
        // Basit ekstrüzyon modeline geri dön
        return this.createBasicExtrusion(window.drawingTool.getStrokesData());
    }
}

// Sayfa yüklendiğinde model oluşturucuyu başlat
document.addEventListener('DOMContentLoaded', () => {
    window.modelGenerator = new ModelGenerator();
}); 