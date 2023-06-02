import Character from "./Character";
import Joystick from "./Joystick"
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends Character {

    @property(Joystick)
    joystick: Joystick = null;
    
    private isMoving: boolean;
    onLoad() {
        this.isMoving = false;
    }

    move(dt){
        let direction = this.joystick.direction;

        if(direction.x === 0 && direction.y === 0){
            this.isMoving = false;
            return;
        }
        if(!this.isMoving){
            this.isMoving = true;
        }
    }
    update (dt) {
        let pos = this.node.getPosition();
        pos.addSelf( this.joystick.direction.mul( dt * 300 ) ); 
        this.node.setPosition(pos);

    }
}
