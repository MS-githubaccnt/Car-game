const canv=document.getElementById("gameCanvas");
const canv2=document.getElementById("canv2")
const cntxt=canv.getContext("2d");
const cntxt2=canv2.getContext("2d");
let obstacle1=document.getElementById("obstacle1")
let car=document.getElementById("car")
//var width=getProperty(canv,"width");
//var length=getProperty(canv,"height");
let aVari=0.0;
let gameRunning=true
//BUILDINGS BELOW

cntxt.fillStyle="rgb(135 206 235)";
cntxt.fillRect(0,0,canv.width,canv.height/2);
cntxt.fillStyle="rgb(105 105 105)"
cntxt.fillRect(canv.width*17/60,canv.height/6,canv.width/10,canv.height/3);
cntxt.fillStyle="rgb(165 165 165)"
cntxt.fillRect(canv.width*28/60,canv.height/4,canv.width/12,canv.height*2.5/10);
cntxt.fillStyle="rgb(175 175 175)";
cntxt.fillRect(canv.width*33/60,canv.height/4.5,canv.width/12,canv.height*5/18);
cntxt.fillStyle="rgb(125 125 125)";
cntxt.fillRect(canv.width*38/60,canv.height/5,canv.width/12,canv.height*3/10);
cntxt.fillStyle="rgb(175 175 175)";
cntxt.fillRect(canv.width*23/60,canv.height*1/13,canv.width/11,canv.height*11/26);
cntxt.fillStyle="rgb(255,255,224)";
cntxt.beginPath();
cntxt.lineWidth=0;
//sun below
cntxt.arc(canv.width/12,canv.width/12,canv.width/20,0,2*Math.PI);
cntxt.fillStyle="rgb(255 255 0)";
cntxt.fill();
cntxt.strokeStyle = '#ffff00';
cntxt.stroke();
//diagonal road 1
cntxt.fillStyle="rgb(145 145 145)"
cntxt.strokeStyle = '#919191';

cntxt.lineWidth=0;
cntxt.beginPath();
cntxt.moveTo(canv.width/3,canv.height/2);

cntxt.lineTo(canv.width/8,canv.height);
cntxt.lineTo(canv.width/3-canv.width/20,canv.height/2);
cntxt.moveTo(canv.width/3-canv.width/20,canv.height/2);
cntxt.moveTo(canv.width/8-canv.width/20,canv.height);
cntxt.lineTo(canv.width/3-canv.width/20,canv.height/2);
cntxt.fill();
cntxt.lineTo(canv.width/8,canv.height);
cntxt.fill();
cntxt.stroke()
cntxt.closePath();
cntxt.fill();
//diagonal road 2

cntxt.beginPath();
cntxt.moveTo(canv.width*2/3,canv.height/2);
cntxt.lineTo(canv.width*43/60,canv.height/2);
cntxt.lineTo(canv.width*21/24,canv.height);
cntxt.moveTo(canv.width*21/24+canv.width/20,canv.height);
cntxt.lineTo(canv.width*43/60,canv.height/2);
cntxt.lineTo(canv.width*21/24,canv.height);
cntxt.stroke();
cntxt.fill();

//background of road
cntxt.fillStyle="rgb(85 85 85)"
cntxt.beginPath();

cntxt.moveTo(canv.width/3,canv.height/2);
cntxt.lineTo(canv.width*2/3,canv.height/2);
cntxt.lineTo(canv.width/8,canv.height);
cntxt.moveTo(canv.width*21/24,canv.height);
cntxt.lineTo(canv.width*2/3,canv.height/2)
cntxt.lineTo(canv.width/8,canv.height)
cntxt.stroke();
cntxt.fill();
cntxt.closePath();


function getProperty(element,property){
    
    return parseInt(window.getComputedStyle(element,null).getPropertyValue(property));
    
}
//console.log(length);
//console.log(width);
//changed to cntxt2 here so that can use clear rect for animation without affecting the rest of the background
function makeQuad(x1,y1,x2,y2,w,color){
    cntxt2.fillStyle=color;
    cntxt2.beginPath();
    cntxt2.moveTo(x1,y1);
    cntxt2.lineTo(x1+w,y1);
    cntxt2.lineTo(x2,y2);
    cntxt2.moveTo(x2+w,y2);
    cntxt2.lineTo(x2,y2);
    cntxt2.lineTo(x1+w,y1);
    cntxt2.closePath();
    cntxt2.fill();
}
function quadWithSlope(m,x1,y1,y2,w,color){
    console.log(canv.height)
    makeQuad(x1,y1,x1+(y2-y1)/m,y2,w,color);

}
//the array is used to ensure that the original positions of any animations using animate lane is remembered and can be used to return to original position
const arr=[]
let a=0

function animateLanes(m,x1,y1,y2,w,color,speed,the_no){
    //aVari+=0.5;
//i+=speed;
//let i=0



if (arr.length==(the_no-1)*3){
    arr.push(x1);
    arr.push(y1);
    arr.push(y2);

}

   if (y1<=canv2.height){
    x1+=Math.abs(m)*speed/m;
    y1+=Math.abs(m)*speed;
    y2+=1.4*Math.abs(m)*speed;
    a+=1
    if (the_no==1){
    cntxt2.clearRect(0,canv2.height/2,canv2.width,canv2.height/2);}
}
   else{
        //console.log("bl")
        //console.log(ogx)
        //console.log("canvas height is",canv.height);
        //console.log("x1 old is ",x1)
       //console.log("y1 old is",y1)
       //console.log("y2 old is",y2)
        x1=arr[(the_no-1)*3];
        y1=arr[(the_no-1)*3+1];
        y2=arr[(the_no-1)*3+2];
       //console.log("x1 new is ",arr[2])
       //console.log("y1 is",y1)
       //console.log("y2 is",y2)
    }
    quadWithSlope(m,x1,y1,y2,w,color);
    requestAnimationFrame(()=>animateLanes(m,x1,y1,y2,w,color,speed,the_no));
}
//even if change the order still right one working better ??
//animateLanes(-1.5,canv2.width/2.5,canv2.height/2,canv2.height/1.5,canv2.width/24,"white",1,1);
//NOT SURE WHY BUT THE ORDER MATTERS HERE, PUTTING CONDTION ON CLEAR RECT AND ORDERING THE FUNCTION CALLS SOLVED THE FLICKER ISSUE
setTimeout(animateLanes(1.75,canv2.width*11/20-canv2.width/24,canv2.height/2,canv2.height/1.5,canv2.width/24,"white",1,1),0)
setTimeout(animateLanes(-1.75,canv2.width*9/20,canv2.height/2,canv2.height/1.5,canv2.width/24,"white",1,2),0)
let startOfGamePlay=Date.now();

function recursiveForCloud(startOfCloud){
//let startOfCloud=Date.now();
let timer = setInterval(function(){
    //let startOfCloud=Date.now();
    let timePassed=Date.now() - startOfCloud;
    if (timePassed>=5000){
        clearInterval(timer);

       recursiveForCloud(Date.now());

        return;
    }
    draw(timePassed);
},5);}
recursiveForCloud(Date.now());//20seconds for animation
function draw(timePassed){
    document.getElementById("clouds").style.left=timePassed/100 +"%";
}
let x=0;
let speedOfCar=1;


document.addEventListener("keydown",function(e){
    if (e.key=="ArrowRight"&&car.getBoundingClientRect().left<=canv2.getBoundingClientRect().width){
        //alert("shoudl work")


        x+=speedOfCar;
        car.style.left=x+"%"
        
    }
    if (e.key=="ArrowLeft"&&car.style.left>=10+"%"){
        console.log(car.getBoundingClientRect())
        x-=speedOfCar;
        car.style.left=x+"%"
        
    }
})
let timeBeforeNextObstacle=Math.floor(Math.random()*11)

//this will be repeated every 4 seconds and give a time interval b/w 0 to 4 secnds so an obstacle should appear from 4 to 8 seconds apart
//have to ensure puddle goes away in less than four seconds

let puddleSpeed=2.5
//let ogObstaclebottom=0
let slopeOfmotion=1
let xOfObstacle=0;
let obstacleOnScreen=false;
let noOfframe=0;
let timeOfspawn=0;
let PositiveOrNegative=(Math.floor(Math.random()*2)==1)?1:-1
let ramdomnessOfMotion=Math.random()*1.25*PositiveOrNegative
setInterval(function(){
    let timeTIllNow=Date.now()-startOfGamePlay;
    let interval=timeTIllNow%8
    timeAfterwhichSendObstacle=Math.abs(Math.random()*4-interval)*1000
    setTimeout(sendObstacle,timeAfterwhichSendObstacle)

    function sendObstacle(){
        if(obstacleOnScreen==false){
        let puddleLocation=Math.random()*canv2.width*2/3+10
        obstacle1.style.left=puddleLocation+"px"
        //ogObstaclebottom=obstacle1.getBoundingClientRect().y;
        timeOfspawn=Date.now()
        obstacle1.style.display="block"
        obstacleOnScreen=true
        //const ogObstaclebottom=obstacle1.getBoundingClientRect().y
        
    }

            let timer2=setInterval(function(){
               // let newleft=parseFloat(obstacle1.style.left)+(puddleSpeed*(Date.now()-timeOfspawn)*ramdomnessOfMotion/6000)
            //obstacle1.style.left=newleft+"px";
        

            let bottom = obstacle1.getBoundingClientRect().bottom;
            obstacle1.style.top=puddleSpeed*slopeOfmotion*(Date.now()-timeOfspawn)/100+"px";
            checkCollision();
            //2* since should move to roughly teixe its og heigt
            console.log(obstacle1.getBoundingClientRect())
            if(obstacle1.getBoundingClientRect().bottom>=1.34*canv2.getBoundingClientRect().height){
                //parseFloat(obstacle1.style.top.replace("px",""))>=canv2.height/1.6){
               // consol
               //alert(ogObstaclebottom)
               


                clearInterval(timer2);
                obstacle1.style.display="none"
                obstacleOnScreen=false;
            }

    },10)

    }

//alert(parseFloat(obstacle1.style.top.replace("px","")))


},4000)

function checkCollision(){
    if (obstacleOnScreen&&(canv2.getBoundingClientRect().height<=obstacle1.getBoundingClientRect().top)&&(car.getBoundingClientRect().x-20<=obstacle1.getBoundingClientRect().x&&obstacle1.getBoundingClientRect().x<=car.getBoundingClientRect().x+20)){
        alert ("yoo")
    }
    

}
