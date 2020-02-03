class Game{
    constructor(){
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        // 柱子对生成器
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16;//移动时间间隔毫秒
        this.gameOver = false;
    }
    start(){
        if(this.timer){
            return;
        }
        if(this.gameOver){
            window.location.reload();

        }
        this.pipeProducer.startProducer();//开始生成柱子
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair=>{
                pair.move(duration)
            })
            if(this.isGameOver()){
                this.stop();
                this.gameOver = true;
               
            }

        },this.tick)

    }
    //判断两个矩形是否碰撞
    isHit(rec1,rec2){
        //横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        //纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2){
           return true;
        }
        return false;
    }
    isGameOver(){
        if(this.bird.top === this.bird.maxY){
            return true;
            // 鸟颇能到达地了
        }
         //看柱子对是否与bird碰撞
        for (let i = 0; i <  this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            if(this.isHit(this.bird,pair.upPipe) || this.isHit(this.bird,pair.downPipe)){
                return true;
            }
            // pair.upPipe
            // pair.downPipe
            
        }
        return false;
        // this.pipeProducer.pairs.forEach(pair =>{
           
        // })

    }
    stop(){
      clearInterval(this.timer);
      this.timer = null;
      this.bird.stopSwing();
      this.pipeProducer.stopProducer();
    }
    //关联键盘事件
    regEvent (){
        window.onkeydown = (e) =>{
            if(e.key === "Enter"){
                if(this.timer){
                  this.stop();
                } else{
                    this.start();
                }
            } else if(e.key === " "){
                this.bird.jump();

            }

        }
    }
}
var g = new Game();
g.regEvent();