class MoveableObject extends AllObjects {

    speedY = 0;
    acceleration = 1.3;

    otherDirection = 0;

    energy = 5;
    noRecentHit = true;


    /**
     * function repeatly goes through array (images of array)
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * function increases x of calling object
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * function decreases x of calling object
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * function gives calling object a positive speed in y
     */
    jump() {
        this.speedY = 22;
    }


    /**
     * Function applys gravity to object who calls function
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * @returns true if object who calls function is above ground or a thrown bottle
     */
    isAboveGround() {
        if (this instanceof ThrownBottle) {
            return true;
        } else {
            return this.y < 135;
        }
    }


    /**
     * function decreases energy form object calling it
     */
    hit() {
        if (this.noRecentHit) {
            this.energy -= 1;
            this.noRecentHit = false;
            setTimeout(() => {
                this.noRecentHit = true;
            }, 1000)

        }
    }


    /**
     * @returns true if energy of calling object is 0
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * @param {Object} mo 
     * @returns true if object, tht calls this function ist colliding with object in parameter
     */
    isColliding(mo) { // This is the longest function i have, but i dont think i can shorten it!
        if (this instanceof Character) {
            return this.x + this.width - 20 > mo.x &&   // the numbers define pepes real hitbox
            this.x + 25 < mo.x + mo.width &&            // the numbers define pepes real hitbox 
            this.y + this.height > mo.y + 10 &&         // the numbers define pepes real hitbox
            this.y + 115 < mo.y + mo.height             // the numbers define pepes real hitbox
        } else if (mo instanceof Endboss) {
            return this.x + this.width > mo.x + 20 &&   // the numbers define Endboss real hitbox
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y + 130           // the numbers define Endboss real hitbox
        } else {
            return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y
        }
    }


    /**
     * @param {Object} mo 
     * @returns true if object that calls this function lands on top of object in parameter
     */
    jumpsOn(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height + 5 >= mo.y - 5 &&           // 20px vertical Hitbox on Head of enemy
            this.y + this.height - 5 <= mo.y + 5 &&           // 20px vertical Hitbox on Head of enemy
            this.speedY < 0;                                  // Character has to fall
    }
}