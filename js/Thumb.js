function initThumbnailView(wrapperNode) {
    //appel xhr mais avec promise ES6
    fetch(location.origin+'/views/meme-thumbnail.html')
        .then(f=>{
            return  f.text();
        })
        .then(resp=>{
            var domparser=new DOMParser();
            var doc=domparser.parseFromString(resp, 'text/html');
            let wrapperChildren=wrapperNode.querySelectorAll('*');
            if(undefined!==wrapperChildren){
                wrapperChildren.forEach(e=>{e.remove()});
            }
            wrapperNode.appendChild(doc.querySelector('#meme-thumbnail'))
            loadGlobalesMemes(fillMemeThumbnail);
        });
}



/**
 * fonction de remplissage 
 * @param {Array<Meme>} memes
 */
function FillMemeRumbnail (memes,nodeToFill) {
    if (undefined===nodeToFill){
        nodeToFill= document.querySelector("#meme-Thumbmail")
    }
    
    var ulnode = document.createElement('ul');
    memes.forEach(function (e,i) {
        var liNode = document.createElement('li');
        //liNode.innerHTML=e.id+' : '+ e.name;
        var aNode = document.createElement('a');
        aNode.href="#";
        aNode.innerHTML=e.id+' : '+ e.name;
        aNode.addEventListener('click',function(evt) {
            //stop du comportement par def
            evt.preventDefault();
            // surcharge de l'url sans reaload de page
            history.pushState('','','/edit/memes/'+e.id)

            //selection  global du meme
            unMemeGlogal=e;
            // affichage du meme selectionné + remplissage des inputs
            setvalueinform(e);
            SetMemeOnSVG(e);   
        })
        liNode.appendChild(aNode);
        ulnode.appendChild(liNode);
     })
    nodeToFill.querySelector('ul').remove();
    nodeToFill.appendChild(ulnode);
}
//loadlistMeme(FillMemeRumbnail);