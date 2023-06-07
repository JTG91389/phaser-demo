import { Scene } from 'phaser';

export class ShaderDemo extends Scene
{
    private video: Phaser.GameObjects.Video;

	constructor()
	{
		super('shader-demo');
	}

	preload()
	{
		this.load.video('test-shader', ['../../assets/webm/test-shader.webm'], true);
	}

	create()
	{
		this.video = this.add.video(0, 0, 'test-shader');
        this.video.play();
	}
}