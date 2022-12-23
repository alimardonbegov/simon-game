export default class Sounds {
    static playButtonSound(name) {
        new Audio("sounds/" + name + ".mp3").play();
    }
    static playWrongSound() {
        new Audio("sounds/wrong.mp3").play();
    }
}
