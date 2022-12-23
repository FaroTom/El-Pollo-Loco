class StatusBars extends AllObjects {
    updateStatusBar(imgArray, arrayPosition) {
        let path = imgArray[arrayPosition];
        this.img = this.imageCache[path];
    }
} 