/**
 * Ana JavaScript dosyası - Uygulama başlatma ve koordinasyon
 */
document.addEventListener('DOMContentLoaded', () => {
    // Uygulama bileşenlerinin yüklendiğinden emin olalım
    if (!window.drawingTool) {
        console.error('Çizim aracı yüklenemedi.');
    }
    
    if (!window.modelViewer) {
        console.error('Model görüntüleyici yüklenemedi.');
    }
    
    if (!window.modelGenerator) {
        console.error('Model oluşturucu yüklenemedi.');
    }
    
    // OrbitControls'un hazır olup olmadığını kontrol et
    ensureOrbitControlsLoaded();
    
    // Uygulama hazır metni
    console.log('2D Çizimden 3D Model Uygulaması Hazır');
    
    // Örnek bilgi mesajı göster
    const message = `
        <div style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4a6baf; margin: 10px 0;">
            <h3 style="margin-top: 0;">2D'den 3D'ye Dönüşüm Uygulaması</h3>
            <p>Sol taraftaki çizim alanına bir şekil çizin ve "3B Model Oluştur" düğmesine tıklayın.</p>
            <p>Kapalı şekiller (başlangıç ve bitiş noktaları birleşen) en iyi sonuçları verir.</p>
        </div>
    `;
    
    // Sadece bilgi mesajını göstermek için basit bir modal oluştur
    const infoModal = document.createElement('div');
    infoModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 500px;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        overflow: hidden;
        background: white;
    `;
    
    infoModal.innerHTML = `
        ${message}
        <div style="text-align: right; padding: 10px;">
            <button id="closeInfoModal" style="padding: 8px 15px; background: #4a6baf; color: white; border: none; border-radius: 4px; cursor: pointer;">Anladım</button>
        </div>
    `;
    
    document.body.appendChild(infoModal);
    
    document.getElementById('closeInfoModal').addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
    
    // Uygulama hata işleme
    window.addEventListener('error', (e) => {
        console.error('Uygulama hatası:', e.error || e.message);
        alert(`Bir hata oluştu: ${e.error?.message || e.message}`);
    });
});

/**
 * OrbitControls'un yüklenip yüklenmediğini kontrol et
 * Eğer yüklenmemişse manuel olarak yükle
 */
function ensureOrbitControlsLoaded() {
    if (typeof THREE === 'undefined') {
        console.error('THREE kütüphanesi yüklenemedi!');
        alert('Three.js yüklenemedi! Lütfen sayfayı yenileyin ve internet bağlantınızı kontrol edin.');
        return;
    }
    
    // OrbitControls yüklenmediyse
    if (typeof THREE.OrbitControls === 'undefined') {
        console.warn('OrbitControls yüklenemedi, manuel yükleme deneniyor...');
        
        // Eski sürüm kullanımı
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js';
        script.onload = function() {
            console.log('OrbitControls başarıyla yüklendi!');
            
            // OrbitControls'u THREE nesnesine ekle (bazı eski tarayıcılar için)
            if (typeof THREE.OrbitControls === 'undefined' && window.OrbitControls) {
                THREE.OrbitControls = window.OrbitControls;
                console.log('OrbitControls THREE nesnesine atandı.');
            }
        };
        script.onerror = function() {
            console.error('OrbitControls yüklenirken hata oluştu!');
            alert('3D kontrolleri yüklenirken hata oluştu. Bazı özellikler çalışmayabilir.');
        };
        
        document.head.appendChild(script);
    } else {
        console.log('OrbitControls hazır.');
    }
} 