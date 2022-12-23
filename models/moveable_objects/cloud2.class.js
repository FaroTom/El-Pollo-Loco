class Cloud2 extends MoveableObject{
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');

        this.y = 15 + Math.random() * 10;
        this.x = 200 + Math.random() * 3000; 
        this.width = 400;
        this.height = 250;
        this.speed = 0.1 + Math.random() * 0.3; 
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}