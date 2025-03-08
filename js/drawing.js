/**
 * Çizim fonksiyonları
 */
class DrawingTool {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.penColor = '#000000';
        this.penSize = 5;
        this.strokes = [];
        this.currentStroke = null;

        this.initCanvas();
        this.setupEventListeners();
    }

    initCanvas() {
        // Canvas'ı doğru boyuta getir
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Varsayılan ayarlar
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.penColor;
        this.ctx.lineWidth = this.penSize;
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Ekran çözünürlüğü için ölçekleme faktörü
        const dpr = window.devicePixelRatio || 1;
        
        // Display boyutu
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = '400px';
        
        // Gerçek canvas boyutu (daha keskin çizim için)
        this.canvas.width = rect.width * dpr;
        this.canvas.height = 400 * dpr;
        
        // Ölçekleme faktörünü uygula
        this.ctx.scale(dpr, dpr);
        
        // Önceki çizimleri yeniden çiz
        this.redraw();
    }

    setupEventListeners() {
        // Renk ve boyut değişikliği
        const colorPicker = document.getElementById('penColor');
        const penSizeSlider = document.getElementById('penSize');
        
        colorPicker.addEventListener('input', (e) => {
            this.penColor = e.target.value;
            this.ctx.strokeStyle = this.penColor;
        });
        
        penSizeSlider.addEventListener('input', (e) => {
            this.penSize = e.target.value;
            this.ctx.lineWidth = this.penSize;
        });
        
        // Çizim olayları
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Dokunmatik olaylar
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(this.getTouchPos(e));
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(this.getTouchPos(e));
        });
        
        this.canvas.addEventListener('touchend', () => this.stopDrawing());

        // Temizleme butonu
        const clearButton = document.getElementById('clearCanvas');
        clearButton.addEventListener('click', () => this.clearCanvas());
    }

    getTouchPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        return {
            clientX: touch.clientX,
            clientY: touch.clientY,
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        };
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.currentStroke = {
            color: this.penColor,
            width: this.penSize,
            points: [{x: e.offsetX, y: e.offsetY}]
        };
        
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        this.currentStroke.points.push({x: e.offsetX, y: e.offsetY});
        
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
    }

    stopDrawing() {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.ctx.closePath();
            
            // Çizimi kaydet
            if (this.currentStroke && this.currentStroke.points.length > 1) {
                this.strokes.push(this.currentStroke);
                this.currentStroke = null;
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokes = [];
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const stroke of this.strokes) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = stroke.color;
            this.ctx.lineWidth = stroke.width;
            
            const points = stroke.points;
            this.ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                this.ctx.lineTo(points[i].x, points[i].y);
            }
            
            this.ctx.stroke();
            this.ctx.closePath();
        }
        
        // Çizim stilini geri ayarla
        this.ctx.strokeStyle = this.penColor;
        this.ctx.lineWidth = this.penSize;
    }

    getImageData() {
        return this.canvas.toDataURL('image/png');
    }

    getStrokesData() {
        return JSON.stringify(this.strokes);
    }
}

// Sayfa yüklendiğinde çizim aracını başlat
document.addEventListener('DOMContentLoaded', () => {
    window.drawingTool = new DrawingTool();
}); 