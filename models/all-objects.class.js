class AllObjects {

    x;
    y;
    img;
    width;
    height;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads the image in parameter
     * @param {img/path} path 
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"></img>
        this.img.src = path;
    }


    /**
     * Loads all images from Array
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image;
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * function draws object in parameter
     * @param {Object} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * function draws a hitbox around object (for develop use only!)
     * @param {Object} ctx 
     */
    drawHitbox(ctx) {
        if (this instanceof Chicken || this instanceof LilChicken || this instanceof Endboss || this instanceof Coin || this instanceof CollectBottle) {
            this.drawNormalHitbox();
        } else if (this instanceof Character) {
            this.drawPepeHitbox();
        }
    }


    /**
     * function draws hitbox for all moveable objects but pepe
     */
    drawNormalHitbox() {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * function draws hitbox for pepe
     */
    drawPepeHitbox() {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 25, this.y + 115, this.width - 45, this.height - 125);
        ctx.stroke();
    }
}