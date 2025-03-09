# 2D Çizimden 3D Model Oluşturucu

Bu web uygulaması, 2D çizimleri ekstrüzyon ve NeRF (Neural Radiance Fields) teknikleri kullanarak 3D modellere dönüştüren bir araçtır. Three.js ve TensorFlow.js kütüphaneleri üzerine inşa edilmiş olup, WebGL tabanlı gerçek zamanlı render işlemleri gerçekleştirir.

## Teknik Özellikler

- Çizim Motoru:
  - HTML5 Canvas API
  - Vektör tabanlı çizim yakalama
  - Dinamik stroke interpolasyonu
  - Çoklu katman desteği
- 3D Dönüşüm Sistemi:
  - Ekstrüzyon tabanlı mesh oluşturma
  - NeRF entegrasyonu (TensorFlow.js)
  - Otomatik normalizasyon ve optimizasyon
- Render Motoru:
  - WebGL tabanlı Three.js renderer
  - PerspectiveCamera ile dinamik görüş kontrolü
  - OrbitControls destekli interaktif manipülasyon
  - Gerçek zamanlı gölgelendirme ve ışıklandırma
- Responsive UI:
  - CSS Grid ve Flexbox layout
  - Dinamik viewport adaptasyonu
  - Touch-enabled kontroller

## Teknoloji Yığını

- Frontend:
  - HTML5 Canvas - Vektör tabanlı çizim işlemleri
  - Three.js - WebGL tabanlı 3D render motoru
  - CSS3 - Grid/Flexbox tabanlı responsive layout
  - JavaScript (ES6+) - Asenkron işlem yönetimi
- AI/ML:
  - TensorFlow.js - NeRF implementasyonu
  - Custom NeRF modeli - 2D->3D dönüşüm
- Build/Development:
  - Modern JavaScript modül sistemi
  - ES6+ syntax ve özellikler

## Kurulum

1. Repository klonlama:
```bash
git clone https://github.com/truncgil/2d-pen-to-3d-model.git
```

2. Proje dizinine geçiş:
```bash
cd 2d-pen-to-3d-model
```

3. Geliştirme sunucusu başlatma:
```bash
# Python 3 HTTP sunucusu
python -m http.server 8000

# Python 2 HTTP sunucusu
python -m SimpleHTTPServer 8000

# Node.js HTTP sunucusu
npx http-server
```

4. `http://localhost:8000` adresinde uygulamayı açın

## Teknik Kullanım

1. Çizim Arayüzü
   - Vektör tabanlı stroke yakalama
   - Dinamik pen pressure desteği
   - RGB/HSL renk uzayı seçimi
   - Stroke interpolasyon kontrolü

2. 3D Dönüşüm
   - NeRF tabanlı mesh oluşturma
   - Otomatik normalizasyon
   - Vertex optimizasyonu
   - Normal ve UV map üretimi

3. Model Manipülasyonu
   - OrbitControls ile 6-DOF manipülasyon
   - Mesh transformasyon kontrolü
   - Real-time render ayarları
   - GLB/OBJ/STL export

## Geliştirme Yol Haritası

- [ ] Multi-view NeRF entegrasyonu
- [ ] CUDA destekli mesh optimizasyonu
- [ ] PBR materyal sistemi
- [ ] Vertex/Face düzenleme araçları
- [ ] UV unwrapping araçları
- [ ] Otomatik rigging sistemi

## Katkıda Bulunma

1. Fork işlemi
2. Feature branch oluşturma (`git checkout -b feature/xyz`)
3. Commit (`git commit -am 'Feature: XYZ implementasyonu'`)
4. Push (`git push origin feature/xyz`)
5. Pull Request oluşturma

## Lisans

MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Teknik sorular ve öneriler için:
- E-posta: ornek@email.com
- GitHub Issues: [Issue Tracker](https://github.com/truncgil/2d-pen-to-3d-model/issues)

---

Baş Geliştirici: [Adınız](https://github.com/truncgil)