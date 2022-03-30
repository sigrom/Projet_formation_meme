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
       //modif X
      var attrib= svgtextNode.attributes['x'];
      attrib.value=meme.x;
       //modif  Y ss décomposition
       svgtextNode.attributes['y'].value=meme.y;

        //modif font-weight font-size
       svgtextNode.attributes['font-size'].value=meme.fontSize;
       svgtextNode.style['font-weight'].value=meme.fontWeight;
       //modif fill
       svgtextNode.attributes['fill'].value=meme.color;
        //remplissage conditionnel avec test ternaire if else
        svgtextNode.style.fontStyle=(meme.italic ? 'italic' : 'normale)');
        svgtextNode.style.texDecoration=(meme.underline ? 'underline' : 'none)');


  }      