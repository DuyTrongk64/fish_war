import Character from "../Character";
import Enemies from "../Enemies";
import Player from "../Player";
import Test_player from "../Test_player";
import SimplePool, { PoolType } from "../Pool/SimplePool";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

  // singleton
  private static ins: GameManager;

  public static get Ins(): GameManager {
    return GameManager.ins;
  }

  protected onLoad(): void {
    GameManager.ins = this;
  }

  @property(Player)
  player: Player = null;

  public coutEnemies: number = 0;

  public isDead: boolean = false;

  public point: number = 0;

  private time: number = 0;

  private list: Character[] = [];

  getRandomInt(min: number, max: number): number {
    // Tính toán khoảng giá trị
    const range = max - min + 1;

    // Tạo số ngẫu nhiên trong khoảng và làm tròn
    const random = Math.floor(Math.random() * range) + min;

    return random;
  }

  public startSpawnEnemies() {
    var posArray: Array<cc.Vec3> = [];

    posArray[0] = new cc.Vec3(255, 1100, 0);
    posArray[1] = new cc.Vec3(1250, 1200, 0);
    posArray[2] = new cc.Vec3(1600, 500, 0);
    posArray[3] = new cc.Vec3(750, 200, 0);
    posArray[4] = new cc.Vec3(250, 500, 0);

    SimplePool.spawnT<Enemies>(PoolType.Enemy, posArray[0], 0);
    SimplePool.spawnT<Enemies>(PoolType.Enemy2, posArray[1], 0);
    SimplePool.spawnT<Enemies>(PoolType.Enemy4, posArray[2], 0);
    SimplePool.spawnT<Enemies>(PoolType.Enemy5, posArray[3], 0);
    SimplePool.spawnT<Enemies>(PoolType.Enemy, posArray[4], 0);
    this.coutEnemies = 5;
  }


  public ranSpawnEnemies() {
    let plWorldPos = this.player.node.getWorldPosition();

    let ranPosX: number;
    do {
      ranPosX = this.getRandomInt(0, 2000);
    } while (plWorldPos.x - 200 <= ranPosX && ranPosX <= plWorldPos.x + 200);

    let ranPosY: number;
    do {
      ranPosY = this.getRandomInt(0, 1300);
    } while (plWorldPos.y - 200 <= ranPosY && ranPosY <= plWorldPos.y + 200);

    let ranPos = new cc.Vec3(ranPosX, ranPosY, 0)

    let ranEnemyType;

    if (this.point > 500 || this.point < 750) {
      do {
        ranEnemyType = this.getRandomInt(21, 25);
      } while (ranEnemyType == 23);
    }

    if (this.point > 750) {
      ranEnemyType = this.getRandomInt(21, 26);
    }

    let enemy = SimplePool.spawnT<Enemies>(ranEnemyType, ranPos, 0);
    this.coutEnemies++;
    // console.log(`coutEnemies: ${this.coutEnemies}`);
    // console.log(`world pos: ${enemy.node.getWorldPosition()}`);

    if (this.coutEnemies < 7) this.ranSpawnEnemies();
  }

  // Hàm chờ 
  waitAndExecute(callback: () => void, time: number) {
    setTimeout(() => {
      callback();
    }, time);
  }

  start() {
    this.player.onAwake();
    if(this.player.isStart){
      this.startSpawnEnemies();
    }
    else this.waitAndExecute(() => this.startSpawnEnemies(), 5500);

  }

  update(dt) {
      this.time+=dt;
      if(this.time>=5.5){
        this.player.onStart();
      }
  }
}
