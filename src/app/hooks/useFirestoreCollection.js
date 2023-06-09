import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onSnapshot } from '@firebase/firestore';
import { dataFromSnapshot } from "../firestore/firebase-db-service";
import { asyncActions } from '../async/async-reducer';

const { asyncActionStart, asyncActionFinish, asyncActionError} = asyncActions;

export function useFirestoreCollection({query, data, deps, shouldExecute = true }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!shouldExecute) return;  
      
    dispatch(asyncActionStart());
    
    //console.log("FC", query);

    const unsub = onSnapshot(query(), {
      next: (snapshot) => {
        const docs = snapshot.docs.map( doc => dataFromSnapshot(doc));
        //console.log(docs);
        data(docs);
        dispatch(asyncActionFinish());        
      },
      error: (err) => dispatch(asyncActionError(err)),
      complete: () => console.log('You will never see this message')
    }); 
    
    return unsub;
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps

}