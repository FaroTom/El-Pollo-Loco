class Coin extends AllObjects {
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');

        this.y = 30 + Math.random() * 100;
        this.x = 400 + Math.random() * 2600;
        this.width = 80;
        this.height = 80;
    }
}