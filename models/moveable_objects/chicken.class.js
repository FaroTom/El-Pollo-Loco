class Chicken extends MoveableObject {

    width = 75;
    height = 90;
    chickenAlive = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.y = 330 + Math.random() * 20;
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.2 + Math.random() * 0.6;

        this.animate();
    }


    /**
     * function animates and moves the chicken
     */
    animate() {
        this.moveChicken();
        this.animateChicken();
    }


    /**
     * function moves the chicken
     */
    moveChicken() {
        setInterval(() => {
            if (this.chickenAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * function animates the chicken
     */
    animateChicken() {
        setInterval(() => {
            if (this.chickenAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 1000 / 10)
    }
}