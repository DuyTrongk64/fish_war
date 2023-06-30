import Utilities from "./Utilities";
import GameManager from "./Manager/GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class joystick extends cc.Component {

    @property(cc.Node)
    stick: cc.Node = null;

    @property(cc.Node)
    speedUp: cc.Node = null;

    @property
    max_r: number = 0;
    
    public direction: cc.Vec2 = cc.v2(0 , 0);

    private joystickStartPosition: cc.Vec2;

    public joystickAngle: number;

    private isActive: boolean;
  
    

    onLoad() {
        // Ẩn joystick 
        this.node.active = false;
        this.isActive = false;
        
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.on_stick_start, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.on_stick_end, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.on_stick_end, this);
    }
    
    private on_stick_start(event: cc.Touch) {
        GameManager.Ins.player.onStart();
        // Hiển thị joystick tại vị trí click
        
        const start = event.getLocation(); 
        const camera = cc.Camera.main; // Thay thế bằng camera chính 
        const posCamera = camera.getScreenToWorldPoint(start); //chuyển đổi tọa độ chạm chuột từ không gian màn hình sang không gian camera trước khi sử dụng
        const posStart = this.node.parent.convertToNodeSpaceAR(posCamera); // chuyển đổi vị trí chạm trên màn hình camera sang tọa độ nút cha của joystick
        this.node.setPosition(posStart); 
        this.stick.setPosition(cc.v2(0, 0));
        this.direction = cc.v2(0, 0); 
        this.isActive = true; 
        this.node.active = true; 
    }
    
    
    private on_stick_move(event: cc.Touch) {
      
        const move = event.getLocation();
        const camera = cc.Camera.main;
        const posCamera_move = camera.getScreenToWorldPoint(move);
        const pos = this.node.convertToNodeSpaceAR(posCamera_move);

        // if (!this.isActive) {
        //     this.isActive = true;
            
        //     this.joystickStartPosition = Utilities.vec3ToVec2(pos);
        // }

        // // xoay
        // let joystickDelta = pos.subtract(Utilities.vec2ToVec3(this.joystickStartPosition));
        // this.joystickAngle = joystickDelta.signAngle(new cc.Vec2(1, 0));

        //di chuyen
        const len = pos.mag(); // tính độ dài của pos rồi lưu vào len
        if(len <= 0){         
            this.stick.setPosition(pos);
            return
        }
        this.direction.x = pos.x / len; 
        this.direction.y = pos.y / len; 

        if(len > this.max_r){     
            pos.x = pos.x * this.max_r / len; 
            pos.y = pos.y * this.max_r / len; 
        }
        this.stick.setPosition(pos);
       
    }

    private on_stick_end(event: cc.Touch) {
 
        this.stick.setPosition(cc.v2(0, 0));
        this.direction = cc.v2(0, 0); 
        this.isActive = false; 
        this.node.active = false;
    }
    update(dt){
        if(GameManager.Ins.isDead){
            this.node.active = false;
            this.speedUp.active = false;
        }
    }
}