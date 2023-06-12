import Character from "../Character";
import Enemies from "../Enemies";
import Player from "../Player";
import SimplePool, { PoolType } from "../Pool/SimplePool";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(Player)
    player: Player = null;

    //@property(cc.Node)

    private list:Character[] = [];

    getRandomInt(min: number, max: number): number {
        // Tính toán khoảng giá trị
        const range = max - min + 1;

        // Tạo số ngẫu nhiên trong khoảng và làm tròn
        const random = Math.floor(Math.random() * range) + min;
  
        return random;
      }
      
    public ranSpawnEnemies(){
        for(let i=0; i<5;i++){
            let plWorldPos = this.player.node.getWorldPosition();
            let ranPos = new cc.Vec3(this.getRandomInt(plWorldPos.x+50,plWorldPos.x+100),this.getRandomInt(plWorldPos.y+50,plWorldPos.x+100),0)
            SimplePool.spawnT<Enemies>(PoolType.Enemy_1,ranPos,0);

        }
    }

    start(){
      this.ranSpawnEnemies();
    }
}
