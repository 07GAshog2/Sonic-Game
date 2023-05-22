import Phaser from "phaser"

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1420,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 600},
      debug: false
    }
  }
})

let rings
let rings2
let rings3
let rings4
let rings5
let rings6
let rings7
let rings8
let rings9
let rings10
let rings11
let rings12
let rings13
let rings14
let rings15
let rings16
let rings17
let rings18
let rings19
let rings20
let cursors
let isRunning
let sonic
let momentum = 0
let onGround
let camera1
let crouching = false
let spincharging
let ignoreCap = false
let ringsGroup
let hardstopSound
let ringSound
let spinddashSound
let jumpSound
let bgmusic
let count = 0

function preload() {
  //Anything that is necessary before the game runs, will happen here
  this.load.image("greenhill", "./assets/greenhillzone.jpeg")
  this.load.image("ground", "./assets/ground.png")
  this.load.image("greenhill2", "./assets/greenhillzonepart2.jpeg")
  this.load.spritesheet('idle', './assets/runningspritesheet.png', {frameWidth: 45, frameHeight: 50})
  this.load.spritesheet('bendover', './assets/bendover.png', {frameWidth: 36, frameHeight: 40})
  this.load.spritesheet('bendoverstay', './assets/bendover.png', {frameWidth: 36, frameHeight: 30})
  this.load.spritesheet('spincharge', './assets/spincharge.png', {frameWidth: 38, frameHeight: 29})
  this.load.spritesheet('hardstop', './assets/hardstop.png', {frameWidth: 51, frameHeight: 34})
  this.load.spritesheet('jump', './assets/sonicjumping.png', {frameWidth: 45, frameHeight: 34})
  this.load.spritesheet('run', './assets/runningspritesheet.png', {frameWidth: 53, frameHeight: 58})
  this.load.spritesheet('runv2', './assets/runningv2.png', {frameWidth: 47, frameHeight: 37})
  this.load.spritesheet('rings', './assets/rings.png', {frameWidth: 32, frameHeight: 32})
  this.load.audio("emerald-hill", "./assets/EmeraldHill2.mp3")
  this.load.audio("hardstop-sound", "./assets/hardstop.mp3")
  this.load.audio("spindash-sound", "./assets/spindash[hold].mp3")
  this.load.audio("ring-sound", "./assets/ringsound.mp3")
  this.load.audio("jump-sound", "./assets/jump.mp3")


}

function create() {
  //Anything that is created on load
  bgmusic = this.sound.add("emerald-hill")
  hardstopSound = this.sound.add("hardstop-sound")
  ringSound = this.sound.add("ring-sound")
  spinddashSound = this.sound.add("spindash-sound")
  jumpSound = this.sound.add("jump-sound")


  const greenhill = this.add.image(400, 300, "greenhill")
  greenhill.scaleX = 1.6
  greenhill.scaleY = 2.4

  const greenhill2 = this.add.image(1110, 320, "greenhill2")
  greenhill2.scaleX = 1.25
  greenhill2.scaleY = 1.5
  
  const platform1 = this.physics.add.staticGroup()
  platform1.create(530, 320, "ground").setSize(250, 50)

  

  const platform2 = this.physics.add.staticGroup()
  platform2.create(60, 320, "ground").setSize(120, 50)

  const platform3 = this.physics.add.staticGroup()
  platform3.create(450, 490, "ground").setSize(890, 40)

  const platform4 = this.physics.add.staticGroup()
  platform4.create(850, 600, "ground").setSize(890, 40)

  const platform5 = this.physics.add.staticGroup()
  platform5.create(850, 600, "ground").setSize(100, 200)

  const platform6 = this.physics.add.staticGroup()
  platform6.create(1120, 200, "ground").setSize(360, 25)

  const platform7 = this.physics.add.staticGroup()
  platform7.create(1360, 220, "ground").setSize(100, 50)

  const platform8 = this.physics.add.staticGroup()
  platform8.create(820, 220, "ground").setSize(50, 100)

  const platform9 = this.physics.add.staticGroup()
  platform9.create(900, 214, "ground").setSize(100, 50)

  const platform10 = this.physics.add.staticGroup()
  platform10.create(855, 185, "ground").setSize(1, 1)

  const platform11 = this.physics.add.staticGroup()
  platform11.create(1350, 565, "ground").setSize(10, 10)

  platform9.create(1410, 555, "ground").setSize(100, 40)
  

  
  
  
  rings = this.physics.add.sprite(430, 270)
  rings.name = "rings"
  rings2 = this.physics.add.sprite(470, 270)
  rings3 = this.physics.add.sprite(510, 270)
  rings4 = this.physics.add.sprite(550, 270)
  rings5 = this.physics.add.sprite(590, 270)
  rings6 = this.physics.add.sprite(630, 270)
  rings7 = this.physics.add.sprite(430 + 550, 136)
  rings8 = this.physics.add.sprite(470 + 550, 136)
  rings9 = this.physics.add.sprite(510 + 550, 136)
  rings10 = this.physics.add.sprite(550 + 550, 136)
  rings11 = this.physics.add.sprite(590 + 550, 136)
  rings12 = this.physics.add.sprite(630 + 550, 136)
  rings13 = this.physics.add.sprite(550 + 600, 560)
  rings14 = this.physics.add.sprite(590 + 600, 560)
  rings15 = this.physics.add.sprite(630 + 600, 552)
  rings16 = this.physics.add.sprite(550 + 400, 450)
  rings17 = this.physics.add.sprite(590 + 400, 470)
  rings18 = this.physics.add.sprite(630 + 400, 488)
  rings19 = this.physics.add.sprite(56, 260)
  rings20 = this.physics.add.sprite(1380, 165)


  rings.body.setAllowGravity(false)
  rings2.body.setAllowGravity(false)
  rings3.body.setAllowGravity(false)
  rings4.body.setAllowGravity(false)
  rings5.body.setAllowGravity(false)
  rings6.body.setAllowGravity(false)
  rings7.body.setAllowGravity(false)
  rings8.body.setAllowGravity(false)
  rings9.body.setAllowGravity(false)
  rings10.body.setAllowGravity(false)
  rings11.body.setAllowGravity(false)
  rings12.body.setAllowGravity(false)
  rings13.body.setAllowGravity(false)
  rings14.body.setAllowGravity(false)
  rings15.body.setAllowGravity(false)
  rings16.body.setAllowGravity(false)
  rings17.body.setAllowGravity(false)
  rings18.body.setAllowGravity(false)
  rings19.body.setAllowGravity(false)
  rings20.body.setAllowGravity(false)

  sonic = this.physics.add.sprite(200,200, "idle")
  sonic.name = "sonic"
  sonic.setCollideWorldBounds(true)

  function isOnGround() {
    onGround = true
    // console.log(onGround)
    return onGround
  }

  function moveUp() {
    if (sonic.flipX == true) {
      sonic.setVelocityY(-200)
    }    
  }

  function moveUp2() {
    if (sonic.flipX == false) {
      sonic.setVelocityY(-200)
    }    
  }

  function touchedRings(sonic, ring) {
    count += 1
    ring.destroy()
    ringSound.play()
    console.log(count)
  }

  this.physics.add.collider(rings, platform1)
  this.physics.add.collider(rings, platform2)
  this.physics.add.collider(rings, platform3)

  this.physics.add.collider(sonic, platform1, isOnGround)
  this.physics.add.collider(sonic, platform2, isOnGround)
  this.physics.add.collider(sonic, platform3, isOnGround)
  this.physics.add.collider(sonic, platform4, isOnGround)
  this.physics.add.collider(sonic, platform5)
  this.physics.add.collider(sonic, platform6, isOnGround)
  this.physics.add.collider(sonic, platform7, isOnGround)
  this.physics.add.collider(sonic, platform8, isOnGround)
  this.physics.add.collider(sonic, platform9, isOnGround)
  this.physics.add.collider(sonic, platform10, moveUp)
  this.physics.add.collider(sonic, platform11, moveUp2)
  
  this.physics.add.collider(sonic, rings, touchedRings)
  this.physics.add.collider(sonic, rings2, touchedRings)
  this.physics.add.collider(sonic, rings3, touchedRings)
  this.physics.add.collider(sonic, rings4, touchedRings)
  this.physics.add.collider(sonic, rings5, touchedRings)
  this.physics.add.collider(sonic, rings6, touchedRings)
  this.physics.add.collider(sonic, rings7, touchedRings)
  this.physics.add.collider(sonic, rings8, touchedRings)
  this.physics.add.collider(sonic, rings9, touchedRings)
  this.physics.add.collider(sonic, rings10, touchedRings)
  this.physics.add.collider(sonic, rings11, touchedRings)
  this.physics.add.collider(sonic, rings12, touchedRings)
  this.physics.add.collider(sonic, rings13, touchedRings)
  this.physics.add.collider(sonic, rings14, touchedRings)
  this.physics.add.collider(sonic, rings15, touchedRings)
  this.physics.add.collider(sonic, rings16, touchedRings)
  this.physics.add.collider(sonic, rings17, touchedRings)
  this.physics.add.collider(sonic, rings18, touchedRings)
  this.physics.add.collider(sonic, rings19, touchedRings)
  this.physics.add.collider(sonic, rings20, touchedRings)


  cursors = this.input.keyboard.createCursorKeys()

  this.anims.create({
    key: 'rings',
    frameRate: 15,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('rings', { start: 0, end: 7})
  })

  this.anims.create({
    key: 'jump',
    frameRate: 15,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('jump', { start: 1, end: 8})
  })

  this.anims.create({
    key: 'hardstop',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('hardstop', { start: 0, end: 0})
  })

  this.anims.create({
    key: 'hardstop2',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('hardstop', { start: 1, end: 1})
  })

  this.anims.create({
    key: 'hardstop3',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('hardstop', { start: 2, end: 2})
  })

  this.anims.create({
    key: 'hardstop4',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('hardstop', { start: 2, end: 3})
  })

  this.anims.create({
    key: 'idle',
    frameRate: 4,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 3})
  })

  this.anims.create({
    key: 'bendover',
    frameRate: 15,
    repeat: 0,
    frames: this.anims.generateFrameNumbers('bendover', { start: 0, end: 2})
  })

  this.anims.create({
    key: 'bendoverstay',
    frameRate: 1,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('bendover', { start: 2, end: 2})
  })

  this.anims.create({
    key: 'spincharge',
    frameRate: 15,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('spincharge', { start: 0, end: 7})
  })

  this.anims.create({
    key: 'right',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('run', { start: 29, end: 35})
  })

  this.anims.create({
    key: 'right2',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('runv2', { start: 1, end: 8})
  })

  this.anims.create({
    key: 'left',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('run', { start: 29, end: 35 })
  })

  this.anims.create({
    key: 'left2',
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('runv2', { start: 1, end: 8 })
  })

  rings.anims.play("rings", true)
  rings2.anims.play("rings", true)
  rings3.anims.play("rings", true)
  rings4.anims.play("rings", true)
  rings5.anims.play("rings", true)
  rings6.anims.play("rings", true)
  rings7.anims.play("rings", true)
  rings8.anims.play("rings", true)
  rings9.anims.play("rings", true)
  rings10.anims.play("rings", true)
  rings11.anims.play("rings", true)
  rings12.anims.play("rings", true)
  rings13.anims.play("rings", true)
  rings14.anims.play("rings", true)
  rings15.anims.play("rings", true)
  rings16.anims.play("rings", true)
  rings17.anims.play("rings", true)
  rings18.anims.play("rings", true)
  rings19.anims.play("rings", true)
  rings20.anims.play("rings", true)


  bgmusic.play()


  camera1 = this.cameras.add(0, 0, 1420, 600)
  camera1.setBounds(0, 0, 1420, 600)
  camera1.zoom = 2
  
}

function update() {
 //Game loop, any updates to movement/item
 //update runs every frame of the browser
 if (cursors.up.isDown && cursors.down.isDown) {
  if (count == 20) {
    count = 0

  rings = this.physics.add.sprite(430, 270)
  rings.name = "rings"
  rings2 = this.physics.add.sprite(470, 270)
  rings3 = this.physics.add.sprite(510, 270)
  rings4 = this.physics.add.sprite(550, 270)
  rings5 = this.physics.add.sprite(590, 270)
  rings6 = this.physics.add.sprite(630, 270)
  rings7 = this.physics.add.sprite(430 + 550, 136)
  rings8 = this.physics.add.sprite(470 + 550, 136)
  rings9 = this.physics.add.sprite(510 + 550, 136)
  rings10 = this.physics.add.sprite(550 + 550, 136)
  rings11 = this.physics.add.sprite(590 + 550, 136)
  rings12 = this.physics.add.sprite(630 + 550, 136)
  rings13 = this.physics.add.sprite(550 + 600, 560)
  rings14 = this.physics.add.sprite(590 + 600, 560)
  rings15 = this.physics.add.sprite(630 + 600, 552)
  rings16 = this.physics.add.sprite(550 + 400, 450)
  rings17 = this.physics.add.sprite(590 + 400, 470)
  rings18 = this.physics.add.sprite(630 + 400, 488)
  rings19 = this.physics.add.sprite(56, 260)
  rings20 = this.physics.add.sprite(1380, 165)

  rings.body.setAllowGravity(false)
  rings2.body.setAllowGravity(false)
  rings3.body.setAllowGravity(false)
  rings4.body.setAllowGravity(false)
  rings5.body.setAllowGravity(false)
  rings6.body.setAllowGravity(false)
  rings7.body.setAllowGravity(false)
  rings8.body.setAllowGravity(false)
  rings9.body.setAllowGravity(false)
  rings10.body.setAllowGravity(false)
  rings11.body.setAllowGravity(false)
  rings12.body.setAllowGravity(false)
  rings13.body.setAllowGravity(false)
  rings14.body.setAllowGravity(false)
  rings15.body.setAllowGravity(false)
  rings16.body.setAllowGravity(false)
  rings17.body.setAllowGravity(false)
  rings18.body.setAllowGravity(false)
  rings19.body.setAllowGravity(false)
  rings20.body.setAllowGravity(false)

  function touchedRings(sonic, ring) {
    count += 1
    ring.destroy()
    ringSound.play()
    console.log(count)
  }

  this.physics.add.collider(sonic, rings, touchedRings)
  this.physics.add.collider(sonic, rings2, touchedRings)
  this.physics.add.collider(sonic, rings3, touchedRings)
  this.physics.add.collider(sonic, rings4, touchedRings)
  this.physics.add.collider(sonic, rings5, touchedRings)
  this.physics.add.collider(sonic, rings6, touchedRings)
  this.physics.add.collider(sonic, rings7, touchedRings)
  this.physics.add.collider(sonic, rings8, touchedRings)
  this.physics.add.collider(sonic, rings9, touchedRings)
  this.physics.add.collider(sonic, rings10, touchedRings)
  this.physics.add.collider(sonic, rings11, touchedRings)
  this.physics.add.collider(sonic, rings12, touchedRings)
  this.physics.add.collider(sonic, rings13, touchedRings)
  this.physics.add.collider(sonic, rings14, touchedRings)
  this.physics.add.collider(sonic, rings15, touchedRings)
  this.physics.add.collider(sonic, rings16, touchedRings)
  this.physics.add.collider(sonic, rings17, touchedRings)
  this.physics.add.collider(sonic, rings18, touchedRings)
  this.physics.add.collider(sonic, rings19, touchedRings)
  this.physics.add.collider(sonic, rings20, touchedRings)

  rings.anims.play("rings", true)
  rings2.anims.play("rings", true)
  rings3.anims.play("rings", true)
  rings4.anims.play("rings", true)
  rings5.anims.play("rings", true)
  rings6.anims.play("rings", true)
  rings7.anims.play("rings", true)
  rings8.anims.play("rings", true)
  rings9.anims.play("rings", true)
  rings10.anims.play("rings", true)
  rings11.anims.play("rings", true)
  rings12.anims.play("rings", true)
  rings13.anims.play("rings", true)
  rings14.anims.play("rings", true)
  rings15.anims.play("rings", true)
  rings16.anims.play("rings", true)
  rings17.anims.play("rings", true)
  rings18.anims.play("rings", true)
  rings19.anims.play("rings", true)
  rings20.anims.play("rings", true)

  }
} else if (cursors.right.isDown && cursors.space.isDown) {
  if (onGround == true) {
    onGround = false
    sonic.setVelocityY(-600)
    jumpSound.play()
  } else {
    sonic.anims.play('jump', true)
  }
 } else if (cursors.left.isDown && cursors.space.isDown) {
  if (onGround == true) {
    onGround = false
    sonic.setVelocityY(-600)
    jumpSound.play()
  } else {
    sonic.anims.play('jump', true)
  }
  //spindash
 } else if (cursors.down.isDown && cursors.space.isDown && crouching == true) {
  sonic.anims.play("spincharge", true)
  spincharging = true
  if (onGround == true) {
    onGround = false
    if (!spinddashSound.isPlaying) {
      spinddashSound.play()
    }
    
    sonic.setVelocityY(-20)
  }
  //right key
 } else if (cursors.right.isDown) {
  isRunning = true
  //hardstop
  if (momentum < -150) {
    sonic.flipX = false
    function hardStop() {
      if (onGround == true){
        if (momentum < -750) {
        sonic.anims.play('hardstop', true)
        momentum += 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
      }
      if (onGround == true){
        if (momentum > -750 && momentum < -500) {
        sonic.anims.play('hardstop2', true)
        momentum += 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (onGround == true){
        if (momentum > -500 && momentum < -250) {
        sonic.anims.play('hardstop3', true)
        momentum += 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (onGround == true){
        if (momentum > -250 && momentum < 0) {
        sonic.anims.play('hardstop4', true)
        momentum += 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (!hardstopSound.isPlaying) {
        hardstopSound.play()
      }
      
      momentum += 4
    }
    const myTimeout = setTimeout(hardStop, 100)
  } else {
    //speedup
    function speedUp() {
      sonic.flipX = false
      momentum += 4

      if (momentum > 290) {
        momentum = 290
      }
      if (momentum > 145) {
        momentum -= 3
      }
      if (momentum > 230) {
        if (momentum == 231 && onGround == true) {
          sonic.setVelocityY(-100)
        }
        sonic.anims.play("right2", true)
      } else {
        sonic.anims.play('right', true)
      }
      sonic.setVelocityX(momentum)
    }
    const myTimeout = setTimeout(speedUp, 100)
  }
 }else if (cursors.space.isDown) {
  //jumping
  if (onGround == true && crouching == false) {
    onGround = false
    sonic.setVelocityY(-600)
    jumpSound.play()
    
  } else {
    sonic.anims.play('jump', true)
  }
  //left key
 } else if (cursors.left.isDown) {
  isRunning = true
  if (momentum > 150) {
    sonic.flipX = true
    //hardstop
    function hardStop() {
      if (onGround == true){
        if (momentum > 750) {
        sonic.anims.play('hardstop', true)
        momentum -= 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
      }
      if (onGround == true){
        if (momentum < 750 && momentum > 500) {
        sonic.anims.play('hardstop2', true)
        momentum -= 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (onGround == true){
        if (momentum < 500 && momentum > 250) {
        sonic.anims.play('hardstop3', true)
        momentum -= 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (onGround == true){
        if (momentum < 250 && momentum > 0) {
        sonic.anims.play('hardstop4', true)
        momentum -= 8
        sonic.setVelocityX(momentum)
        sonic.setVelocityY(-20)
        }
        
      }
      if (!hardstopSound.isPlaying) {
        hardstopSound.play()
      }
      momentum -= 4
     
    }
    //normal left speedup
  const myTimeout = setTimeout(hardStop, 100)
  } else {
    sonic.flipX = true
    function speedUp() {
    momentum -= 4
    if (momentum < -290) {
      momentum = -290
    }
    if (momentum < -145) {
      momentum += 3
    }    
    if (momentum < -230) {
      if (momentum == -231 && onGround == true) {
        sonic.setVelocityY(-100)
      }
      sonic.anims.play("left2", true)
    } else {
      sonic.anims.play('left', true)
    }
    sonic.setVelocityX(momentum)
  }
  const myTimeout = setTimeout(speedUp, 100)
  
  }
  //bending over
 } else if (cursors.down.isDown && onGround == true) {
  function bendOver2() {
    sonic.anims.play("bendoverstay", true)
  }
  if (momentum > -10 && momentum < 10) {
    if (crouching == false) {
      sonic.anims.play("bendover", true)
      crouching = true
      sonic.setVelocityY(-100)
    } else {
      
      const myTimeout = setTimeout(bendOver2, 10)
    }

  }
 } else {
  crouching = false
  isRunning = false
  onGround = false

  if (spincharging == true) {
    if (sonic.flipX == true) {
      momentum = -1000

      spincharging = false
      ignoreCap = true
    }
    if (sonic.flipX == false) {
      momentum = 1000
      spincharging = false
      ignoreCap = true
    }
    
  } 
  //passive slowing
  function slowDown() {
    if (momentum > 0) {
      if (momentum > 290 && ignoreCap == false) {
        momentum = 290
      }
      if (momentum == 0 || momentum == 1 || momentum == 3) {
        sonic.setVelocityX(0)
        sonic.anims.play("idle", true)
      } else {
        sonic.anims.play('right', true)
        momentum -= 4
        sonic.setVelocityX(momentum)
      }
    } else {
      if (momentum < -290 && ignoreCap == false) {
        momentum = -290
      }
      if (momentum == 0 || momentum == -2 || momentum == -1) {
        sonic.setVelocityX(0)
        sonic.anims.play("idle", true)
      } else {
        sonic.anims.play('right', true)
        momentum += 4
        sonic.setVelocityX(momentum)
      }

    }    
  }
  const myTimeout = setTimeout(slowDown, 100)
 }
  camera1.startFollow(sonic)



  

  
}