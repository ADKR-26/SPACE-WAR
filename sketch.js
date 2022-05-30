let bullets = []
let enemies = []
let score = 0

function setup() {
  createCanvas(500, 400);

  //spawing enemies
  for(let i=0;i<10;i++)
  {
    let enemy = {
      x: random(0,width),
      y: random(-800, 0)
    }
    enemies.push(enemy)
  }
}

function draw() {
  background(51);
  rectMode(CENTER)
  //draw player
  fill(255,0,0)
  let palyer = circle(mouseX,height - 50,25); 
  noFill()
  
  //draw bullets
  for(let bullet of bullets)
  {
    bullet.y -= 11;
    fill(150)
    ellipse(bullet.x,bullet.y,5,50);
  }
  noFill()

  //draw enemies
  for(let enemy of enemies)
  {
    fill(182,120,0)
    enemy.y += 1;
    rect(enemy.x,enemy.y, 10)

    if(enemy.y>height)
    {
      fill(255,255,255)
      text("YOU LOOSE",width/2,height/2)
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
    x: mouseX, 
    y: height - 50
  }
  bullets.push(bullet)
}