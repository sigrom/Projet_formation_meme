/**
 * affiche le meme en parm dans le viewer svg
 * @param {Meme} meme un meme instancier def. demo meme si undefined
 */
 function setMemeOnSVGViewer(meme) {
    //gestion d'un valeur par default
    if (undefined === meme) {
        meme = new Meme();
        meme.setDummyValues();
    }
    //selection du noeud text enfant de svg
    var svgTextNode = document.querySelector('svg>text');
    // moddif du contenu HTML de la balise 
    svgTextNode.innerHTML = meme.text;

    // x avec decomposition 
    var attrib = svgTextNode.attributes['x'];
    attrib.value = meme.x;

    //y sans decomposition
    svgTextNode.attributes['y'].value = meme.y;

    //moddif d'une valeur dans l'attribut style (pour le css enligne)
    svgTextNode.style.fontWeight = meme.fontWeight;

    //fontSize
    svgTextNode.attributes['font-size'].value = meme.fontSize;

    //fill
    svgTextNode.attributes['fill'].value = meme.color;

    //remplissage contionnel avec test ternaire (if et else)
    svgTextNode.style.fontStyle = (meme.italic ? 'italic' : 'normal');

    //remplissage contionnel avec test ternaire (if et else)
    svgTextNode.style.textDecoration = (meme.underline ? 'underline' : 'none');

    //gestion de correlation de l'id d'image avec un objet d'image comprenant l'id le chemin et la dimension
    var img=listeGlobalImages.find(function(element){
                return meme.imageId===element.id;
    });
    //pas d'image trouvé
    if(undefined!==img){
        var svgNode=document.querySelector('svg');
        svgNode.setAttribute('viewBox','0 0 '+img.w+' '+img.h)
        //mise a jour de lement svg image 
        var svgImg=svgNode.querySelector('image');
        svgImg.setAttribute('xlink:href','/img/'+img.href);
    }
    else{
        var svgNode=document.querySelector('svg');
        svgNode.setAttribute('viewBox','0 0 500 500')
        //mise a jour de lement svg image 
        var svgImg=svgNode.querySelector('image');
        svgImg.setAttribute('xlink:href','');    
    }
}
/**
 * init tous les events sur les inputs du form
 */
function initForm() {
    document
        .forms["meme-form"]["meme-text"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.text=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-name"]
        .addEventListener('change', function (evt) {
                unMemeGlobal.name=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-x"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.x=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-y"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.y=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-fontWeight"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.fontWeight=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-fontSize"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.fontSize=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });

        document
        .forms["meme-form"]["meme-underline"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.underline=evt.target.checked;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-italic"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.italic=evt.target.checked;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-color"]
        .addEventListener('input', function (evt) {
                unMemeGlobal.color=evt.target.value;
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document
        .forms["meme-form"]["meme-image"]
        .addEventListener('change',function(evt){
                unMemeGlobal.imageId=parseInt(evt.target.value);
                setMemeOnSVGViewer(unMemeGlobal);
        });
        document.forms["meme-form"].addEventListener('submit',function(evt){
                evt.preventDefault();
                (new CRUD('http://localhost:5679'))
                        .post('/memes',
                                function(response){
                                        alert('c\'est enregistrer ...bonne soiree a demain')
                                },
                                unMemeGlobal,
                                'application/json'
                        );
        })

        setMemeValuesInFormInputs(unMemeGlobal);
      // loadGlobalesImages(loadSelectWithImages);
}
/**
 * set meme values in all inputs 
 * @param {Meme} meme 
 */
function setMemeValuesInFormInputs(meme) {
    if(undefined===meme){return;}
    var form=document.forms["meme-form"];
    form["meme-name"].value=meme.name;
    form["meme-text"].value=meme.text;
    form["meme-x"].value=meme.x;
    form["meme-y"].value=meme.y;
    form["meme-fontWeight"].value=meme.fontWeight;
    form["meme-fontSize"].value=meme.fontSize;
    form["meme-underline"].checked=meme.underline;
    form["meme-italic"].checked=meme.italic;
    form["meme-color"].value=meme.color;
    setMemeOnSVGViewer(meme);
}

/**
 * remplissage DOM du select option avec une liste d'image
 * @param {Array} images 
 */
 function loadSelectWithImages(images) {
        var select=document.forms["meme-form"]["meme-image"];
        /*for(var i=0;i<images.length;i++){
            //cree un option

            //ajoute le option au select
        }*/
         images.forEach(function(unObjetDuTableau,positionDeLelement)
         {
            //select.innerHTML=select.innerHTML+'<option value="'+unObjetDuTableau.id+'">'+unObjetDuTableau.name+'</option>'
            //cree un option
            var opt=document.createElement('option');
            opt.value=unObjetDuTableau.id;
            opt.innerHTML=unObjetDuTableau.name;
            //ajoute le option au select
            select.appendChild(opt);
         })
}
function initMemeCreatorView(wrapperNode,id) {
    //appel xhr mais avec promise ES6
    const promiseCreator=fetch(location.origin+'/views/meme-creator.html')
    //1ere etape de reception -> transformation du flux recu en text
        .then(f=>{
            return  f.text();
        });
        //deuxieme ressources
  const promiseViewer=fetch(location.origin+'/views/meme-svg-viewer.html').then(f=>{return  f.text();});


//reception rest par promise avec template string pour ladresse
const promiseImages=fetch(`${ADR_REST_SRV}/images`)
      .then(f=>{
          return  f.json();
      });

Promise.all([promiseCreator,promiseViewer,promiseImages])
        .then(resp=>{
            console.log(resp);
            //creation d'un parser pour un DOM html
            var domparser=new DOMParser();
            // creation dun document DOM constitué dans le body de la chaine HTML recu par le fetch
            var doc=domparser.parseFromString(resp[0], 'text/html');
            //je cherche les enfants existant dans la section que je remplirai dans la page qui est a l'ecran
            let wrapperChildren=wrapperNode.querySelectorAll('*');
            //si il y a des enfants
            if(undefined!==wrapperChildren){
                //pour chaque enfant je demande leur suppression de la page affiché pour vider le wrapper
                wrapperChildren.forEach(e=>{e.remove()});
            }
            //jajoute dans le conteneur de la page à l'ecran le contenu sous forme de Node(document) HTML 
            wrapperNode.appendChild(doc.querySelector('#main_creator'))


            //partie 2 
            // ajout du svg viewer dans le creator
            var docSvg=domparser.parseFromString(resp[1], 'text/html');
            wrapperNode.querySelector('#main_viewer').appendChild(docSvg.querySelector('svg'));
           

            //partie 3 les datas du rest (imlages)
           listeGlobalImages=resp[2];
//selection du meme
           unMemeGlobal=new Meme();

//initialisation de la fenetre avec les valeurs
           initForm();
           loadSelectWithImages(listeGlobalImages);
          // setMemeValuesInFormInputs(unMemeGlobal);
           setMemeOnSVGViewer(unMemeGlobal); 
        })
}
