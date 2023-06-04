import Character from "./Character";
import Joystick from "./Joystick"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends Character {

    @property(Joystick)
    joystick: Joystick = null;
    
    @property
    speed: number = 0;

    private isMoving: boolean;

    onLoad() {
        this.isMoving = false;
        
    }

    move(dt){
        let direction = this.joystick.direction; // Lấy vector hướng từ direction của joystick

        // Kiểm tra xem joystick có di chuyển không
        if (direction.x === 0 && direction.y === 0) {
            this.isMoving = false;
            return; // Không di chuyển, thoát khỏi hàm update
        }
        if (!this.isMoving) { // trạng thái không di chuyển trước đó: isMoving = false
            this.isMoving = true; // đánh dấu player đang di chuyển
        }

        // tính góc quay rotationAngle dựa trên vector hướng direction
        let rotationAngle = Math.atan2(direction.y, direction.x) * 180 / Math.PI; // Math.atan2() được sử dụng để tính toán góc giữa hai điểm (direction.y, direction.x), và sau đó chuyển đổi từ radian sang độ bằng cách nhân với 180 và chia cho Math.PI.
        this.node.angle = rotationAngle; // gán giá trị góc quay rotationAngle cho thuộc tính angle của node (Player), để xoay Player theo hướng tương ứng.


        let posX = this.speed* dt * direction.x; // tính toán giá trị di chuyển theo phương x 
        let posY = this.speed* dt * direction.y; // tính toán giá trị di chuyển theo phương y

        if (posX > 0){ // quay Player theo hướng di chuyển.
            this.node.setScale(0.5, 0.5)}
        else{
            this.node.setScale(0.5, -0.5)}

        this.node.x += posX; //  cập nhật giá trị tọa độ x để di chuyển theo phương x.
        this.node.y += posY; //  cập nhật giá trị tọa độ y để di chuyển theo phương y.


        // va chạm khung hình 
        
        let minX = -cc.winSize.width / 2.3; //cc.winSize.width : chiều rộng cửa sổ trò chơi
        let maxX = cc.winSize.width / 2.3;
        let minY = -cc.winSize.height / 2.5; // winSize.height : chiều cao cửa sổ trò  chơi
        let maxY = cc.winSize.height / 3;

        if (this.node.x < minX) { // nếu tọa độ x của player < minx
            this.node.x = minX; // => tọa độ x = minx
        } else if (this.node.x > maxX) { // nếu tọa độ x của player > maxx
            this.node.x = maxX;// => tọa độ x = maxx
        }

        if (this.node.y < minY) { // ...
            this.node.y = minY;
        } else if (this.node.y > maxY) {
            this.node.y = maxY;
        }
 
    }
    update (dt) {
        this.move(dt);
    }
}
