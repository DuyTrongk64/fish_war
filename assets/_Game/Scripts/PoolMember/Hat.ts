import PoolControl from "../Pool/PoolControl";
import PoolMember from "../Pool/PoolMember";
import SimplePool from "../Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bone extends PoolMember {
    onLoad(){
        this.node.zIndex = 4;
    }
}