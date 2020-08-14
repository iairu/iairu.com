
// CONTROLLER

setInterval(function(){
    tick++;
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    if (activeScene == undefined) {return;}
    activeScene.audioOnSwitch();
    activeScene.musicLoop();
    activeScene.contents.forEach(o => {
    if (o !== undefined) {
        switch(o.constructor.name) { 
        case "Player":
            o.manipulation();
            if (o.isJumping) o.jump();
            if (o.isMoving) o.move();
        case "Enemy":
        case "Entity":
            // draw.placeholder(
            //     o.x + o.collision.x,
            //     o.y + o.collision.y,
            //     o.collision.w,o.collision.h);
            if (o.isMoving) {
                o.sprites[o.currentSprites].forEach(sprite => {
                    sprite.animateX();
                    sprite.animateY();
                    draw.sprite(sprite,sprite.x_base,sprite.y_base,o.x,o.y);
                });
            }
            else {
                o.sprites[o.currentSprites].forEach(sprite => {
                    sprite.animateReset();
                    draw.sprite(sprite,sprite.x_base,sprite.y_base,o.x,o.y);
                });
            }
            o.recalcCollision();

            // ABILITY

            var a, e = undefined;
            for(i in o.abilities) {
                a = o.abilities[i];
                if (a.wasTriggered) {
                    if (!a.hasStarted) {
                        a.start();
                        a.onActivate();
                    }
                    e = a.checkCollision();
                    if (!a.hasCollided) {
                        a.whileActive();
                    } else {
                        a.onCollision();
                        a.reset();
                    }
                    if (e !== undefined &&
                        activeScene.contents[e].health < 1) // Odstrani enemy po hitnuti
                        {
                            activeScene.contents[e].death();
                            activeScene.contents.splice(e,1);
                        }
                    if (a.sprites.length > 0) {
                        a.sprites.forEach(sprite => {
                            // draw.placeholder(a.x,a.y,a.width,a.height);
                            draw.image(a.x,a.y,a.width,a.height,sprite);
                        });
                    } else {
                        draw.placeholder(a.x,a.y,a.width,a.height);
                    }
                }
                if (a.freq !== undefined && a.nextFire !== undefined) {
                    if (a.nextFire < tick.valueOf()) {
                        a.nextFire = a.freq + tick.valueOf();
                        a.triggerCount++;
                        if (a.triggerCount > 1) {
                            a.wasTriggered = true;
                        }
                    }
                }
            }
            
            // HEALTH BARY

            draw.placeholder(
                o.healthBar.x,
                o.healthBar.y,
                o.healthBar.wStart / o.startHealth * o.health,
                o.healthBar.h,
                o.healthBar.color);
                
                    
            break;
        case "Button":
            if (o.isActivated) {
                o.isActivated = 0;
                o.click()
            }
            if (o.bg !== undefined) {
                draw.image(o.x,o.y,o.bg.width,o.bg.height,(o.isSelected) ? o.bgHover : o.bg);
            }
            if (o.icon !== undefined) {
                draw.image(o.x,o.y,o.icon.width,o.icon.height,(o.isSelected) ? o.iconHover : o.icon);
            }
            draw.label(o.lx,o.ly,o.text,o.size,o.font,o.color);
            break;
        case "Label":
            draw.label(o.x,o.y,o.text,o.size,o.font,o.color);
            break;
        case "Background":
            draw.image(o.x,o.y,o.width,o.height,o);
            break;
        case "Video":
            if (o.hasEnded()) {
                o.isPlaying = false;
                o.onStop();
            }
            else if (o.isPlaying) {
                o.audioUserMuteSync();
                draw.image(o.x,o.y,o.width,o.height,o.video);
            }
            break;
        }
    }
    });
},1000/60);

canvas.onmouseup = mouseup;
canvas.onmousedown = mousedown;
canvas.onmousemove = mousemove;

function mouseup(e) {
    mouse.pressed = false;

    // zrušenie isSelected a mouse.selected, aktivovanie objektu isActivated
    if (mouse.selected !== false) {
        var object = mouse.selected;
        object.isSelected = 0;
        if (object.isActivated !== undefined &&
            object.x < mouse.x && object.x + object.width > mouse.x &&
            object.y < mouse.y && object.y + object.height > mouse.y) {
                object.isActivated = 1; // zmen na object.activate();
            }
    }
    mouse.selected = false;
}
function mousedown(e) {
    mouse.pressed = true;

    // priradenie isSelected a mouse.selected pre objekt pod myšou, pokiaľ
    // objekt priradenie podporuje (object.isSelected !== undefined)
    //for(i=activeScene.contents.length-1;i>=0;i--) {
    for(i=0;i<activeScene.contents.length;i++) {
        var object = activeScene.contents[i];
        //var object = player.sprites[0];
        if (object.isSelected !== undefined ||  // TODO: potom vyhod druhu moznost, isSelected musi existovat vzdy dopredu
            object.isMovable !== undefined) {
            if (object.x < mouse.x && object.x + object.width > mouse.x &&
                object.y < mouse.y && object.y + object.height > mouse.y) {
                    object.isSelected = 1; // TODO: zmen na object.select(); // TODO: daj na hover nie na mousedown, aby sa cudliky pekne vysvietili hned po nadideni
                    mouse.selected = object;
                    mouse.localOffsetLeft = mouse.selected.x - mouse.x;
                    mouse.localOffsetTop = mouse.selected.y - mouse.y;
                }
        }
    }
}
function mousemove(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;

    if (mouse.selected !== false) {
        // zrušenie/znovunasadenie isSelected počas ťahania stlačenej myši
        var object = mouse.selected;
        if (object.x < mouse.x && object.x + object.width > mouse.x &&
            object.y < mouse.y && object.y + object.height > mouse.y) {
            object.isSelected = 1;
        }
        else {
            object.isSelected = 0; // TODO: zmen na object.deselect();
        }
        // pohyb ak je vybraný objekt pohyblivý
        if (mouse.selected.isMovable == 1 &&
            mouse.selected.moveTo !== undefined &&
            mouse.selected.isMovableKey == undefined ||
            mouse.selected.isMovableKey !== undefined &&
            pressedkey == mouse.selected.isMovableKey.toUpperCase() ||
            mouse.selected.isMovableKey !== undefined &&
            pressedkey == mouse.selected.isMovableKey.toLowerCase()) {

                mouse.selected.moveTo(
                    mouse.x + mouse.localOffsetLeft, mouse.y + mouse.localOffsetTop
                );

            }
        }
    }

window.addEventListener("keydown",function(e) {
    if (activeScene.constructor.name == "Duel") { // TODO: responzivnejsi system na zmenu smerov pre smoother motion
        if (e.key == "A" || e.key == "a" || e.keyCode == 37) {player.direction("left")} // TODO: zmen na metodu a pridaj do nej animationReset bez doanimovania (aby sa mu nerozletelo telo lol)
        if (e.key == "D" || e.key == "d" || e.keyCode == 39) {player.direction("right")}
        if (e.key == "W" || e.key == "w" || e.keyCode == 38) {player.direction("up")}
        if (e.key == "S" || e.key == "s" || e.keyCode == 40) {player.direction("down")}
    }
    if (e.keyCode == 27) {activeScene.onEscape()}
    if (e.keyCode == 32) {activeScene.onSpace()}
    if (e.keyCode == 13) {activeScene.onEnter()}
    pressedkey = e.key;
})

window.addEventListener("keyup",function(e) {
    if (activeScene.constructor.name == "Duel") {
        if (e.key == "Q" || e.key == "q" || e.keyCode == 81) {activeScene.onTrigger("Q")}
        if (e.key == "E" || e.key == "e" || e.keyCode == 69) {activeScene.onTrigger("E")}
        if (e.key == "F" || e.key == "f" || e.keyCode == 70) {activeScene.onTrigger("F")}
        if (e.key == "R" || e.key == "r" || e.keyCode == 82) {activeScene.onTrigger("R")}
    }
    player.directionReset();
    pressedkey = "";
})