import Character from "./Character";
import Joystick from "./Joystick"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends Character {

    @property(Joystick)
    joystick: Joystick = null;
    
    onLoad() {
        
    }
    update (dt) {
        let pos = this.node.getPosition();
        pos.addSelf( this.joystick.jsVector.mul( dt * 3 ) ); 
        this.node.setPosition(pos);

    }
}
