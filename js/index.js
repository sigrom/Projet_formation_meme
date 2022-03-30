/**
 * 
 * fonction JS
 */
function chargementPage() {
    var balisejs = document.querySelector("#test");
    balisejs.innerHTML="JS Chargé";
    balisejs.style.backgroundColor="cadetblue";
    balisejs.className="apres" 
}

document.addEventListener('DOMContentLoaded',chargementPage)

function SetMemeOnSVG(meme){
    if (undefined === meme) {
        meme= new Meme();
        meme.setdummy();
      }
      // selection du noeud
      var svgtextNode = document.querySelector('svg text');
      //modif du contenu html
      svgtextNode.innerHTML= meme.texte;
  }      