const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ridged: cc.Node = null;

    jsVector: cc.Vec2;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.Joystick_Touch_Start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.Joystick_Touch_Move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.Joystick_Touch_End, this);
    }

    Joystick_Touch_Start(event){
        let touch_pos = event.getLocation();
        let local_touch_pos = this.node.convertToNodeSpaceAR(touch_pos);
        
    }

    Joystick_Touch_Move(event){

    }

    Joystick_Touch_End(event){

    }


    start () {

    }

    // update (dt) {}
}
