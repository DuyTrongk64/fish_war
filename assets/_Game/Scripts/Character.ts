import PoolControl from "./Pool/PoolControl";
import PoolMember from "./Pool/PoolMember";
import GameManager from "./Manager/GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character extends PoolMember {

    
    //khởi tạo
    public onInit(){
        
    }

    public onHit(){
        this.onDeath(); 
    }

    protected onDeath(){
        
    }

    public onEat(){
        this.eatFood();
    }

    protected eatFood(){

    }
    
}
