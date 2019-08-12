import React from 'react';
import firebase from '../firebase';

const NO_COLLECTION_PROVIDED_MESSAGE = `

    WITH_DATA_ACCESS_ERROR:
    No firestore collection was provided.
    You should explicitly pass target collection as argument or specify it in default options.
`

function noCollectionProvidedError(){
    throw new Error(NO_COLLECTION_PROVIDED_MESSAGE)
}


export function withDataAccess(WrappedComponent,{defaultCollection,withIds} = {}){

    return class extends React.Component {

        constructor(props){
            super(props);
            this.get = this.get.bind(this);
            this.connect = this.connect.bind(this);
            this.add = this.add.bind(this);
            this.remove = this.remove.bind(this);
            this.update = this.update.bind(this);
            this.replace = this.replace.bind(this);
        };

        get(specificCollection){
            return new Promise((resolve,reject) => {
                const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError(1,2);
                firebase.firestore().collection(targetCollection).get().then(snapshots => {
                    const items = [];
                    snapshots.forEach(snap => items.push(
                        withIds ? {...snap.data(), __id: snap.id} : snap.data()
                    ));
                    resolve(items);
                }).catch(err => reject(err));
            })
        }

        connect(callback,specificCollection){
            const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError();
            firebase.firestore().collection(targetCollection).onSnapshot(nextSnapshot => {
                const items = [];
                nextSnapshot.forEach(snap => items.push(
                    withIds ? {...snap.data(), __id: snap.id} : snap.data()
                ));
                callback(items);
            })
        }

        add(payload,specificCollection,specificId){
            const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError();
            return specificId ?
            firebase.firestore().collection(targetCollection).doc(specificId).set({...payload}) :
            firebase.firestore().collection(targetCollection).add({...payload});
        };

        remove(id,specificCollection){
            const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError();
            return firebase.firestore().collection(targetCollection).doc(id).delete();
        };

        update(id,payload,specificCollection){
            const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError();
            return firebase.firestore().collection(targetCollection).doc(id).update({...payload});
        };

        replace(id,payload,specificCollection){
            const targetCollection = specificCollection || defaultCollection || noCollectionProvidedError();
            return firebase.firestore().collection(targetCollection).doc(id).set({...payload})
        };

        render(){
            return (
                <WrappedComponent 
                {...this.props} 
                _get={this.get} 
                _connect={this.connect}
                _update={this.update} 
                _replace={this.replace} 
                _add={this.add} 
                _remove={this.remove} 
                />
            )
        }
    }
}