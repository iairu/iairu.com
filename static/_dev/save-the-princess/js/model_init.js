
// jednotlive objekty podla ich modelov (nie je sucast engine)

// ------------------- AUDIO
audio.btn.click = new Audio("./audio_sfx/tongue_1.mp3");
audio.sceneSwitch.swoosh = new Audio("./audio_sfx/swoosh_1.mp3");
audio.sceneSwitch.paper = new Audio("./audio_sfx/paper.mp3");
audio.sceneSwitch.over = new Audio("./audio_sfx/over.mp3");
audio.sceneBg.succeeding = new Audio("./audio_music/succeeding.mp3");
audio.sceneBg.dramatic = new Audio("./audio_music/dramatic.mp3");
audio.ability.default = new Audio("./audio_sfx/pop_1.mp3");
audio.ability.punch = new Audio("./audio_sfx/mad.mp3");
audio.ability.slam = new Audio("./audio_sfx/slam.mp3");
audio.won = new Audio("./audio_sfx/clap.mp3");
audio.lost = new Audio("./audio_sfx/glassbreak.mp3");

// ------------------- CUTSCENES

let intro = new Scene();
let introvideo = new Video("video/intro.mp4");
introvideo.onStop = function() {
    // switchToScene(duel);
    switchToScene(man);
    previousScene = duel;
}
intro.onActivate = function() {
    introvideo.play();
}
intro.onDeactivate = function() {
    introvideo.stop();
}
intro.add(introvideo);
intro.onEnter = function(){introvideo.onStop()}
intro.onEscape = function(){introvideo.onStop()}

let outro = new Scene();
let outrovideo = new Video("video/outro.mp4");
outrovideo.onStop = function() {
    // switchToScene(duel);
    switchToScene(menu);
    previousScene = menu;
}
outro.onActivate = function() {
    outrovideo.play();
}
outro.onDeactivate = function() {
    outrovideo.stop();
    if (audio.isAllowed) audio.won.play();
}
outro.add(outrovideo);
outro.onEnter = function(){introvideo.onStop()}
outro.onEscape = function(){introvideo.onStop()}


// ------------------- MENU

// let game_name = new Label("Save the Princess",155,70);
// let game_name_sub = new Label("D E V E L O P E R    P R E V I E W",120,110);
// game_name_sub.size = 15;
// let game_name_white = new Label("Save the Princess");
// game_name_white.setColor("white");

let game_ver = new Label("KB4-v20.05.20 final",350,3);
game_ver.size = 12;
game_ver.color = "#c4c1b7";

let btnPlay = new Button("Play Game",250,200,160);//,"img_btn/play.png", "img_btn/play_hover.png");
btnPlay.onClick= function(){switchToScene(intro)};
btnPlay.setColor("black");
btnPlay.setIcon("img_btn/play.png","img_btn/play_hover.png");

var difficulty = "Hard";
let btnDif = new Button(difficulty,10,320,160);
btnDif.setColor("gray");
btnDif.setIcon("img_btn/diff.png","img_btn/diff_hover.png");

// let btnMan = new Button("Manual",250,250,160);
// btnMan.onClick= function() {switchToScene(man)};
// btnMan.setColor("gray");
// btnMan.setIcon("img_btn/load.png","img_btn/load_hover.png");

let btnLoad = new Button("Load Game",250,250,160);
btnLoad.onClick= function() {
    switchToScene(loader);
};
btnLoad.setColor("gray");
btnLoad.setIcon("img_btn/load.png","img_btn/load_hover.png");

let btnToggle = new Button("Audio " + ((audio.isAllowed) ? "ON" : "OFF"),250,285,160);
btnToggle.onClick= function() {
    audio.toggle();
};
btnToggle.setColor("gray");

let menu = new Scene();

// menu.add(game_name);
// menu.add(game_name_sub);
menu.add(game_ver);
menu.add(btnPlay);
menu.add(btnDif);
menu.add(btnLoad);
// menu.add(btnMan);
menu.add(btnToggle);
menu.setBg("img_scene/menu_main.jpg");
menu.onEnter = function(){switchToScene(intro);}

// ------------------- OVER, WIN, PAUSE

let score_final = new Label("",205,220);
score_final.size = 16;
score_final.setColor("lightyellow");

let btnRetry = new Button("Restart",200,250,240,30,70);//,"img_btn/play.png", "img_btn/play_hover.png");
btnRetry.onClick= function() {switchToScene(menu)}; // TODO: pridaj reset do class scene, prejde vsetko v contents, vsetky veci v contents by mali mat default moznosti pre x,y,anim,...
btnRetry.setColor("#888");
// btnRetry.setIconPlaceholder();
btnRetry.setIcon("img_btn/selector.png","img_btn/selector_hover.png");

let btnSave = new Button("Save Game",250,250,160);
btnSave.onClick= function() {
    var state = downloadSave(exportGame(duel));
    alert(state ? "Hra bola uložená :)" : "Došlo k chybe pri ukladaní :(");
}
btnSave.setColor("gray");
btnSave.setIcon("img_btn/load.png","img_btn/load_hover.png");

let btnCont = new Button("Continue",250,200,160,30);//,"img_btn/play.png", "img_btn/play_hover.png");
btnCont.onClick= function(){activeScene = duel;};
btnCont.setColor("black");
btnCont.setIcon("img_btn/play.png","img_btn/play_hover.png");

let over = new Scene();

over.add(score_final);
over.add(btnRetry);
over.setBg("img_scene/game_over.jpg");
over.setAudioSwitch(audio.sceneSwitch.over);
over.onActivate = function(){score_final.text = "Score: " + duel.score;}
over.onEnter = btnRetry.onClick;
over.onEscape = btnRetry.onClick;

let pause = new Scene();

pause.setBg("img_scene/menu_pause.jpg");
pause.add(btnCont); // z menu
pause.add(btnSave); // z menu
pause.add(btnToggle); // z menu
pause.onEscape = function(){activeScene = duel;duel.onActivate();}
pause.onEnter = function(){pause.onEscape()}

// let win = new Scene();
// win.setBg("img_scene/game_over.jpg");


// ------------------- DUEL

let player = new Player();
player.addSprite("Left","img_sprite/player_left.png",0,-50,2,0,2,7); //0
player.addSprite("Head","img_sprite/player_head.png",10,-92,5,15); //1
player.addSprite("Leg_L","img_sprite/player_leg_l.png",25,5,10,10,0,7); //2
player.addSprite("Leg_R","img_sprite/player_leg_r.png",0,-5,0,10,5,7); //3
player.addSprite("Right","img_sprite/player_right.png",-15,-52,7,15); //4
// player.setSprites(0);
// player.setSprites(1);

player.onDeath = function() {
    duel.onLoss();
}
player.setStartHealth(300);

let playerPunch = player.addAbility(new Ability("Attack","Enemy",player,0,-10));
playerPunch.addSprite("Punch","img_sprite/projectiles/punch1.png");
playerPunch.audio = audio.ability.punch;
playerPunch.onActivate = function() {
    player.sprites[0][4].x_base = 2; // Posunutie hracovej ruky ako keby punchoval
    if (audio.isAllowed && this.audio != undefined) this.audio.play();
}
playerPunch.whileActive = function(){
    if (this.x > this.absoluteStartX + 50) {
        this.reset();
    }
    else this.x+=7;
};
playerPunch.onCollision = function(){
    
};

let pShield = player.addAbility(new Ability("Shield","Enemy",player,0,-120,200,180));
pShield.addSprite("Shield","img_sprite/projectiles/shield1.png");
pShield.audio = audio.ability.slam;
pShield.damage = 5;
pShield.onActivate = function() {
    player.resetSpriteColAnimation(); // inak by sa mu rozletela hlava pri spame :)
    player.sprites[0][4].y_base -= 15; // Posunutie hracovej ruky
    player.sprites[0][1].y_base += 15; // Posunutie hracovej hlavy
}
pShield.whileActive = function(){
    if (tick > this.startTick + 1000/refreshRate) { // Zrusenie po jednej sekunde
        this.reset();
    }
    this.x = player.x+5;
};
pShield.onCollision = function(){
    
};

let pHeal = player.addAbility(new Ability("Heal","Nobody",player,-80,-120,200,180));
pHeal.addSprite("HealAura","img_sprite/projectiles/aura3.png");
pHeal.onActivate = function() {
    player.resetSpriteColAnimation();
    player.sprites[0][4].y_base += 15; // Posunutie hracovej ruky
    player.sprites[0][0].y_base += 15; // Posunutie hracovho tela
    this.width = 200;
    this.height = 180;
    this.startHealth = 0;
    this.startChamber = duel.chamber.valueOf();
    this.startLevel = duel.level.valueOf();
}
pHeal.whileActive = function(){
    if (this.width > 10 &&
        this.height > 10) {
            this.width -= 10;
            this.height -= 10;
    } else {
        this.width = 1;
        this.height = 1;
    }
    if (this.startHealth < 100) {
        if (player.health < player.startHealth) player.health += 10;
        this.startHealth += 10;
        console.log("Healing up!");
    }
    if (this.startChamber != duel.chamber.valueOf() ||
        this.startLevel != duel.level.valueOf()) {
            this.reset();
    }
};

// chambers[0][1].enemy.isMovable = 1;
// chambers[0][1].enemy.isMovableKey = "f";

let e, a;

// LEVEL 1-1
chambers[0] = [];
chambers[0][0] = {enemy: new Enemy(100), bg: "img_scene/duel_1.jpg"};
e = chambers[0][0].enemy
e.addSprite("Body","img_sprite/fly.png",0,0,5,10);
e.isMoving = true;
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),10,30),200);
a.addSprite("Wings","img_sprite/projectiles/wings.gif");
a.damage = 10;
a.onActivate = function(){
    this.owner.sprites[0][0].distX = 25;
    this.owner.sprites[0][0].cur_distX = 0;
    // console.log("Nepriatel zautocil");
};
a.whileActive = function(){
    this.x -= 10;
};
a.onCollision = function() {
    this.owner.sprites[0][0].distX = 10;
    this.owner.sprites[0][0].cur_distX = 0;
}

// LEVEL 1-2
chambers[0][1] = {enemy: new Enemy(120), bg: "img_scene/duel_1.jpg"};
e = chambers[0][1].enemy;
e.addSprite("Body","img_sprite/bat_closed.png",0,0,5,10);
e.setSprites(1);
e.addSprite("Body","img_sprite/bat_open.png",-70,0);
e.setSprites(0);
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),-50,3,100,100),100);
a.addSprite("AttackAura","img_sprite/projectiles/aura1.png");
a.damage = 5;
a.onActivate = function(){
    this.owner.setSprites(1);
    this.goUp = 1;
};
a.whileActive = function(){
    this.x -= 10;

    if (this.goUp && this.y > 150) {
        this.y -= 5;
    } else {
        this.goUp = 0;
    }
    
    if (!this.goUp && this.y < 200) {
        this.y += 5;
    } else {
        this.goUp = 1;
    }
};
a.onCollision = function() {
    this.owner.setSprites(0);
}
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),-50,3,100,100),420);
a.addSprite("AttackAuraStrong","img_sprite/projectiles/aura2.png");
a.damage = 70;
a.onActivate = function(){
    this.owner.setSprites(1);
    this.goUp = 1;
};
a.whileActive = function(){
    this.x -= 10;

    if (this.goUp && this.y > 150) {
        this.y -= 5;
    } else {
        this.goUp = 0;
    }
    
    if (!this.goUp && this.y < 200) {
        this.y += 5;
    } else {
        this.goUp = 1;
    }
};
a.onCollision = function() {
    this.owner.setSprites(0);
}

// LEVEL 2-1
chambers[1] = [];
chambers[1][0] = {enemy: new Enemy(200), bg: "img_scene/duel_2.jpg", 
    onload(){ // TODO: vytvor TimedFancyLabel class ktory vyzera krajsie a sam sa skryje
        var label = new Label("Vitaj v druhej úrovni!",40,50);
        label.setColor("lightyellow");
        label.size = 12;
        duel.contents.push(label);
    }
}
e = chambers[1][0].enemy;
e.addSprite("Body","img_sprite/spider.png",5,40,20,50);
e.setSprites(1);
e.addSprite("Body","img_sprite/spider_crouching.png",5,100,20,50);
e.setSprites(2);
e.addSprite("Body","img_sprite/spider_knitting.png",5,50,20,50);
e.setSprites(0);
e.isMoving = true;
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),-50,100,100,100),100);
a.addSprite("Attack1","img_sprite/projectiles/web.png");
a.damage = 40;
a.onActivate = function(){
    this.owner.setSprites(2);
};
a.whileActive = function(){
    this.x -= 10;
};
a.onCollision = function() {
    this.owner.setSprites(0);
}

// LEVEL 2-2
chambers[1][1] = {enemy: new Enemy(80), bg: "img_scene/duel_2.jpg"};
e = chambers[1][1].enemy;
e.isMoving = true;
e.addSprite("Body","img_sprite/worm.png");
e.setSprites(1);
e.addSprite("Body","img_sprite/worm_underground.png",0,120,50,120);
e.setSprites(0);
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),-50,135,100),100);
a.addSprite("Attack1","img_sprite/projectiles/worm_groundhead.png");
a.damage = 100;
a.onActivate = function(){
    this.owner.setSprites(1);
};
a.whileActive = function(){
    this.x -= 5;
};
a.onCollision = function() {
    this.owner.setSprites(0);
}

// LEVEL 2-3
chambers[1][2] = {enemy: new Enemy(300), bg: "img_scene/duel_2.jpg"};
e = chambers[1][2].enemy;
e.addSprite("Body","img_sprite/spider.png",5,40,20,50);
e.setSprites(1);
e.addSprite("Body","img_sprite/spider_crouching.png",5,100,20,50);
e.setSprites(2);
e.addSprite("Body","img_sprite/spider_knitting.png",5,50,20,50);
e.setSprites(0);
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),50,200,50,37),100);
a.addSprite("AttackMiniSpider","img_sprite/projectiles/spider_small.png");
a.damage = 10;
a.onActivate = function(){
    this.owner.setSprites(1);
};
a.whileActive = function(){
    this.x -= 5;
};
a.onCollision = function() {
    this.owner.setSprites(0);
}
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),50,210,50,37),150);
a.addSprite("AttackMiniSpider","img_sprite/projectiles/spider_small.png");
a.damage = 10;
a.onActivate = function(){
    this.owner.setSprites(1);
};
a.whileActive = function(){
    this.x -= 5;
};
a.onCollision = function() {
    this.owner.setSprites(0);
}

// LEVEL 3-1
chambers[2] = [];
chambers[2][0] = {enemy: new Enemy(300), bg: "img_scene/duel_3.jpg"};
e = chambers[2][0].enemy;
e.addSprite("Body","img_sprite/skeleton_body.png",0,30,10,5);
e.addSprite("Head","img_sprite/skeleton_head.png",-10,-10);
e.setSprites(1);
e.setSprites(0);
e.isMoving = true;
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),0,70,79,139),150);
a.addSprite("FlyingSkelet","img_sprite/projectiles/skeleton_flying.png");
a.damage = 200;
a.onActivate = function(){
    this.owner.setSprites(1);
};
a.whileActive = function(){
    this.x -= 10;
};
a.onCollision = function() {
    this.owner.setSprites(0);
}

// LEVEL 3-2
chambers[2][1] = {enemy: new Enemy(350), bg: "img_scene/duel_3.jpg"};
e = chambers[2][1].enemy;
e.addSprite("Body","img_sprite/worm.png",0,0,50,50);
e.setSprites(1);
e.setSprites(0);
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),0,70,188,94),100);
a.addSprite("WormWave","img_sprite/projectiles/worm_grounded.png");
a.damage = 20;
a.onActivate = function(){
    this.owner.setSprites(1);
};
a.whileActive = function(){
    this.x -= 10;
    this.lastX = this.x;
};
a.onCollision = function() {
    if (this.y-30 < player.y &&
        this.x+15 > player.x) {
        player.x -= 100;
        player.y -= 50;
        player.isJumping = 1;
        player.health -= 80;
        console.log("Collided with player head-on");
    } else {
        console.log("Didn't collide with player head-on");
    }
    // console.log(this.y+" "+player.y+"\n"+this.x+" "+player.x);
    this.owner.setSprites(0);
}

// LEVEL 4-1
chambers[3] = [];
chambers[3][0] = {enemy: new Enemy(450), bg: "img_scene/duel_4.jpg"};
e = chambers[3][0].enemy;
e.addSprite("Body","img_sprite/hydra_body.png",0,70,0,10,0,10);
e.addSprite("Head","img_sprite/hydra_head.png",0,50,0,10);
e.isMoving = true;
a = e.addAutoAbility(new Ability("Attack","Player",e.valueOf(),-170,100,324,117),200);
a.addSprite("HydraLaser","img_sprite/projectiles/laser.png");
a.damage = 190;
a.onActivate = function(){
    this.endTick = tick.valueOf() + 70;
};
a.whileActive = function(){
    if (this.endTick < tick)
        this.reset();
};
a.onCollision = function() {
}


let duel = new Duel(chambers);
duel.audio = audio.sceneBg.dramatic;
duel.onActivate = function() {
    if (audio.isAllowed && duel.audio !== undefined)
        duel.audio.play();
}

duel.onTrigger = function(key){
    if (key == "F") {
        player.triggerAbility(0); //punch
    } else if (key == "E") {
        player.triggerAbility(1); //shield
    } else if (key == "Q") {
        player.triggerAbility(2); //heal
    }
}

// temp_info = new Label("Jednorázový tip: Dočasne pre prechádzanie levelov kráčaj doprava.");
// temp_info.setColor("gray");
// temp_info.y = canvasHeight-20;
// temp_info.x = 10;
// temp_info.size = 10;

// temp_info_ = new Label("Jednorázový tip: Dočasne pre smrť kráčaj doľava.");
// temp_info_.setColor("gray");
// temp_info_.y = canvasHeight-40;
// temp_info_.x = 10;
// temp_info_.size = 10;

// duel.add(temp_info);
// duel.add(temp_info_);
duel.onEscape = function(){activeScene = pause;}
// game_name_win_x = game_name.x - 50;
// game_name_sub_win_x = game_name_sub.x + 20;
duel.onWin = function(){
    // switchToScene(win);
    // game_name.text = "You saved the princess!";
    // game_name.x = game_name_win_x;
    // game_name_sub.text = "C O N G R A T U L A T I O N S";
    // game_name_sub.x = game_name_sub_win_x;
    switchToScene(outro);
    duel.audio.pause();
    player.health = player.startHealth;
}
duel.onLoss = function(){
    duel.switchChamber(0,0);
    switchToScene(over);
    duel.clearScore();
    duel.audio.pause();
    if (audio.isAllowed) audio.lost.play();
    player.health = player.startHealth;
}

let btnPause = new Button("",canvasWidth-40,3,160);
btnPause.setIcon("img_btn/pause.png","img_btn/pause_hover.png");
btnPause.onClick = function() {
    activeScene = pause;
}

let btnToggleSmall = new Button("",5,0,160);
btnToggleSmall.onClick= function() {
    audio.toggle();
};
duel.addPerm(btnToggleSmall)
duel.addPerm(btnPause)
intro.add(btnToggleSmall)
outro.add(btnToggleSmall)

// ------------------- MAN

// instructions = [
//     "Instructions:",
//     "- pouzi sipky na pohyb",
//     "- ked prejdes na koniec obrazovky zomres",
//     "- mozes hybat malymi pavucikmi",
//     "- easter egg: rozletia sa ti gate",
//     "- jeden z pavucikov sa bude hybat mysou len ak",
//     "  zaroven drzis \"f\"",
//     "varovanie: do hlavneho menu a teda aj manualu sa", 
//     "           znovu dostanes len po refreshi",
//     "           toto bude v buducnosti lepsie riesene"
// ]
// posX = 5;
// posY = 5;
// posY_increment = 25;
// for(i in instructions) {
//     var txt = new Label(instructions[i],posX,posY);
//     txt.size = 15;
//     posY += posY_increment;
//     man.add(txt.valueOf());
// }


let btnX = new Button("x",canvasWidth-70,5);
btnX.onClick= function(){switchToScene(previousScene)};
btnX.setColor("white");
btnX.setBgPlaceholder();

let man = new Scene();
man.add(btnX);
man.setBg("img_scene/man.jpg");
man.onEnter = function(){switchToScene(previousScene)}
man.onEscape = function(){switchToScene(previousScene)}
man.onActivate = function(){
    if (audio.isAllowed && audio.sceneSwitch.paper !== undefined) {
        audio.sceneSwitch.paper.play();
    }
}

// AUDIO MANIPULATION

audio.ontoggle = function() {
    btnToggle.text = "Audio " + ((audio.isAllowed) ? "ON" : "OFF");
    if (audio.isAllowed) {
        btnToggle.setIcon("img_btn/audio.png","img_btn/audio_hover.png");
        btnToggleSmall.setIcon("img_btn/audio.png","img_btn/audio_hover.png");
    }
    else {
        btnToggle.setIcon("img_btn/audio_off.png","img_btn/audio_hover_off.png");
        btnToggleSmall.setIcon("img_btn/audio_off.png","img_btn/audio_hover_off.png");
    }
}

audio.ontoggle()

// ------------------- LOAD GAME SCENE

loadBox = document.createElement("input");

btnImport = new Button("Importovať",25,canvasHeight/2);
btnImport.setIcon("img_btn/load.png","img_btn/load_hover.png");
var top = this;
btnImport.onClick = function() {
    // alert(loadBox.value);
    state = importGame(loadBox.value,duel);
    if (state == 0) {
        alert("Načítavanie zlyhalo: Chybné dáta");
    } else {
        alert("Importovanie úspešné!");
        top.duel = state;
        switchToScene(duel);
    }
}

let loader = new Scene();
loader.setBg("img_scene/menu_import.jpg");
loader.add(btnImport);
loader.add(btnX);

loader.onActivate = function() {
    loadBox.style.display = "block";
    loadBox.value = "";
}
loader.onDeactivate = function() {
    loadBox.style.display = "none";
    loadBox.value = "";
}

loadBox.id = "loadBox";
loadBox.style.display = "none";
loadBox.style.position = "absolute";
loadBox.style.width = canvasWidth - 50 + "px";
loadBox.style.marginTop = "-50px";
loadBox.style.color = "white";
loadBox.style.background = "#4b483d";
loadBox.style.fontFamily = "Courier New";
loadBox.style.borderRadius = "5px";
loadBox.setAttribute("type", "text");
loadBox.setAttribute("placeholder", "Sem vlož obsah uložených dát");

window.addEventListener("DOMContentLoaded",function() {document.body.appendChild(loadBox);});

// ------------------- DEFAULT SCENE
var defaultPlayerHealth = player.health;
var defaultPlayerDamage = player.abilities[0].damage;
btnDif.onClick= function(){
    if (difficulty == "Hard") {
        // Zmena na easy
        player.setStartHealth(defaultPlayerHealth * 2);
        player.abilities[0].damage = defaultPlayerDamage * 2;
        difficulty = "Easy";
    } else {
        // Zmena na hard
        player.setStartHealth(defaultPlayerHealth);
        player.abilities[0].damage = defaultPlayerDamage;
        difficulty = "Hard";
    }
    btnDif.text = difficulty;
    console.log("Difficulty changed!");
};
switchToScene(menu);
// switchToScene(duel);
// duel.switchChamber(3,0);