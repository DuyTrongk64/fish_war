const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Animation)
    fish_df: cc.Animation = null;

    private time: number = 0;
    private delay_time: number = 4;

    public Joystick_Vector: cc.Vec2;
    private startJoystickPos: cc.Vec2;
    private isActive: boolean;


    onLoad() {
        this.node.zIndex = 0;
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;

        this.node.on(cc.Node.EventType.TOUCH_START, this.on_stick_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_stick_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_stick_end, this);

        this.isActive = false;
    }

    private on_stick_start(event: cc.Touch){
        this.startJoystickPos = this.node.getPosition();
        //console.log(this.startJoystickPos);
        //this.startJoystickPos = this.node.parent.convertToNodeSpaceAR(this.node.getPosition());
        this.isActive = true;
    }

    private on_stick_move(event: cc.Touch){
        let touch_pos = event.getLocation();
        let local_touch_pos = this.node.parent.convertToNodeSpaceAR(touch_pos);
        this.node.setPosition(local_touch_pos.x,this.startJoystickPos.y);
        //this.Joystick_Vector = local_touch_pos;
    }

    private on_stick_end(event: cc.Touch){
        
    }
    

    update (dt) {
        this.time += dt;
        if (this.time >= this.delay_time && this.time < 5) {
            this.fish_df.play();
        }

        if(this.isActive){
            this.fish_df.pause();
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        console.log(other.name);
    }
}
