
export default class Rectangulo {
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    rangue(min,a,max){
        return min<a&& a<max
    }
    colitionDot(x,y){
        /*console.log("-------------")
        if(this.rangue(this.x,x,this.width))console.log("entre x ")
        else(console.log([this.x,x,this.width]))
        if((this.rangue(this.y,y,this.height)) )console.log("entre y ")
        else(console.log([this.y,y,this.height]))*/
        var minx = this.x
        var miny = this.y
        var manx = this.width+minx
        var many = this.height+miny
        return (this.rangue(minx,x,manx)   && (this.rangue(miny,y,many))   )
    }

    colition(rect){
        //console.log(rect)
        //console.log("**********")

        return this.colitionDot(rect.x,rect.y) ||
        this.colitionDot(rect.x+rect.width,rect.y)||
        this.colitionDot(rect.x,rect.y+rect.height)||
        this.colitionDot(rect.x+rect.width,rect.y+rect.height)
    }
    PcolitionDot(x,y){
        console.log("-------------")
        var minx = this.x
        var miny = this.y
        var manx = this.width+minx
        var many = this.height+miny
        if(this.rangue(minx,x,manx))console.log("entre x ")
        else(console.log([minx,x,manx]))
        if(this.rangue(miny,y,many) )console.log("entre y ")
        else(console.log([miny,y,many]))
        return (this.rangue(minx,x,manx)   && (this.rangue(miny,y,many))   )
    }
    
    Pcolition(rect){
        //console.log(rect)
        console.log("**********")

        return this.PcolitionDot(rect.x,rect.y) ||
        this.PcolitionDot(rect.x+rect.width,rect.y)||
        this.PcolitionDot(rect.x,rect.y+rect.height)||
        this.PcolitionDot(rect.x+rect.width,rect.y+rect.height)
    }
}

