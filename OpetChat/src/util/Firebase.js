const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            apiKey: "AIzaSyDiItiQbDmUAntvJ9FSM6_P6HsvUoQHkDk",
            authDomain: "chatwpp-clone.firebaseapp.com",
            projectId: "chatwpp-clone",
            storageBucket: "gs://chatwpp-clone.appspot.com",
            messagingSenderId: "240822716803",
            appId: "1:240822716803:web:cb33944546f9719f09ceb6",
            measurementId: "G-1HPJ22P74Z"
          };



        this.init();
    }

    init(){
        if(!window._initializedFirebase){
            
            firebase.initializeApp(this._config); 

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
     
            window.initializedFirebase = true;
        }
    }

    static db(){
        return firebase.firestore();

    }

    static hd(){
        return firebase.storage();
    }


    initAuth(){

        return new Promise ((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    
                    user, 
                    token 
                
                });
                
            })
            .catch(err=>{
               f(err) 
            });
        });
    }
}

