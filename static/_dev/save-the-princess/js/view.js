
// VIEW

var draw = {
    placeholder(x,y,width,height,fill="black",stroke="gray") {
        ctx.beginPath();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.fill();
    },
    label(x,y,text,size,font,color) {
        ctx.font = size + "pt " + font;
        ctx.fillStyle = color;
        ctx.fillText(text,x,y + size);
    },
    image(x,y,width,height,image) {
        ctx.drawImage(image,x,y,width,height);
    },
    sprite(sprite,spriteX,spriteY,parentX,parentY) {
        ctx.drawImage(sprite,parentX + spriteX,parentY + spriteY);
    }
}