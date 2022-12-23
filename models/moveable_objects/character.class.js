class Character extends MoveableObject {

    x = 120;
    y = 135;
    width = 150;
    height = 300;
    speed = 8;
    waitingTime = 0;
    world;
    mainI;

    IMAGES_SHORT_WAIT = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_WAIT = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    walking_sound = new Audio('audio/walking.mp3');
    pepeGrunt = new Audio('audio/is_hurt.mp3');
    pepeJumpSound = new Audio('audio/jump.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_SHORT_WAIT);
        this.loadImages(this.IMAGES_LONG_WAIT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();
        this.animate();
    }


    /**
     * function moves and animates pepe during the game
     */
    animate() {
        setInterval(() => {
            this.setSoundAndCamera();
            this.checkRightBtn();
            this.checkLeftBtn();
            this.checkJumpBtn();
        }, 1000 / 60);
        this.playPepeImages();
    }


    /**
     * function sets the sound and camera for pepe
     */
    setSoundAndCamera() {
        this.walking_sound.volume = 0.2;
        this.walking_sound.pause();
        this.world.camera_x = -this.x + 100;
    }


    /**
     * function moves pepe right if RIGHT is pressed
     */
    checkRightBtn() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (this.world.sound) {
                this.walking_sound.play();
            }
        }
    }


    /**
     * function moves pepe left if LEFT is pressed
     */
    checkLeftBtn() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (this.world.sound) {
                this.walking_sound.play();
            }
        }
    }


    /**
     * function lets pepe jump, if UP is pressed
     */
    checkJumpBtn() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
    }


    /**
     * function plays diffrent animations, depending on what pepe is doing
     */
    playPepeImages() {
        this.renderPepeIdle();
        this.renderPepeActions();
    }


    /**
     * function renders Pepe while doing nothing
     */
    renderPepeIdle() {
        setInterval(() => {
            if (this.noPlayerInput()) {
                this.waitingTime++
                this.playAnimation(this.IMAGES_SHORT_WAIT);
                if (this.waitingTime > 30) {
                    this.playAnimation(this.IMAGES_LONG_WAIT);
                }
            }
        }, 1000 / 5)
    }


    /**
     * @returns true if there is no input from player
     */
    noPlayerInput() {
        return !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.SPACE && this.noRecentHit;
    }


    /**
     * function renders Pepe whenever he is doing something
     */
    renderPepeActions() {
        this.mainI = setInterval(() => {
            if (this.isDead()) {
                this.renderPepeDead();
            } else if (this.noRecentHit === false) {
                this.renderPepeHit();
            } else if (this.isAboveGround()) {
                this.renderPepeJump();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.renderPepeWalking();
            }
        }, 1000 / 15);
    }


    /**
     * function renders Pepes death
     */
    renderPepeDead() {
        this.waitingTime = 0;
        this.playPepeGrunt();
        this.stopPepeGrunt();
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * function renders Pepe being hit
     */
    renderPepeHit() {
        this.waitingTime = 0;
        this.playPepeGrunt();
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * function renders Pepe jumping
     */
    renderPepeJump() {
        this.waitingTime = 0;
        this.playJumpSound();
        this.playAnimation(this.IMAGES_JUMPING);
    }


    /**
     * function renders Pepe walking
     */
    renderPepeWalking() {
        this.waitingTime = 0;
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * function plays pepes hit sound, if sound is on
     */
    playPepeGrunt() {
        this.pepeGrunt.volume = 0.2;
        if (this.world.sound && this.noRecentHit === false) {
            this.pepeGrunt.play();
        }
    }


    /**
     * function stops pepes grunt on his death
     */
    stopPepeGrunt() {
        setTimeout(() => {
            this.pepeGrunt.pause();
        }, 500);
    }


    /**
     * function plays pepes jump sound, if sound is on and pepe is just jumping
     */
    playJumpSound() {
        this.pepeJumpSound.volume = 0.2;
        if (this.world.sound && this.speedY > 0) {
            this.pepeJumpSound.play();
        }
    }
}