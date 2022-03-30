/**
 * construction Objet Meme
 */
function Meme() {
        this.id=undefined;
        this.name='';
        this.texte='';
        this.x=0;
        this.y=0;
        this.fontSize=12;
        this.fontWeight='900'; 
        this.underline=false;
        this.italic=false;
        this.color='#000';
        this.image='Futurama-6.jpg';
        console.log(this)

/**Set Value */
        this.SetDummy=function () {
            this.name='Dummy Demo Name';
            this.texte='Hello';
            this.x=50;
            this.y=50;
            this.fontSize=20;
            this.fontWeight='100'; 
            this.underline=true;
            this.italic=true;
            this.color='cadetblue';
            this.image='Futurama-6.jpg';
        }
}
// l'objet ne peux pas bouger
var unMemeGlogal = Object.seal(new Meme());

