const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Animation)
    fish_df: cc.Animation = null;

    private time: number = 0;
    private delay_time: number = 4;

    public Joystick_Vector: cc.Vec2;
    private startJoystickPos: cc.Vec2;
    private isActive: boolean;
    private isLeft: boolean;
    private canMove: boolean;
    onLoad() {
        this.node.zIndex = 0;
        this.isLeft = true;
        this.canMove = false;
        window.OPTION = '';
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

    private on_stick_start(event: cc.Touch) {
        if (this.canMove) {
            this.startJoystickPos = this.node.getPosition();
            console.log(this.startJoystickPos);
            //this.startJoystickPos = this.node.parent.convertToNodeSpaceAR(this.node.getPosition());
            this.isActive = true;
        }

    }

    private on_stick_move(event: cc.Touch) {
        if (this.canMove) {
            let touch_pos = event.getLocation();
            let local_touch_pos = this.node.parent.convertToNodeSpaceAR(touch_pos);
            //this.node.setPosition(local_touch_pos.x, this.startJoystickPos.y);
            this.checkMoveVec(local_touch_pos);
            //this.Joystick_Vector = local_touch_pos;
            // console.log(this.isLeft);
            // console.log(this.node.angle);
        }

    }

    private on_stick_end(event: cc.Touch) {
        if (this.canMove) {
            this.node.setPosition(this.startJoystickPos);
        }

    }

    checkMoveVec(local_touch_pos: cc.Vec2) {
        let moveVec = local_touch_pos.sub(this.startJoystickPos);
        if (Math.abs(moveVec.x) >= Math.abs(moveVec.y)) {
            this.node.angle = 0;
            this.node.setPosition(local_touch_pos.x, this.startJoystickPos.y);

            if (moveVec.x > 0) {
                this.node.setScale(0.7, 0.69);
                this.isLeft = true;
            }
            else {
                this.node.setScale(-0.7, 0.69);
                this.isLeft = false;
            }
        }
        else {
            this.node.setPosition(this.startJoystickPos.x, local_touch_pos.y);
            if (this.isLeft) {
                if (moveVec.y > 0) this.node.angle = 90;
                else this.node.angle = -90;
            }
            else {
                if (moveVec.y > 0) this.node.angle = -90;
                else this.node.angle = 90;
            }
        }
    }

    // Hàm chờ x.1000 giây
    waitAndExecute(callback: () => void) {
        setTimeout(() => {
            callback(); 
        }, 200);
    }


    update(dt) {
        this.time += dt;
        if (this.time >= this.delay_time && this.time < 5) {
            this.fish_df.play();
            this.canMove = true;
        }

        
        if (this.isActive) {
            this.fish_df.pause();
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        window.OPTION = other.node.name;
        console.log(window.OPTION);
        this.canMove = false;
        this.waitAndExecute(()=>this.node.destroy());
    }
}