class HealthBar extends StatusBars {
    IMAGES_HEALTH_PEPE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png' , 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' 
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_PEPE);

        this.x = 20;
        this.y = 0;
        this.height = 60;
        this.width = 200;

        this.updateStatusBar(this.IMAGES_HEALTH_PEPE, 5);

    } 
}