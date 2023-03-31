import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onValue, off } from '@firebase/database';
import { firebaseObjectToArray } from "../firestore/firebase-realtime-service";
import { asyncActions } from '../async/async-reducer';

const { /*asyncActionStart, asyncActionFinish,*/ asyncActionError} = asyncActions;

export function useFirebaseCollection({ref, data, deps, dispose, shouldExecute = true}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!shouldExecute) return;  

    //dispatch(asyncActionStart());
    onValue(ref(),
      (snapshot) => {
        if(!snapshot || !snapshot.exists()) return;
        const docs = firebaseObjectToArray(snapshot.val());
        data(docs);
        //dispatch(asyncActionFinish());        
      },
      (err) => dispatch(asyncActionError(err)),
    ); 
    
    return () => {
      if(dispose) dispose();
      off(ref());
    };  
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
