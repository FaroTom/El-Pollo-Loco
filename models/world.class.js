class World {

    ctx;
    canvas;
    keyboard;

    character = new Character();
    noRecentHit = true
    camera_x = 0;

    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    coinAmount = 0;

    thrownBottle = new ThrownBottle();
    allThrownBottles = [];
    bottleAmmo = 0;

    level = level1;

    drawTheGame;
    gameInterval;
    gameGoesOn = true;

    sound = true
    gameMusic = new Audio('audio/game_sound.mp3');
    gameSounds = [
        new Audio('audio/lose.mp3'),
        new Audio('audio/win.mp3'),
        new Audio('audio/throw.mp3'),
        new Audio('audio/bottle_breaks.mp3')
    ];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runGame();
        this.playGameMusic();
    }


    /**
     * function plays game music, if music is turned on
     */
    playGameMusic() {
        setTimeout(() => {
            if (this.sound) {
                this.gameMusic.volume = 0.05;
                this.gameMusic.play();
                setInterval(() => {
                    if (this.character.isDead() || this.level.enemies[0].died ) {
                        this.gameMusic.pause();
                    }
                }, 1000 / 60);
            }
        }, 100);
    }


    /**
     * Repeat clear and draw all elements
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawMovableObjects();
        this.drawStaticObjects();
        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        this.drawTheGame = requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Function deletes everything from canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Function draws all movable object onto canvas
     */
    drawMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.allThrownBottles);
        this.addToMap(this.character);
    }


    /**
     * Function draws all static object onto canvas
     */
    drawStaticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * function draws multiple objects onto canvas
     * @param {Array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * function draws object onto canvas
     * @param {Object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // mo.drawHitbox(this.ctx); //only for develop useage
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * function mirrors the context on canvas
     * @param {Object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * function mirrors the context back to normal on canvas
     * @param {Object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Function defines world to the variable "world" in different objects
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies[0].world = this;
    }


    /**
     * Function runs the game with 60 refreshes per second
     */
    runGame() {
        this.gameInterval = setInterval(() => this.updateGame60Times(), 1000 / 60);
    }


    /**
     * function lists all the functions which has to be updated every 60 seconds
     */
    updateGame60Times() {
        this.checkCollisions();
        this.checkCollections();
        this.throwOnSpace();
        this.checkGameOver();
    }


    /**
     * function checks if anything collides (Pepe, Thrown Bottles, Enemies)
     */
    checkCollisions() {
        this.checkChickenCollision();
        this.checkBossCollision();
        this.checkBottleCollision();
    }


    /**
     * function checks if pepe collects anything
     */
    checkCollections() {
        this.checkBottleCollection();
        this.checkCoinCollection();
    }


    /**
     * function throws a bottle if SPACE is hit
     */
    throwOnSpace() {
        if (this.keyboard.D && this.bottleAmmo > 0) {
            keyboard.D = false;
            this.playGameSound(2);
            let newBottle = new ThrownBottle(this.character.x + 60, this.character.y + 100)
            this.allThrownBottles.push(newBottle);
            this.bottleAmmo--;
            this.bottleBar.updateStatusBar(this.bottleBar.IMAGES_BOTTLE_BAR, this.bottleAmmo);
        }
    }


    /**
     * function checks if pepe collides with any enemy
     */
    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOn(enemy)) {
                this.killChicken(enemy);
                this.bounceJumpKill();
            }
            if (this.character.isColliding(enemy)) {
                this.pepeGetsHurt();
            }
        });
    }


    /**
     * function kills chicken in parameter
     * @param {Cicken} enemy 
     */
    killChicken(enemy) {
        let hitEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies[hitEnemy].chickenAlive = false;
        setTimeout(() => this.deleteEnemy(hitEnemy), 250)
    }


    /**
     * function deletes hit enemy
     * @param {Object} hitEnemy 
     */
    deleteEnemy(hitEnemy) {
        this.level.enemies.splice(hitEnemy, 1);
    }


    /**
     * function lets pepe bounce up
     */
    bounceJumpKill() {
        this.character.speedY = 12;
    }


    /**
     * function hurts pepe
     */
    pepeGetsHurt() {
        this.character.hit();
        this.healthBar.updateStatusBar(this.healthBar.IMAGES_HEALTH_PEPE, this.character.energy);
    }


    /**
     * function checks if pepe collides with boss
     */
    checkBossCollision() {
        if (this.pepeHitsBoss() && this.noRecentHit) {
            this.knocksBackPepe();
            this.bossAttackAnimation();
        }
    }


    /**
     * @returns true if pepe hits boss
     */
    pepeHitsBoss() {
        return this.character.x >= this.level.enemies[0].x - 100;
    }


    /**
     * function animates the knockback of pepe
     */
    knocksBackPepe() {
        this.character.speedY = 15;
        let i = setInterval(() => this.kockback(), 1000 / 60);
        setTimeout(() => clearInterval(i), 300);
    }


    /**
     * function kocks back pepe
     */
    kockback() {
        this.character.x -= 10;
        this.keyboard.RIGHT = false;
        this.keyboard.LEFT = false;
    }


    /**
     * function play boss attack animation and prevents pepe from taking multiple hits
     */
    bossAttackAnimation() {
        this.level.enemies[0].bossAttacks();
        this.noRecentHit = false;
        setTimeout(() => {
            this.noRecentHit = true;
        }, 1500);
    }


    /**
     * function check if any thrown bottle hitted something
     */
    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.allThrownBottles.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.bottleHit(bottle, enemy);
                }
            })
        })
    }


    /**
     * function checks if bottle hit normal chicken or boss and lets bottle splash
     * @param {Object} bottle 
     * @param {Object} enemy 
     */
    bottleHit(bottle, enemy) {
        bottle.bottleHitSomething = true;
        this.playGameSound(3);
        if (this.bottleHitBoss(bottle)) {
            this.level.enemies[0].bossGetsHit();
        } else {
            this.killChicken(enemy);
        }
        this.deleteAfterSplash(bottle);
    }


    /**
     * @param {Object} bottle 
     * @returns true if bottle hitted boss
     */
    bottleHitBoss(bottle) {
        return bottle.x >= this.level.enemies[0].x - 100;
    }


    /**
     * function deletes bottle after splash animation
     * @param {Object} bottle 
     */
    deleteAfterSplash(bottle) {
        setTimeout(() => {
            let positionOfBottle = this.allThrownBottles.indexOf(bottle)
            this.allThrownBottles.splice(positionOfBottle, 1);
        }, 300);
    }


    /**
     * function checks if pepe collects a bottle
     */
    checkBottleCollection() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        })
    }


    /**
     * function lets pepe collect touched bottle
     * @param {Object} bottle 
     */
    collectBottle(bottle) {
        let collectedBottle = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(collectedBottle, 1);
        this.bottleAmmo++;
        this.bottleBar.updateStatusBar(this.bottleBar.IMAGES_BOTTLE_BAR, this.bottleAmmo);
    }


    /**
    * function checks if pepe collects a coin
    */
    checkCoinCollection() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        })
    }


    /**
     * function lets pepe collect touched coin
     * @param {Object} coin
     */
    collectCoin(coin) {
        let collectedCoin = this.level.coins.indexOf(coin);
        this.level.coins.splice(collectedCoin, 1);
        this.coinAmount++;
        this.coinBar.updateStatusBar(this.coinBar.IMAGES_COIN_BAR, this.coinAmount);
    }


    /**
     * function checks if either pepe or boss died
     */
    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => this.lostTheGame(), 250); //timeout for pepe death animation
        } else if (this.level.enemies[0].died) {
            this.wonTheGame();
        }
    }


    /**
     * function renders win screen after victory
     */
    wonTheGame() {
        this.stopTheGame();
        this.showWin();
    }


    /**
     * function renders lost screen after defeat
     */
    lostTheGame() {
        this.stopTheGame();
        this.showLose();
    }


    /**
     * function stops the game
     */
    stopTheGame() {
        cancelAnimationFrame(this.drawTheGame);
        clearInterval(this.gameInterval);
        this.clearInput();
    }


    /**
     * function clears all input from player
     */
    clearInput() {
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        keyboard.UP = false;
        keyboard.SPACE = false;
    }


    /**
     * function shows the win for player
     */
    showWin() {
        this.playGameSound(1);
        setTimeout(() => {
            document.getElementById('playButtons').style = 'display: none;'
            document.getElementById('endScreenWin').classList.remove('d-none');
        }, 1500);
    }


    /**
     * function shows the lose for player
     */
    showLose() {
        this.playGameSound(0);
        setTimeout(() => {
            document.getElementById('playButtons').style = 'display: none;'
            document.getElementById('endScreenLose').classList.remove('d-none')
        }, 1500);
    }

    playGameSound(number) {
        if (this.sound) {
            let gameSound = this.gameSounds[number];
            gameSound.volume = 0.2;
            gameSound.play();
        }
    }
}