# 2D Çizimden 3D Model Oluşturucu

Bu web uygulaması, kullanıcının çizdiği 2D şekilleri 3D modellere dönüştürmeyi sağlar. Uygulama, Three.js kütüphanesi kullanarak 3D görselleştirme yapar ve basit bir ekstrüzyon tekniğiyle 2D çizimleri 3D'ye dönüştürür.

## Özellikler

- Etkileşimli 2D çizim alanı
- Çizimleri 3D modellere dönüştürme
- 3D modelleri döndürme ve inceleme
- Model indirme seçeneği (geliştirme aşamasında)

## Teknolojiler

- HTML5 Canvas - 2D çizim için
- Three.js - 3D görselleştirme için
- TensorFlow.js - Gelecekteki NeRF (Neural Radiance Fields) entegrasyonu için

## Kurulum

1. Bu depoyu klonlayın:
```
git clone https://github.com/kullanici/2d-to-3d-converter.git
```

2. Proje dizinine gidin:
```
cd 2d-to-3d-converter
```

3. Projeyi yerel bir web sunucusu ile açın. Örneğin, Python kullanarak:
```
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

4. Tarayıcınızda `http://localhost:8000` adresine gidin.

## Nasıl Kullanılır

1. Sol taraftaki çizim alanında bir şekil çizin
2. Çizimi tamamladıktan sonra "3B Model Oluştur" düğmesine tıklayın
3. Sağ tarafta 3D model görüntülenecektir
4. Modeli fare ile döndürebilir, yakınlaştırabilir ve uzaklaştırabilirsiniz
5. Döndürme düğmelerini kullanarak modeli belirli açılarda döndürebilirsiniz

## Gelecekteki Geliştirmeler

- NeRF (Neural Radiance Fields) entegrasyonu ile daha gerçekçi 3D modeller
- Farklı 3D model formatlarında dışa aktarma (GLB, OBJ, STL)
- Birden fazla çizimi birleştirme desteği
- Materyal ve doku ekleme özellikleri

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için LICENSE dosyasına bakın.

---

Sorularınız veya geri bildirimleriniz için iletişime geçin: ornek@email.com 