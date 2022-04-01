/**
 * 
 * fonction JS
 */
function chargementPage() {
    var balisejs = document.querySelector("#test");
    balisejs.innerHTML = "JS Chargé";
    balisejs.style.backgroundColor = "cadetblue";
    balisejs.className = "apres";
    //intitformevent();
}

document.addEventListener('DOMContentLoaded', chargementPage)


function manageRoutes() {
    const path = location.pathname;
    const regex = /\/?(?<path>(editor\/memes)|thumbnail)(\/(?<id>\d+))?/;
    let m = regex.exec(path);

    if (m === null) { home(); return; }
    switch (m.groups.path) {
            case 'thumbnail':
                    initThumbnailView(document.querySelector('#wrapper'));
                    break;
            case 'editor/memes':
                    initMemeCreatorView(document.querySelector('#wrapper'));
                    break;
    }
    console.log(m.groups.path);

}
function home() {

    document.querySelector('#wrapper').innerHTML = '<div><h1>Hello les petit bretons</h1></div>'

}