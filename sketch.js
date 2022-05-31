var w = window.innerWidth;
var h = window.innerHeight;

let bullets = []
let enemies = []
let enemies2 = []
let stars = []
let score = 0

function setup() {
  // background(255,204,0);
  song = loadSound('assets/gun1.mp3')
  song1 = loadSound('assets/heat-vision.mp3')
  gameover = loadSound('assets/gameover.mp3')
  var canv = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canv.position(x,y); // position of canvas in center

  //spawing enemies
  for(let i=0;i<7;i++)
  {
    let enemy = {
      x: random(0,450),
      y: random(-800, 0)
    }
    enemies.push(enemy)
  }

  for(let i=0;i<7;i++)
  {
    let enemy2 = {
      x: random(0,width),
      y: random(-500, 0)
    }
    enemies2.push(enemy2)
  }

  //spawing stars 
  for(let i=0;i<15;i++)
  {
    let star = {
      x: random(0,width),
      y: random(-500, 0)
    }
    stars.push(star)
  }
}

//game image import 
function preload() 
{
  img = loadImage('assets/rocket.jpg');
  enemypic = loadImage('assets/enemy.jpg');
  enemypic2 = loadImage('assets/enemy2.jpg');
  player2 =loadImage('assets/rocket2.jpg');
}

//to resize game canvas
function windowResized()
{
  resizeCanvas(windowWidth,windowHeight);
}

function draw() {
  background(0,0,0);
  // rectMode(CENTER)
  imageMode(CENTER)
  //draw player
  fill(255,0,0)
  //changing player image
  if(score<40)
  {
    let player = image(img,mouseX,height - 50,40,60);
  }
  else
  {
    player = image(player2,mouseX,height - 50,40,70);
  }
  // let player = circle(mouseX,height - 50,25); 
  noFill()
  
  //draw bullets
  for(let bullet of bullets)
  {
    bullet.y -= 11;
    fill(0,255,255)
    if(score < 40)
    {
      ellipse(bullet.x,bullet.y,3,30);
    }
    else
    {
      fill(255,0,0)
      ellipse(bullet.x,bullet.y,3,30);
    }
    
  }
  noFill()

  //draw stars
  fill(255,255,255)
  for(let star of stars)
  {
    star.y += 1;
    fill(150)
    circle(star.x,star.y,5,50);
  }

  //draw enemies
  for(let enemy of enemies)
  {
    fill(182,120,0)
    enemy.y += 0.5;   
    if(score < 50 )
    {
      image(enemypic,enemy.x,enemy.y,60,60);  
    }
    else
    {
      image(enemypic2,enemy.x,enemy.y,75,75);
    }
    
    // rect(enemy.x,enemy.y, 10)

    if(enemy.y>height)
    {
      fill(255,255,255)
      gameover.play();
      textSize(20);
      textAlign(CENTER)
      text("GAME OVER",width/2,height/2);
      noLoop()
    }
  }

//filter code for enemy 2

  // for(let enemy2 of enemies2)
  // {
  //   fill(182,120,0)
  //   enemy2.x += 0.5;   
  //   image(img,enemy2.x,enemy2.y,60,60);
  //   // rect(enemy.x,enemy.y, 10)

  //   if(enemy2.y>height)
  //   {
  //     fill(255,255,255)
  //     text("--YOU LOOSE--",width/2,height/2)
  //     noLoop()
  //   }
  // }

  // if(player == enemy.x)
  // {
  //   text("LOOOOOOOSE")
  // }

  //killing enemies and bullet disappear
  for(let enemy of enemies)
  {
    for(let bullet of bullets)
    {
      if(dist(enemy.x,enemy.y,bullet.x,bullet.y)<10)
      {
        enemies.splice(enemies.indexOf(enemy), 1)
        bullets.splice(bullets.indexOf(bullet), 1)
        song1.play();

        let newenemy = {
          x: random(0,width),
          y: random(-800, 0)
        }
        enemies.push(newenemy)
        stars.push(newenemy)
        score++
      }
    }
  }

  text(score,25,25)
}



//spawn bullets when user clicks
function mousePressed()
{
  let bullet = {
    x: mouseX , 
    y: height - 50
  }
  bullets.push(bullet)

  song.play();
}
