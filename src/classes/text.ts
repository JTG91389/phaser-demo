import { GameObjects, Scene } from 'phaser';
export class Text extends GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, text: string, textStyle: Phaser.Types.GameObjects.Text.TextStyle = null) {
        const _textStyle: Phaser.Types.GameObjects.Text.TextStyle = textStyle ? textStyle : {
            fontSize: 'calc(100vw / 25)',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        };
        super(scene, x, y, text, _textStyle);
        this.setOrigin(0, 0);
        scene.add.existing(this);
    }
}