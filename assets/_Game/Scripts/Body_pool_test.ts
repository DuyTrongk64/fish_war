import PoolMember from "./Pool/PoolMember";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends PoolMember {

    onLoad(){
        this.node.zIndex = 3;
    }

    
}
