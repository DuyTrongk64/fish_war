import Character from "./Character";
import Joystick from "./Joystick"
import PoolMember from "./Pool/PoolMember";
import SimplePool, { PoolType } from "./Pool/SimplePool";
import GameManager from "./Manager/GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends Character {

    @property(Joystick)
    joystick: Joystick = null;
    
    @property
    speed: number = 0;

    @property(cc.Node)
    Blade: cc.Node = null;

    private blade: PoolMember;
    private fish: PoolMember;
    private isMoving: boolean;

    start () {
        this.blade = SimplePool.spawn(PoolType.Blade, this.Blade.getWorldPosition(), 0);
        this.fish = SimplePool.spawn(PoolType.Body, this.node.getWorldPosition(), 0);
    }

    onLoad() {
        this.isMoving = false;
        GameManager.Ins.point = 0;
    }

    public onHit(){
        super.onHit();
    }

    protected onDeath(){
        GameManager.Ins.isDead = true;
        // SimplePool.despawn(this.fish);
        // SimplePool.despawn(this.blade);
        // SimplePool.spawn(PoolType.Meat1, this.node.getWorldPosition().add(cc.v3(-10,0,0)), 0);
        // SimplePool.spawn(PoolType.Meat2, this.node.getWorldPosition().add(cc.v3(10,0,0)), 0);
        // SimplePool.spawn(PoolType.Bone, this.node.getWorldPosition(), 0);
    }

    public onEat(){
        super.onEat();
    }

    protected eatFood(){
        GameManager.Ins.point+=5;
        this.levelUp();
        console.log(`player point: ${GameManager.Ins.point}`);
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
            this.node.setScale(0.3, 0.3)}
        else{
            this.node.setScale(0.3, -0.3)}

        this.node.x += posX; //  cập nhật giá trị tọa độ x để di chuyển theo phương x.
        this.node.y += posY; //  cập nhật giá trị tọa độ y để di chuyển theo phương y.


        // va chạm khung hình 
        
        const minX = -cc.winSize.width / 2.1; 
        const maxX = cc.winSize.width / 2.1;
        const minY = -cc.winSize.height / 2.7;
        const maxY = cc.winSize.height / 3.5;

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

    levelUp(){
        if(GameManager.Ins.point == 50){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade2, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 100){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade3, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 200){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade4, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 300){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade5, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 500){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade6, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 750){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade7, this.Blade.getWorldPosition(), 0);
        }

        if(GameManager.Ins.point == 1500){
            SimplePool.despawn(this.blade);
            this.blade = SimplePool.spawn(PoolType.Blade8, this.Blade.getWorldPosition(), 0);
        }

    }
    update (dt) {
        this.move(dt);  
    }
}
