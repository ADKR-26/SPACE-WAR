var w = window.innerWidth;
var h = window.innerHeight;

let bullets = []
let enemies = []
let stars = []
let score = 0

function setup() {
  // background(255,204,0);
  var canv = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canv.position(x,y); // position of canvas in center

  //spawing enemies
  for(let i=0;i<7;i++)
  {
    let enemy = {
      x: random(0,width),
      y: random(-800, 0)
    }
    enemies.push(enemy)
  }

  //spawing stars 
  for(let i=0;i<15;i++)
  {
    let star = {
      x: random(0,width),
      y: random(-800, 0)
    }
    stars.push(star)
  }
}

//player image import 
function preload() 
{
  img = loadImage('assets/rocket.jpg');
  enemypic = loadImage('assets/enemy.jpg');
}

//to resiize game canvas
function windowResized()
{
  resizeCanvas(windowWidth,windowHeight);
}

function draw() {
  background(0,0,0);
  rectMode(CENTER)
  imageMode(CENTER)
  //draw player
  fill(255,0,0)
  let player = image(img,mouseX,height - 50,40,40);
  // let player = circle(mouseX,height - 50,25); 
  noFill()
  
  //draw bullets
  for(let bullet of bullets)
  {
    bullet.y -= 11;
    fill(0,255,255)
    ellipse(bullet.x,bullet.y,3,30);
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
    image(enemypic,enemy.x,enemy.y,60,60);
    // rect(enemy.x,enemy.y, 10)

    if(enemy.y>height)
    {
      fill(255,255,255)
      text("--YOU LOOSE--",width/2,height/2)
      noLoop()
    }
  }

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
}
