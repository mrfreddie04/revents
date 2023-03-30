import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseObjectToArray } from "../firestore/firebase-realtime-service";
import { asyncActions } from '../async/async-reducer';

const { /*asyncActionStart, asyncActionFinish,*/ asyncActionError} = asyncActions;

export function useFirebaseCollection({ref, data, deps, dispose, shouldExecute = true}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!shouldExecute) return;  

    //dispatch(asyncActionStart());
    ref().on('value',
      (snapshot) => {
        if(!snapshot || !snapshot.exists()) return;
        const docs = firebaseObjectToArray(snapshot)
        data(docs);
        //dispatch(asyncActionFinish());        
      },
      (err) => dispatch(asyncActionError(err)),
    ); 
    
    return () => {
      if(dispose) dispose();
      ref().off();
    };  
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
