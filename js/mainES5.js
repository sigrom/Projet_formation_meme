/**
 * construction Objet Meme
 */
function Meme() {
        this.id = undefined;
        this.name = '';
        this.texte = '';
        this.x = 100;
        this.y = 100;
        this.fontSize = 12;
        this.fontWeight = '900';
        this.underline = false;
        this.italic = false;
        this.color = '#000';
        this.imageId = 1
        //'Futurama-6.jpg';
        console.log(this)

        /**Set Value */
        this.SetDummy = function () {
                this.name = 'Dummy Demo Name';
                this.texte = 'Hello';
                this.x = 50;
                this.y = 200;
                this.fontSize = 50;
                this.fontWeight = '100';
                this.underline = true;
                this.italic = true;
                this.color = '#AFBC09';
                this.imageId = 2
                //'Futurama-6.jpg';
        }
}
// l'objet ne peux pas bouger
var unMemeGlogal = Object.seal(new Meme());

unMemeGlogal.SetDummy();

var listGlobalimage = [];
function loadglobalesImages(callback) {
        var CallerHttp = new CRUD('http://localhost:5679');
        CallerHttp.get('/images', function (reponse) {
                listGlobalimage = JSON.parse(reponse);
                callback(listGlobalimage)
        })
}
var listMeme = [];
function loadlistMeme(clbk) {
        var CallerHttp = new CRUD('http://localhost:5679');
        CallerHttp.get('/memes', function (reponse) {
                listMeme = JSON.parse(reponse);
                clbk(listMeme)
        })
}


