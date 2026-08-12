export default class Antigravity {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            count: 300,
            magnetRadius: 6,
            ringRadius: 7,
            waveSpeed: 0.4,
            waveAmplitude: 1,
            particleSize: 1.5,
            lerpSpeed: 0.05,
            color: '#5227FF',
            autoAnimate: true,
            particleVariance: 1,
            rotationSpeed: 0,
            depthFactor: 1,
            pulseSpeed: 3,
            particleShape: 'capsule',
            fieldStrength: 10
        }, options);

        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.frame = null;
        this.lastTime = 0;
        this.resize();
        this.initParticles();

        window.addEventListener('resize', () => this.resize());

        if (this.options.autoAnimate) {
            this.animate = this.animate.bind(this);
            this.frame = requestAnimationFrame(this.animate);
        }
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(rect.width, 100);
        this.height = Math.max(rect.height, 100);
        this.canvas.width = Math.floor(this.width * window.devicePixelRatio);
        this.canvas.height = Math.floor(this.height * window.devicePixelRatio);
        this.ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    initParticles() {
        this.particles = Array.from({ length: this.options.count }, (_, index) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = this.options.ringRadius * 24 + Math.random() * 120;
            return {
                angle,
                baseRadius: radius,
                size: this.options.particleSize + Math.random() * this.options.particleVariance,
                offset: Math.random() * Math.PI * 2,
                speed: 0.0008 + Math.random() * 0.0016,
                alpha: 0.2 + Math.random() * 0.6
            };
        });
    }

    animate(time) {
        const delta = (time - this.lastTime) * 0.001;
        this.lastTime = time;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawParticles(time * 0.001);
        this.frame = requestAnimationFrame(this.animate);
    }

    drawParticles(timestamp) {
        const ctx = this.ctx;
        const { waveSpeed, waveAmplitude, rotationSpeed, pulseSpeed, color, particleShape, fieldStrength, depthFactor } = this.options;

        this.particles.forEach((particle, index) => {
            const rotation = particle.angle + timestamp * rotationSpeed * 0.3;
            const wave = Math.sin(timestamp * waveSpeed + particle.offset) * waveAmplitude * 16;
            const r = particle.baseRadius + wave + Math.sin(index * 0.1 + timestamp * pulseSpeed) * 8;
            const x = this.centerX + Math.cos(rotation) * r;
            const y = this.centerY + Math.sin(rotation) * r;
            const depth = Math.sin(rotation * depthFactor * 0.7) * 0.5 + 0.5;
            const size = particle.size * (0.6 + depth * 0.8);
            const alpha = particle.alpha * (0.4 + depth * 0.6);

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;

            if (particleShape === 'capsule') {
                ctx.translate(x, y);
                ctx.rotate(rotation * 0.2);
                ctx.beginPath();
                const height = size * 3;
                ctx.roundRect(-size * 0.6, -height / 2, size * 1.2, height, size * 0.6);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });
    }

    destroy() {
        cancelAnimationFrame(this.frame);
        this.canvas.remove();
    }
}
