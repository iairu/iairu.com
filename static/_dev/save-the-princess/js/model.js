
// MODEL

var activeScene;
var previousScene;
var tick = 0;
var refreshRate = 20;

var pressedkey = ""

var mouse = {
    x: 0,
    y: 0,
    selected: false,
    isPressed: false
}

function switchToScene(scene_name) {
    if (scene_name.constructor.name !== "Scene" &&
        scene_name.constructor.name !== "Duel") {
        console.log("Toto nie je scena ale " + scene_name.constructor.name);
        return;
    }
    if (activeScene !== undefined) {
        activeScene.onDeactivate();
        activeScene.reset();
        previousScene = activeScene;
    }
    activeScene = scene_name;
    activeScene.onActivate();
}

var audio = {
    isAllowed: false,
    btn: {
        click: undefined,
    },
    sceneSwitch: {
        default: undefined,
        swoosh: undefined,
        over: undefined,
    },
    sceneBg: {
        default: undefined,
        succeeding: undefined,
        dramatic: undefined,
    },
    ability: {
        default: undefined,
    },
    toggle() {
        this.isAllowed = (this.isAllowed) ? false : true;
        this.ontoggle();
        if (this.isAllowed) {return;}
        var i,j;
        var obj;
        for (i in this) {
            if (this[i].constructor.name == "Object") {
                obj = this[i];
                for (j in obj) {
                    if (obj[j] !== undefined && obj[j].constructor.name == "HTMLAudioElement") {
                        obj[j].pause();
                    }
                }
            }
        }
    },
    ontoggle: function() {}
}

var chambers = []

class Scene {
    constructor() {
        this.bg = new Background();
        this.contents = [this.bg];
        this.audioSwitchPlayed = false;
        this.audio = {
            switch: audio.sceneSwitch.default,
            bg: audio.sceneBg.default,
        }
    }
    add(object) {
        this.contents.push(object);
    }
    addPerm(object) {
        object.isPermanent = true;
        this.add(object);
    }
    setBg(src) {
        this.bg.src = src;
        this.bg.width = canvasWidth;
        this.bg.height = canvasHeight;
    }
    setAudioSwitch(audio) {
        this.audio.switch = audio;
        this.audioReset();
    }
    setAudioBg(audio) {
        this.audio.bg = audio;
        this.audioReset();
    }
    audioReset() {
        this.audioSwitchPlayed = false;
        if (this.audio.switch !== undefined) {
            this.audio.switch.pause();
            this.audio.switch.currentTime = 0;
        }
        if (this.audio.bg !== undefined) {
            this.audio.bg.pause();
            this.audio.bg.currentTime = 0;
        }
    }
    audioOnSwitch() {
        if (!audio.isAllowed) {
            this.audioReset();
            return;
        }
        if (!this.audioSwitchPlayed) {
            if (this.audio.switch !== undefined) this.audio.switch.play();
            this.audioSwitchPlayed = true;
        }
    }
    musicLoop() {
        if (!audio.isAllowed) {
            this.audioReset();
            return;
        }
        if (this.audio.bg !== undefined && this.audio.bg.paused) this.audio.bg.play();
        // TODO: autoplay problemy
    }
    clear() {
        // console.log("clear()");
        this.reset();
        var i;
        for (i in this.contents) {
            if (this.contents[i] !== this.bg)
                if (this.contents[i].isPermanent == undefined ||
                    this.contents[i].isPermanent == false)
                        this.contents[i] = undefined;
        }
        // vyhodi undefined objekty
        this.contents = this.contents.filter(function(value){return value !== undefined})
        // this.contents = [this.bg];
    }
    reset() {
        var i;
        for (i in this.contents) { // TODO: prehoď na nódy
            // console.log("reset() i:" + i);
            var o = this.contents[i];
            if (o.x_base !== undefined) {o.x = o.x_base}
            if (o.y_base !== undefined) {o.y = o.y_base}
            if (o.constructor.name == "Sprite") {
                o.animateResetInstant();
            }
            if (o.constructor.name == "Player" ||
                o.constructor.name == "Enemy") {
                // console.log("--> resetujem " + o.constructor.name);
                o.isJumping = false;
                o.isMoving = false;
                o.reset();
            }
        }
        this.audioReset();
    }
    onActivate() {}
    onDeactivate() {}
    onEscape() {}
    onSpace() {}
    onEnter() {}
    onTrigger(key) {

    }
    contentsHave(name) {
        var i;
        for (i in this.contents)
            if (this.contents[i].constructor.name == name)
                return 1;
        return 0;
    }
    contentsHavePos(name) {
        var i;
        for (i in this.contents)
            if (this.contents[i].constructor.name == name)
                return {x:this.contents[i].x, y:this.contents[i].y};
        return 0;
    }
}

class Duel extends Scene {
    constructor(chambers) {
        super();
        this.chambers = chambers;
        this.level = -1;
        this.chamber = -1;
        this.score = 0;
        // this.isPaused = false;
        this.switchChamber(0,0);
    }
    switchChamber(level=0,chamber=0) {
        if (this.chambers[level] !== undefined && this.chambers[level][chamber] !== undefined) {
            var newChamber = this.chambers[level][chamber];

            this.level = level;
            this.chamber = chamber;

            var label = new Label((this.level+1) + "-" + (this.chamber+1),canvasWidth/2-15,5);
            label.setColor("white");
            label.size = 12;
            this.clear();
            this.add(label); // TODO pouzi scene.reset() namiesto tohto bordelu
            if (newChamber.bg !== undefined) this.setBg(newChamber.bg);
            if (newChamber.enemy !== undefined) this.add(newChamber.enemy);
            this.add(player);
            if (newChamber.onload !== undefined) newChamber.onload();
        }
    }
    nextChamber() {
        //if ((next_chamber = this.chambers[this.level].indexOf(this.chambers[this.level][this.chamber+1])) !== -1) {
        if (this.chamber < this.chambers[this.level].length-1) {
            this.score += 100;
            this.switchChamber(this.level,this.chamber+1);
        }
        else if (this.level < this.chambers.length-1 && this.chambers[this.level+1].length > 0) {
            this.score += 1000;
            this.switchChamber(this.level+1,0);
        }
        else { // koniec hry = reset na prvú úroveň a onWin() call
            this.switchChamber(0,0);
            this.onWin();
            this.score = 0;
        }
    }
    // pause() {
    //     this.isPaused = this.isPaused ? false : true;
    // }
    onWin() {}
    onLoss() {}
    clearScore() {
        this.score = 0;
    }
}

class Ability {
    constructor(kind,collideWithKind,owner,startX=0,startY=0,width=50,height=50) {
        this.width = width;
        this.height = height;
        this.audio = audio.ability.default;
        this.collideWithKind = collideWithKind;
        this.hasCollided = false;
        this.hasStarted = false;
        this.owner = owner;
        this.startX = startX;
        this.startY = startY;
        this.x = this.startX + this.owner.x;
        this.y = this.startY + this.owner.y;
        this.absoluteStartX = this.x;
        this.wasTriggered = false;
        this.triggerCount = 0;
        this.damage = 10;
        this.sprites = [];
        this.freq = undefined;
        this.nextFire = 0;
        this.startTick = -1;
        this.kind = kind;
    }
    start() {
        this.x = this.startX + this.owner.x;
        this.y = this.startY + this.owner.y;
        this.absoluteStartX = this.x;
        this.startTick = tick.valueOf();
        this.hasStarted = true;
        this.hasCollided = false;
        if (audio.isAllowed &&
            this.audio != undefined) this.audio.play();
    }
    onActivate() {
    }
    whileActive() {
    }
    onCollision() {
    }
    checkCollision() {
        if (this.collideWithKind == "Nobody") {
            return undefined;
        }
        if (this.hasCollided ||
            this.x > canvasWidth || this.x < 0 ||
            this.y > canvasHeight || this.y < 0) {
                this.hasCollided = true;
                return undefined;
            }
        var o,c,w = this.width/2, h = this.height;
        for(i in activeScene.contents) {
            if (activeScene.contents[i].constructor.name == this.collideWithKind) {
                o = activeScene.contents[i];
                c = activeScene.contents[i].collision;
                for(var j in activeScene.contents[i].abilities) {
                    var a = activeScene.contents[i].abilities[j];
                    if (a.kind == "Shield" && a.wasTriggered &&
                        this.x > a.x && this.x < a.x + a.sprites[0].width &&
                        this.y < a.y + a.sprites[0].height-50) {
                        this.hasCollided = true;
                        console.log("Blocked!")
                        return i;
                    }
                }
                if (this.x + w > o.x + c.x && this.y + h > o.y + c.y &&
                    this.x + w < o.x + c.w && this.y + h < o.y + c.h) {
                    this.hasCollided = true;
                    o.health -= this.damage;
                    console.log("Damage!");
                    return i;
                }
            }
        }
        return undefined;
    }
    reset() {
        this.wasTriggered = false;
        this.hasCollided = false;
        this.hasStarted = false;
    }
    addSprite(kind,src,x_base=0,y_base=0,startX=0,distX=0,startY=0,distY=0) { // TODO: prepisat stylom addAbility aby sa netahali tie argumenty
        this.sprites.push(new Sprite(kind,src,x_base,y_base,startX,distX,startY,distY));
    }
}

class Entity {
    constructor() {
        this.sprites = [];
        this.spriteCollection = [];
        this.currentSprites = 0;
        this.abilities = [];
        this.collision = {
            x:0,
            y:0,
            w:50,
            h:50
        }
        // this.width = 50;
        // this.height = 50;
        this.x_base = 0;
        this.y_base = canvasHeight - 50;
        this.x = this.x_base;
        this.y = this.y_base;
        this.dx = 7;
        this.dy = 7;
        this.startHealth = 100;
        this.health = this.startHealth;
        this.healthBar = {
            x: 0,
            y: 5,
            wStart: 225,
            h: 17,
            color: "red"
        }
        this.isMoving = false;
        this.isJumping = false;
        // this.activeAbility = false;
    }
    setInitBase() {
        this.x_base_init = this.x_base;
        this.y_base_init = this.y_base;
    }
    setSprites(collectionNo) {
        this.currentSprites = collectionNo;
        if (this.sprites[collectionNo] == undefined)
            this.sprites[collectionNo] = [];
        // this.repositionBySprites();
    }
    addSprite(kind,src,x_base=0,y_base=0,startX=0,distX=0,startY=0,distY=0,collectionNo=this.currentSprites) { // TODO: prepisat stylom addAbility aby sa netahali tie argumenty
        if (this.sprites[collectionNo] == undefined)
            this.sprites[collectionNo] = [];
        this.sprites[collectionNo].push(new Sprite(kind,src,x_base,y_base,startX,distX,startY,distY));

        if (collectionNo == 0 &&
            collectionNo == this.currentSprites &&
            this.sprites[collectionNo].length == 1) { // posunutie celeho objektu podla prveho sprite
            this.repositionBySprites(1);
        }
    }
    repositionBySprites(setX=0) {
        var self = this;
        var collectionNo = this.currentSprites;
        var interval = setInterval(function(){
            if (self.sprites[collectionNo][0].width > 0 &&
                self.sprites[collectionNo][0].height > 0) {
                    if (setX) self.x = self.x_base_init - self.sprites[collectionNo][0].width;
                    self.y = self.y_base_init - self.sprites[collectionNo][0].height;
                    self.setBase();
                    clearInterval(interval);
                }
        },40);
    }
    resetSpriteColAnimation(collectionNo=this.currentSprites) {
        var col = this.sprites[collectionNo];
        for (i in col) {
            col[i].animateResetInstant();
        }
    }
    recalcCollision() {
        let s = this.sprites[this.currentSprites];
        let c = this.collision;
        for(var i in s) {
            if (i == 0) {
                c.x = s[i].x_base;
                c.y = s[i].y_base;
                c.w = s[i].width;
                c.h = s[i].height;
            }
            else {
                // zmena dlzok na pozitivnych osiach
                if(s[i].x_base < c.w && s[i].x_base + s[i].width > c.x + c.w)
                    c.w += (s[i].x_base + s[i].width) - (c.x + c.w)
                if(s[i].y_base < c.h && s[i].y_base + s[i].height > c.y + c.h)
                    c.h += (s[i].y_base + s[i].height) - (c.y + c.h)
                // zmena kotevneho bodu a dlzok na negativnych osiach
                if(s[i].x_base < c.x) {
                    c.w += Math.abs(s[i].x_base);
                    c.w += c.x;
                    c.x = s[i].x_base;
                }
                if(s[i].y_base < c.y) {
                    c.h += Math.abs(s[i].y_base);
                    c.h += c.y;
                    c.y = s[i].y_base;
                }
            }
        }
    }
    moveTo(x,y=0) { // TODO: treba pridat limity na canvasWidth/Height ako pri BackForth
        this.x = x;
        this.y = y;
    }
    moveBy(x,y=0) {
        this.moveTo(this.x+x,this.y+y);
    }
    setBase() {
        this.x_base = this.x;
        this.y_base = this.y;
    }
    setStartHealth(health) {
        this.startHealth = health;
        this.health = this.startHealth;
    }
    addAbility(ability) {
        var pos = this.abilities.push(ability);
        return this.abilities[pos-1];
    }
    triggerAbility(num) {
        this.abilities[num].wasTriggered = true;
    }
    reset() {
        console.log(this.constructor.name + " reset");
        // this.health = this.startHealth;
    }
    death() {
        console.log(this.constructor.name + " died");
        this.health = this.startHealth;
        this.onDeath();
    }
    onDeath() {}
}

class Label{
    constructor(text,x=0,y=0) {
        this.x = x;
        this.y = y;
        this.size = 24;
        this.font = "Courier New";
        this.text = text;
        this.color = "black";
    }
    setColor(color) {
        this.color = color;
    }
}

class Button extends Label {
    constructor(text, x=0, y=0, width=160, height=35, lx=40, ly=6) { // add default options
        super(text,x,y);
        this.isSelected = 0;
        this.isActivated = 0;
        this.width = width;
        this.height = height;
        //this.bg.width = 30;
        //this.bg.height = 30;
        this.lx = this.x + lx; // label x
        this.ly = this.y + ly; // label y
        this.size = 15; // label font size
        this.audio = audio.btn.click;
    }
    setBgPlaceholder() {
        this.setBg("img_btn/placeholder.png","img_btn/placeholder_hover.png");
    }
    setIconPlaceholder() {
        this.setIcon("img_btn/placeholder.png","img_btn/placeholder_hover.png");
    }
    setBg(src,hoverSrc) {
        this.bg = new Image();
        this.bgHover = new Image();
        this.bg.src = src;
        this.bgHover.src = hoverSrc;
        this.bg.width = this.width;
        this.bg.height = this.height;
    }
    setIcon(src,hoverSrc) {
        this.icon = new Image();
        this.iconHover = new Image();
        this.icon.src = src;
        this.iconHover.src = hoverSrc;
        // var originalWidth = this.icon.width;
        this.icon.width = this.height;
        this.icon.height = this.icon.width;
        // this.icon.height /= (originalWidth / this.icon.width);
    }
    click() {
        if (audio.isAllowed && this.audio != undefined) this.audio.play();
        this.onClick();
    }
    onClick() {}
    select() {this.isSelected = 1;}
    activate() {this.isActivated = 1;}
    deselect() {this.isSelected = 0;}
    deactivate() {this.isActivated = 0;}
}

class Player extends Entity {
    constructor() {
        super();
        this.x = 120;
        this.setBase();
        this.setInitBase();
        this.healthBar.x = 60;
    }
    moveToggle() {
        this.isMoving = this.isMoving ? 0 : 1;
    }
    // manipulation() {
    //     if (activeScene.constructor.name == "Duel") {
    //         if (this.x >= canvas.width) {
    //             if (!activeScene.contentsHave("Enemy")) {
    //                 activeScene.nextChamber();
    //             } else {
    //                 this.x = canvas.width - 150;
    //             }
    //          }
    //     else if (this.x < 0)
    //         activeScene.onLoss();
    //     }
    // }
    manipulation() {
        if (activeScene.constructor.name == "Duel") {
                var enemy;
                if (enemy = activeScene.contentsHavePos("Enemy")) {
                    if (this.x > enemy.x) this.x = enemy.x;
                } else if (this.x > canvas.width) {
                    activeScene.nextChamber();
                }
        if (this.x < 0)
            this.x = 0;
        }
    }
    direction(direction) {
        var i;
        if (this.isMoving != direction) {
        /* Pri zmene smeru musi resetovat animaciu sprites okamžite inak sa mu rozletia gate :D */
            this.resetSpriteColAnimation()
        }
        this.isMoving = direction;
    }
    directionReset() {
        this.isMoving = false;
    }
    move() { // Posunie sa podla smeru nastaveneho na zaklade this.direction()
        if (this.isMoving == "left") {this.moveBy(-this.dx)} 
        else if (this.isMoving == "right") {this.moveBy(this.dx)}
        else if (this.isMoving == "up") {if(this.isJumping == false){this.isJumping = "up";}}
        //else if (this.isMoving == "down") {this.moveBy(0,this.dy)}
    }
    jump() {
        if (this.isJumping !== false) {
            if (this.isJumping == "up" && this.y > 100) {
                this.y -= this.dy;
                this.x += (this.isMoving == "left") ? -this.dx/3 : this.dx/3;
            }
            else if (this.y < this.y_base) {
                this.isJumping = "down"
                this.y += this.dy;
                this.x += (this.isMoving == "left") ? -this.dx/3 : this.dx/3;
            }
            else {
                this.isJumping = false;
                this.y = this.y_base;
            }
        }
    }
}

class Enemy extends Entity {
    constructor(maxHealth=100) {
        super();
        this.x = canvasWidth - 20;
        this.setBase();
        this.setInitBase();
        this.healthBar.x = 350;
        this.startHealth = maxHealth;
        this.health = maxHealth;
    }
    addAutoAbility(ability,freq) {
        var a = this.addAbility(ability);
        a.freq = freq;
        return a;
    }
}

class Background extends Image {
    constructor() {
        super();
    }
}

class Video {
    constructor(src) {
        this.video = document.createElement("video");
        this.video.src = src;
        this.video.style.display = "block";
        this.video.style.position = "absolute";

        this.x = 0;
        this.y = 0;
        this.video.style.top = 0;
        this.video.style.left = 0;

        this.width = canvasWidth;
        this.height = canvasHeight;
        this.video.width = this.width;
        this.video.style.width = this.width+"px";
        this.video.height = this.height;
        this.video.style.height = this.height+"px";
        this.video.style.background = "red";

        this.isPlaying = false;
    }
    audioUserMuteSync() {
        if (!audio.isAllowed)
            this.video.muted = true;
        else
            this.video.muted = false;
    }
    play() {
        this.video.play()
        this.isPlaying = true;
    }
    stop() {
        this.video.pause()
        this.video.currentTime = 0;
    }
    onStop() {
        
    }
    isPlaying() {
        if (this.video.currentTime == this.video.duration ||
            this.video.currentTime == 0)
            return 0;
        return 1;
    }
    hasEnded() {
        if (this.video.currentTime == this.video.duration &&
            this.video.duration !== 0)
            return 1;
        return 0;
    }
}

class Sprite extends Image {
    constructor(kind,src,x_base,y_base,startX,distX,startY,distY) {
        super();
        this.src = src;
        this.kind = kind;
        this.x_base = x_base;
        this.y_base = y_base;
        
        this.directionX = 1;
        this.directionY = 1;
        this.distX = distX;
        this.distY = distY;
        this.cur_distX = startX;
        this.cur_distY = startY;
        
        this.x_base_init = x_base;
        this.y_base_init = y_base;
        this.directionX_init = 1;
        this.directionY_init = 1;
        this.distX_init = distX;
        this.distY_init = distY;
        this.cur_distX_init = startX;
        this.cur_distY_init = startY;
    }
    animateX() {
        if (this.cur_distX == 0) {
            this.directionX *= -1;
            this.cur_distX = this.distX;
        }
        if (this.distX > 0) {
            this.x_base += 1.5 * this.directionX;
        }
        if (this.cur_distX != 0) {
            this.cur_distX--;
        }
    }
    animateY() {
        if (this.cur_distY == 0) {
            this.directionY *= -1;
            this.cur_distY = this.distY;
        }
        if (this.distY > 0) {
            this.y_base += 1.5 * this.directionY;
        }
        if (this.cur_distY != 0) {
            this.cur_distY--;
        }
    }
    animateReset() {
        if (this.x_base != this.x_base_init) {
            this.x_base = Math.round(this.x_base);
            this.x_base += (this.x_base > this.x_base_init) ? -1 : 1;
            this.directionX = this.directionX_init;
            this.distX = this.distX_init;
            this.cur_distX = this.cur_distX_init;
        }
        if (this.y_base != this.y_base_init) {
            this.y_base = Math.round(this.y_base);
            this.y_base += (this.y_base > this.y_base_init) ? -1 : 1;
            this.directionY = this.directionY_init;
            this.distY = this.distY_init;
            this.cur_distY = this.cur_distY_init;
        }
    }
    animateResetInstant() {
        this.x_base = this.x_base_init;
        this.directionX = this.directionX_init;
        this.distX = this.distX_init;
        this.cur_distX = this.cur_distX_init;
        this.y_base = this.y_base_init;
        this.directionY = this.directionY_init;
        this.distY = this.distY_init;
        this.cur_distY = this.cur_distY_init;
    }
}