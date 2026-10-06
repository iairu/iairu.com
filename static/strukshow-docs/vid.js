document.querySelectorAll("video").forEach(function(video){
    let src = video.getAttribute("src");
    video.setAttribute("src","/posts/strukshow-docs/" + src);
    video.setAttribute("style","max-width:100%;");
})