import PoolControl from "../Pool/PoolControl";
import PoolMember from "../Pool/PoolMember";
import SimplePool from "../Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bone extends PoolMember {

    @property
    upSpeed: number = 500;

    @property
    timer: number = 0;

    update(dt) {
        this.timer += dt;
        if (this.timer <= 1) {
            let direction = new cc.Vec3(0, 1, 0);
            let newPosition = this.node.position.add(direction.multiplyScalar(this.upSpeed * dt));
            this.node.setPosition(newPosition);
        }
        else SimplePool.despawn(this);

    }
}
