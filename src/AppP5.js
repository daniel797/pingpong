
import React from 'react';
import Sketch from 'react-p5'


//import ReactAudioPlayer from 'react-audio-player';

//import Rectangulo from './figuras'

const before = require('aspectjs').before;
//let addAdvice = require("aspectjs").addAdvice;
const around = require('aspectjs').around;
const after = require('aspectjs').after;
//const loadSound2=require('./p5.sound').loadSound;
let advised, adviser//, result;
advised = {
    add: function (increment) {
        //console.log("incremeta en 2 ")   
        this.left += increment;
    },
    id: 'test',
    left: 32,
    top: 43
};
adviser = {
    override: function (increment) {
        //alert("iguala el incremento ") 
        advised.left = increment;
    }
};

before(advised, "add").add(adviser, "override");



export default class AppP5 extends React.Component {

    constructor(props) {
        super(props)
        var x = 350 / 2;
        var y = 480 / 2;
        this.r = 20;
        this.dx = 3;
        this.dy = 3;
        this.audio = {}
        this.dieAudio={}
        this.loseAudio={}
        var me = this
        this.advised2 = {
            me: me,
            colitionY: function () {
                me.dy = - me.dy;
            },
            colitionX1: function (p5) {
                me.x=  2.5 * me.r / 2+5
                me.dx = -me.dx + 0.5;
            },
            colitionX2: function (p5) {
                me.x=  p5.width - me.r / 2 - 2.5 * me.r+2
                me.dx = -me.dx - 0.5;
            }
        }
        this.adviser2 = {
            override:  function () {
                try {
                    if (me.audio){
                        me.audio.pause();
                         me.audio.play();}
                } catch (error) {
                    console.log("No hay audio, probablemente olvido iniciar el" +
                        " servidor o darle click al monitor   ")
                }
            },
            die: function () {
                try {
                    if (me.dieAudio)
                         me.dieAudio.play();
                } catch (error) {
                    console.log("No hay audio, probablemente olvido iniciar el" +
                        " servidor o darle click al monitor   ")
                }
            },
            losePoint: function () {
                try {
                    if (me.loseAudio)
                         me.loseAudio.play();
                } catch (error) {
                    console.log("No hay audio, probablemente olvido iniciar el" +
                        " servidor o darle click al monitor   ")
                }
            },
            
        };
        before(this.advised2, "colitionY").add(this.adviser2, "override")
        before(this.advised2, "colitionX1").add(this.adviser2, "override")
        before(this.advised2, "colitionX2").add(this.adviser2, "override")
        this.state={
            x:x,
            y:y, 
            printer: true
        }
        this.printer=true;
    }

    setup = (p5, canvasParentRef) => {

        this.audio=new Audio('http://localhost:8080/music.mp3');
        this.dieAudio = new Audio('http://localhost:8080/die.mp3');
        this.loseAudio= new Audio('http://localhost:8080/lose.mp3');
        var canvas = p5.createCanvas(500, 500);
        canvas.parent('sketch-holder');
        p5.background(0);

        p5.paddle2 = 10;
        p5.paddle1 = 10;

        p5.paddle1X = 10;
        p5.paddle1Height = 60;
        p5.paddle2Y = 330;
        p5.paddle2Height = 60;

        p5.score1 = 0;
        p5.score2 = 0;
        p5.paddle1Y = 0;

        p5.playerscore = 0;
        p5.pcscore = 0;

        this.advised2.reset = (p5) => {
            p5.pcscore++;
            var x = p5.width/2 + 200;
            var y = p5.height/2 + 200;
            this.setState({x:x,y:y})

            this.dx = 3;
            this.dy = 3;
        }


        this.advised2.loose = (p5) => {

            p5.background(34,40,49);
    
            p5.fill(41, 161, 156);
            p5.stroke(250, 0, 0);
            p5.textSize(20)
            p5.text("Game Over!☹☹", p5.width/2-60, p5.height / 2);
            p5.text("quitar para reiniciar!", p5.width/2-70, p5.height / 2 + 30)
            p5.noLoop();
            p5.pcscore++;
        }
        //p5.frameRate(10);
        before(this.advised2, "reset").add(this.adviser2, "override");
        after(this.advised2, "loose").add(this.adviser2, "die");
        after(this.advised2, "reset").add(this.adviser2, "losePoint")
    }
    draw = p5 => {

        p5.background(34,40,49);
        var i
        var xx2= this.state.x 
        var y= this.state.y
        var printer=this.printer  
        //paddleInCanvas
        if (p5.mouseY + p5.paddle1Height > p5.height) {
            p5.mouseY = p5.height - p5.paddle1Height;
        }
        if (p5.mouseY < 0) {
            p5.mouseY = 0;
        }
        //graph

        p5.noFill();
        p5.stroke(57, 62, 70);// color de linea 
        p5.strokeWeight(0.5);// grueso de linea
        for (i = 0; i < p5.height; i += 20) {
            p5.rect(i, 0, 20, p5.height);
            p5.rect(0, i, p5.width, 20);
        }
        //left paddle
        p5.fill(223, 246, 240);
        p5.stroke(0, 0, 0);
        p5.strokeWeight(0.5);
        p5.paddle1Y = p5.mouseY;
        p5.rect(p5.paddle1X, p5.paddle1Y, p5.paddle1, p5.paddle1Height, 100);

        //pc computer paddle
        p5.fill(77, 128, 228);
        p5.stroke(0, 0, 0);
        var paddle2y = y - p5.paddle2Height / 2;
        p5.rect( p5.height-50/*p5.paddle2Y*/, paddle2y, p5.paddle2, p5.paddle2Height, 100);
        
        if (printer)console.log("x ***4",xx2 )
        //midline
        p5.fill(163,247,191);
        p5.stroke(0);
        p5.strokeWeight(3)
        for (i = 0; i < 480; i += 10) {
            p5.rect(p5.width / 2, 30 + i, 10, 480);
        }

        //function drawScore show scores
        //drawScore

        p5.textSize(20);
        p5.fill(41, 161, 156);
        //p5.stroke(250, 0, 0)
        p5.text("Player:", 10, 50)
        p5.text(p5.playerscore, 140, 50);
        p5.text("Computer:", 255, 50)
        p5.text(p5.pcscore, 450, 50)
        console.log("x ***3",xx2 )

        //models
        p5.textSize(15);
        p5.fill(163,247,191);
        p5.noStroke();
        p5.text("Width:" + p5.width, 135, 15);
        p5.text("Speed:" + Math.abs(this.dx), 50, 15);
        p5.text("Height:" + p5.height, 235, 15)


        //move
        p5.fill(70, 179, 230);
        p5.stroke(0, 0, 0);
        p5.strokeWeight(0.5);
        p5.ellipse(xx2, y, this.r, this.r)
        if (printer)console.log("x ***2",xx2 )
        xx2 = xx2 + this.dx;
        y = y + this.dy;
        //alert("x :::"+ x)
        //colission X2
        if (xx2 + 2.5 * this.r > p5.width - this.r / 2) {
            //this.dx=-this.dx-0.5;       
            this.advised2.colitionX2(p5);
            if (printer)console.log("X2");
        }
        
        //colission X1
        if (printer)console.log("x ***",xx2 )
        if (xx2 -2.5*this.r/2 < 0) {
            if (printer)console.log("x:::",xx2 )
            if (y >= p5.paddle1Y && y <= p5.paddle1Y + p5.paddle1Height) {
                //this.dx = -this.dx + 0.5; 
                this.advised2.colitionX1(p5);
                if (printer)console.log("X1");
            }
            else {
                if (printer)console.log("x",xx2 )
                this.advised2.reset(p5);
            }
        }
        
        if (p5.pcscore === 4) {
            this.advised2.loose(p5)
        }
        if (y + this.r > p5.height || y - this.r < 0) {
            this.advised2.colitionY();
            console.log("y1");
        }
        this.setState({x:xx2,y:y})
    }


    renderSk (){
        if(this.props.value)
            return (<Sketch setup={this.setup} draw={this.draw} reset={this.reset} midline={this.midline}
                drawScore={this.drawScore} move={this.move} models={this.models} paddleInCanvas={this.paddleInCanvas} value = {this.props.value} />)
        else
            return(<div></div>)
    }
    render() {

        return (<div>
            x {this.state.x } y { this.state.y}
            
            <iframe width="0" height="0"
                src="mediaplayer2.html"
                allow="autoplay 'src' http://localhost:8080/music.mp3">
                {this.renderSk()}
            </iframe>
            <iframe width="0" height="0"
                src="mediaplayer2.html"
                allow="autoplay 'src' http://localhost:8080/die.mp3">
                
            </iframe>
            <iframe width="0" height="0"
                src="mediaplayer2.html"
                allow="autoplay 'src' http://localhost:8080/lose.mp3">
                
            </iframe>
        </div>)
    }
}






