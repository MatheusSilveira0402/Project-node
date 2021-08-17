import { Firebase } from './../util/Firebase';
import { Model } from "./Model";

export class Chat extends Model{


    constructor(){
        super();
    }

    get users() { this._data.users;}
    set users(value) {this._data.users = value; }
    
    get timeStamp() {this._data.timeStamp; }
    set timeStamp(value) {this._data.timeStamp = value; }
    //metodo para conectar no banco do firebase
    static getRef(){

        return Firebase.db().collection('/chats');
    }
    //metedo para criar um chat 
    static create(meEmail, contactEmail){

        return new Promise((s, f)=>{

            let users = {};

            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc =>{

                Chat.getRef().doc(doc.id).get().then(chat =>{

                    s(chat);

                }).catch(err=>{f(err)});

            }).catch(err=>{f(err)});

        });

    }
    //metedo para verificar se ja existe um chat
    static find(meEmail, contactEmail){

        return Chat.getRef()
            .where(btoa(meEmail), '==', true)
            .where(btoa(contactEmail), '==', true)
            .get();
        }   
    
    //função para verrificar se existe o chat ja criado, sẽo não criar o mesmo.
    static createIfNotExists(meEmail, contactEmail){

        return new Promise((s, f)=> {

            Chat.find(meEmail, contactEmail).then(chats => {

                if(chats.empty){

                    Chat.create(meEmail, contactEmail).then(chat =>{
                        
                        s(chat);
                    
                    });

                } else {

                    chats.forEach(chat => {
                        s(chat);
                    });
                }

            }).catch(err=> {f(err)});

        });

    }

}