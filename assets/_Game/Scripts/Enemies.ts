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
        //console.log(`this.player is null?: ${this.player == null}`);

        this.startPosition = this.node.position; // Đặt điểm bắt đầu là vị trí hiện tại Enemy
        this.targetPosition = this.player.node.position; // Đặt điểm đến là vị trí của player
        this.isMoving = true;
    }

    protected onDeath() {
        SimplePool.spawn(PoolType.Meat1, this.node.getWorldPosition().add(cc.v3(-10,0,0)), 0);
        SimplePool.spawn(PoolType.Meat2, this.node.getWorldPosition().add(cc.v3(10,0,0)), 0);
        SimplePool.spawn(PoolType.Bone, this.node.getWorldPosition(), 0);
        SimplePool.despawn(this);
        //this.node.destroy();
        GameManager.Ins.ranSpawnEnemies();
    }

    public onEat(){
        super.onEat();
    }

    protected eatFood(){
        
    }

    protected update(dt: number) {
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

        if (distance <= 150 && this.player.node.active) { // nếu vị trí của enemy <= 150 và active của player = true thì: ...
            console.log("==distance==");
            this.targetPosition = playerPos; // hướng di chuyển enemy là vị trí của player.
            const newDirection = this.player.node.position.sub(this.node.position); // Tạo một vector hướng mới từ vị trí hiện tại đến vị trí của player
            this.startPosition = this.node.position;  // Đặt điểm bắt đầu là vị trí hiện tại của Enemy
            this.targetPosition = this.player.node.position.add(newDirection);  // Đặt điểm đến là vị trí của player + vector hướng mới để đi qua vị trí của player
            // this.isMoving = false;
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
        this.targetPosition = this.randomMovement(); // enemy di chuyển random.
        this.isMoving = true; // Bắt đầu di chuyển tới điểm đến mới
    }

    private randomMovement() {
        const minX = -cc.winSize.width / 2;
        const maxX = cc.winSize.width / 2;
        const minY = -cc.winSize.height / 2;
        const maxY = cc.winSize.height / 3;

        if (this.node.x < minX) { // nếu tọa độ x của Enemy < minx
            this.node.x = minX; // => tọa độ x = minx
        } else if (this.node.x > maxX) { // nếu tọa độ x của Enemy > maxx
            this.node.x = maxX;// => tọa độ x = maxx
        }

        if (this.node.y < minY) { // ...
            this.node.y = minY;
        } else if (this.node.y > maxY) {
            this.node.y = maxY;
        }

        const randX = Math.random() * (maxX - minX) + minX;
        const randY = Math.random() * (maxY - minY) + minY;
        return cc.v3(randX, randY, 0);
    }
}
