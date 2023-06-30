import Character from "./Character";
import GameManager from "./Manager/GameManager";
import Player from "./Player";
import SimplePool, { PoolType } from "./Pool/SimplePool";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemies extends Character {

    @property
    private speed: number = 100; // Tốc độ di chuyển

    @property(Player)
    player: Player = null;

    @property(cc.Vec3)
    public startPosition: cc.Vec3 = cc.v3(0, 0, 0); // Điểm bắt đầu
    private targetPosition: cc.Vec3 = cc.v3(0, 0, 0); // Điểm đến
    @property
    private isMoving: boolean = false;

    public onHit() {
        super.onHit();
    }

    protected onLoad() {
        this.player = GameManager.Ins.player;
        this.startPosition = this.node.position; // Đặt điểm bắt đầu là vị trí hiện tại Enemy
        this.targetPosition = this.player.node.position;
        this.isMoving = true;
    }

    protected onDeath() {
        SimplePool.spawn(PoolType.Meat1, this.node.getWorldPosition().add(cc.v3(-10, 0, 0)), 0);
        SimplePool.spawn(PoolType.Meat2, this.node.getWorldPosition().add(cc.v3(10, 0, 0)), 0);
        SimplePool.spawn(PoolType.Bone, this.node.getWorldPosition(), 0);
        SimplePool.despawn(this);
        GameManager.Ins.coutEnemies--;
        GameManager.Ins.ranSpawnEnemies();
        //console.log(`speed: ${this.speed}`);

    }

    public onEat() {
        super.onEat();
    }

    protected eatFood() {

    }

    updateSpeed() {
        if (GameManager.Ins.point == 100) this.speed = 150;
        if (GameManager.Ins.point == 300) this.speed = 200;
        if (GameManager.Ins.point == 750) this.speed = 300;
    }

    update(dt) {
        this.updateSpeed();
        if(!GameManager.Ins.isDead) this.randomMove(dt);
    }

    getRandomInt(min: number, max: number): number {
        // Tính toán khoảng giá trị
        const range = max - min + 1;
    
        // Tạo số ngẫu nhiên trong khoảng và làm tròn
        const random = Math.floor(Math.random() * range) + min;
    
        return random;
      }

    ranPos():cc.Vec3{
        let x = this.getRandomInt(0, 2000);
        let y = this.getRandomInt(0, 1300);
        return new cc.Vec3(x,y,0);
    }

    randomMove(dt) {
        const direction = this.targetPosition.sub(this.node.position); // Tính toán vector hướng từ vị trí hiện tại đến điểm đến
        const normalizedDirection = direction.normalize();// Chuẩn hóa vector hướng
        const movement = normalizedDirection.mul(this.speed * dt); // Tính toán khoảng di chuyển dựa trên tốc độ và thời gian delta 
        const playerPos = this.player.node.position;
        const startPos = this.node.position;
        const distance = playerPos.sub(startPos).mag();

        if (this.isMoving) {
            if (direction.mag() <= movement.mag() || direction == playerPos) {  // Kiểm tra xem Enemy đã đến gần điểm đến hoặc vị trí đến bằng vị trí player
                this.node.position = this.targetPosition; // Đặt vị trí của Enemy là điểm đến để không bị vượt qua điểm đến
                this.isMoving = false; // Dừng di chuyển
                this.onNextPos(); // Gọi hàm khi đến điểm đến để thêm 1 đoạn di chuyển qua player 
            } else {
                this.node.position = this.node.position.add(movement);  // Cập nhật vị trí của Enem
            }
        }

        const rotationAngle = Math.atan2(direction.y, direction.x) * 180 / Math.PI;  // Xoay Enemy theo hướng di chuyển
        this.node.angle = rotationAngle;

        // Set scale của Enemy theo hướng di chuyển
        const posX = direction.x;
        if (posX > 0) { // quay Player theo hướng di chuyển.
            this.node.setScale(0.3, 0.3)
        }
        else {
            this.node.setScale(0.3, -0.3)
        }
    }


    private onNextPos() {
        this.targetPosition = this.ranPos(); // enemy di chuyển random.
        this.isMoving = true; // Bắt đầu di chuyển tới điểm đến mới
    }

   
}
