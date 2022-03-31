function CRUD(restAdr) {
    this.callXHR=function (resourceUrl,successcallback,methode,id,body,contentType,unsuccesscallback) {
        if(undefined === resourceUrl) {
            console.log('%c%s','color:red;font-weight:900;font-size;20pt','callXHR ressourceName not given')
            return;
        }
        if (undefined === methode) {
            // gestion d'une methode
            methode='GET';
        }
        //instancaition d'un objet
        var xhr= new XMLHttpRequest()
        //preparation de l'objet
        var fullUrl=restAdr+resourceUrl
        if (undefined !== id) {fullUrl+='/'+id;}
        xhr.open(methode,fullUrl)


        //falcutatif.. gestion des entete
        if (undefined !== contentType) {xhr.setRequestHeader("Content-Type",contentType);}
        
        // gestion de levent de changement
        xhr.onreadystatechange=function (evt) {
            if (xhr.readyState<XMLHttpRequest.DONE) {return;}
            // echapement sans gestion des erreurs
            if (xhr.status>=400) {
                if (undefined !== unsuccesscallback && typeof(unsuccesscallback)==='function')
                unsuccesscallback(xhr);
            }
            return;
        }
        // send request
        if(typeof(body)==='object'){
            body=JSON.stringify(body);
        }
        xhr.send(body);
        console.log('SENT ' +methode+' ' + fullUrl);
        
        this.get=function(resourceUrl,successcallback,id,unsuccesscallback){
            this.callXHR(resourceUrl,successcallback,'GET',id,undefined,undefined,unsuccesscallback);
        }
        this.post=function(resourceUrl,successcallback,id,unsuccesscallback){
            this.callXHR(resourceUrl,successcallback,'POST',id,undefined,undefined,unsuccesscallback);
        }
        this.put=function(resourceUrl,successcallback,id,body,contentType,unsuccesscallback){
            this.callXHR(resourceUrl,successcallback,'PUT',id,body,contentType,unsuccesscallback);
        }
        this.patch=function(resourceUrl,successcallback,id,body,contentType,unsuccesscallback){
            this.callXHR(resourceUrl,successcallback,'PATCH',id,body,contentType,unsuccesscallback);
        }
        this.remove=function(resourceUrl,id,successcallback,unsuccesscallback){
            this.callXHR(resourceUrl,successcallback,'DELETE',id,undefined,undefined,unsuccesscallback);
        }
    }

}
//var httpCaller = new CRUD ('http://localhost:5679');
//httpCaller.get('/images',function(reponse){console.log(reponse)});

//var xhr= new CRUD('http://localhost:5679');
///xhr.callXHR('/images',function(){},'POST',undefined,{ch1:'hello'},'application/json');