const gameWidth = gameDom.clientWidth;
class Pipe extends Rectangle{
    constructor(height,top,speed,dom){
        super(52,height,gameWidth,top,speed,0,dom)
    }

    onMove (){
        if(this.left < -this.width){
            this.dom.remove();
        }
    }

}
function getRandom(min,max){
     return Math.floor(Math.random() * (max - min) + min);
}
class PipePare{
    constructor (speed){
        this.spaceHeight = 150;//空隙位置的高度
        this.minHeight = 80;

        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        const upHeight = getRandom(this.minHeight,this.maxHeight);    
        const upDom = document.createElement("div");
        upDom.className = "pipe up"; 
        this.upPipe = new Pipe(upHeight,0,speed,upDom); //上水管

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement("div");
        downDom.className = "pipe down"
        this.downPipe = new Pipe(downHeight,downTop,speed,downDom) //下水管

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }
    // 该柱子对是否已经移出了视野
    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }
    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    
    }
}
//用于不断产生柱子对
class PipePareProducer{
    constructor(speed){
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }
    startProducer(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            //用不到的柱子移除掉
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if(pair.useLess){
                    // 没用的柱子对
                    this.pairs.splice(i,1);
                    i--;
                }
                
            }
        },this.tick)
    }
    stopProducer(){
        clearInterval(this.timer);
        this.timer = null;
    }

}
//  var parducer = new PipePareProducer(-100);
//  parducer.startProducer();
// setInterval(() => {
//     parducer.pairs.forEach(pair => {
//         pair.move(16 / 1000);
//     })
   
// },16)