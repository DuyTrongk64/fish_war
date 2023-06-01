const {ccclass, property} = cc._decorator;

@ccclass
export default class joystick extends cc.Component {

    @property(cc.Node)
    stick: cc.Node = null; // khai báo biến stick

    @property
    max_r: number = 200; // tạo bán kính tối đa cua joystick
    
    public direction: cc.Vec2 = cc.v2(0 , 0); // tạo hướng vecto di chuyển

    private isVisible: boolean = false; // tạo biến đánh dấu sự kiện
  


    onLoad() {
        // Ẩn joystick 
        this.node.active = false;

        /// tạo event toch tại nút cha (this.node.parent)
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.on_stick_start, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.on_stick_end, this); // TOUCH_END = TOUCH_CANCEL 
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.on_stick_end, this);
    }
    
    private on_stick_start(event: cc.Touch) {  // sự kiện chạm vào joystick

        // Hiển thị joystick tại vị trí click
        
        const start = event.getLocation(); // lấy tọa độ vị trí chạm trên màn hình bằng event và hàm getLocation
        const camera = cc.Camera.main; // Thay thế bằng camera chính 
        const posCamera = camera.getScreenToWorldPoint(start); //chuyển đổi tọa độ chạm chuột từ không gian màn hình sang không gian camera trước khi sử dụng
        const posStart = this.node.parent.convertToNodeSpaceAR(posCamera); // chuyển đổi vị trí chạm trên màn hình camera sang tọa độ nút cha của joystick
        this.node.setPosition(posStart); // hiển thị joystick tại vị trí chạm
        this.stick.setPosition(cc.v2(0, 0)); // dưa stick về vị trí gốc (0,0)
        this.direction = cc.v2(0, 0); // đưa hướng joystick về hướng không di chuyển

    
        this.isVisible = true; // đánh dấu joystick hiển thị
        this.node.active = true; // hiện joystick lên   
    }
    
    
    private on_stick_move(event: cc.Touch) { // sự kiện di chuyển joystick
      
        const move = event.getLocation();
        const camera = cc.Camera.main;
        const posCamera_move = camera.getScreenToWorldPoint(move);
        const pos = this.node.convertToNodeSpaceAR(posCamera_move);



        const len = pos.mag(); // tính độ dài của pos rồi lưu vào len
        if(len <= 0){          // nếu joytick không di chuyển
            this.stick.setPosition(pos); // thì stick được đặt ở vị trí pos
            return
        }
        this.direction.x = pos.x / len; // tạo hướng di chuyển theo trục x
        this.direction.y = pos.y / len; // tạo hướng di chuyển theo trục y

        if(len > this.max_r){     // nếu độ dài của vecto pos lớn hơn bán kính cho phép max_r
            pos.x = pos.x * this.max_r / len; // 
            pos.y = pos.y * this.max_r / len; // thu nhỏ vị trí của joystick theo tỷ lệ để stick không vượt quá bán kính tối đa
        }
        this.stick.setPosition(pos); // đặt giá trị stick theo pos
       
    }

///


    private on_stick_end(event: cc.Touch) { // event khi kết thúc sự kiện click
 
        this.stick.setPosition(cc.v2(0, 0)); // dưa stick về vị trí gốc (0,0)
        this.direction = cc.v2(0, 0); // đưa hướng joystick về hướng không di chuyển
        this.isVisible = false; // đánh dấu joystick ẩn
        this.node.active = false; // ẩn joystick
    }

}