class ThrownBottle extends MoveableObject {
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPALSH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleHitSomething = false;


    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPALSH);

        this.y = y;
        this.x = x;
        this.width = 80;
        this.height = 80;

        this.applyGravity();
        this.bottleMovement();
        this.animate();
    }


    /**
     * function disables movement, if bottle hit something
     */
    bottleMovement() {
        this.speedY = 25;
        setInterval(() => {
            if (!this.bottleHitSomething) {
                this.x += 10;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 60);
    }


    /**
     * function animates bottle on the flight and on hit
     */
    animate() {
        setInterval(() => {
            if (this.bottleHitSomething) {
                this.playAnimation(this.IMAGES_BOTTLE_SPALSH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 50);
    }
}