/**
 * 
 * fonction JS
 */
function chargementPage() {
    var balisejs = document.querySelector("#test");
    balisejs.innerHTML = "JS Chargé";
    balisejs.style.backgroundColor = "cadetblue";
    balisejs.className = "apres";
    intitformevent();
}

document.addEventListener('DOMContentLoaded', chargementPage)

function SetMemeOnSVG(meme) {
    if (undefined === meme) {
        meme = new Meme();
        meme.setdummy();
    }
    // selection du noeud
    var svgtextNode = document.querySelector('svg text');
    //modif du contenu html
    svgtextNode.innerHTML = meme.texte;
    //modif X
    var attrib = svgtextNode.attributes['x'];
    attrib.value = meme.x;
    //modif  Y ss décomposition
    svgtextNode.attributes['y'].value = meme.y;

    //modif font-weight font-size
    svgtextNode.attributes['font-size'].value = meme.fontSize;
    svgtextNode.style['font-weight'].value = meme.fontWeight;
    //modif fill
    svgtextNode.attributes['fill'].value = meme.color;
    //remplissage conditionnel avec test ternaire if else
    svgtextNode.style.fontStyle = (meme.italic ? 'italic' : 'normal');
    svgtextNode.style.textDecoration = (meme.underline ? 'underline' : 'none');


}


function intitformevent() {
    document
        .querySelector("#meme-text")
        .addEventListener('input', function (evt) {
            unMemeGlogal.texte = evt.target.value;
            SetMemeOnSVG(unMemeGlogal)

        });

    document
        .querySelector("#meme-size")
        .addEventListener('input', function (evt) {
            unMemeGlogal.fontSize = evt.target.value;
            SetMemeOnSVG(unMemeGlogal)
        });

    document
        .querySelector("#meme-weight")
        .addEventListener('input', function (evt) {
            unMemeGlogal.fontWeight = evt.target.value;
            SetMemeOnSVG(unMemeGlogal)
        });
    document
        .querySelector("#meme-name")
        .addEventListener('input', function (evt) {
            unMemeGlogal.name = evt.target.value;
            SetMemeOnSVG(unMemeGlogal)
        });

    document
        .querySelector("#meme-under")
        .addEventListener('change', function (evt) {
            unMemeGlogal.underline = evt.target.checked;
            SetMemeOnSVG(unMemeGlogal)
        });

    document
        .querySelector("#meme-ita")
        .addEventListener('change', function (evt) {
            unMemeGlogal.italic = evt.target.checked;
            SetMemeOnSVG(unMemeGlogal)
        });

    document
        .querySelector("#meme-color")
        .addEventListener('input', function (evt) {
            unMemeGlogal.color = evt.target.value;
            SetMemeOnSVG(unMemeGlogal)
        });
        setvalueinform (unMemeGlogal);
}
function setvalueinform(meme) {
    if (undefined === meme) { return }
    var form = document.forms["meme-form"];
    form["meme-name"].value = meme.name;
    form["meme-text"].value = meme.texte;
    form["meme-X"].value = meme.x;
    form["meme-Y"].value = meme.y;
    form["meme-size"].value = meme.fontSize;
    form["meme-weight"].value = meme.fontWeight;
    form["meme-under"].checked = meme.underline;
    form["meme-ita"].checked = meme.italic;
    form["meme-color"].value = meme.color;
    SetMemeOnSVG(meme);
}
