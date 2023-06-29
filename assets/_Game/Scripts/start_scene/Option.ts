const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ball: cc.Node = null;

    @property(cc.Animation)
    ball_destroy: cc.Animation = null;

    @property(cc.Animation)
    star: cc.Animation = null;

    @property(cc.Animation)
    option: cc.Animation = null;

    protected onLoad(): void {
        cc.director.preloadScene('play_scene');
    }

    loadScenne(){
        cc.director.loadScene('play_scene');
    }

    // Hàm chờ 
    waitAndExecute(callback: () => void,time: number) {
        setTimeout(() => {
            callback(); 
        }, time);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        this.ball_destroy.play();
        this.waitAndExecute(()=>this.ball.destroy(),150);
        this.option.play();
        this.star.play();
        this.waitAndExecute(()=>this.loadScenne(),1200);
    }
}
