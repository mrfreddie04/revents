import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from "../firestore/firebase-db-service";
import { asyncActions } from '../async/async-reducer';

const { asyncActionStart, asyncActionFinish, asyncActionError} = asyncActions;

export function useFirestoreCollection({query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsub = query().onSnapshot({
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