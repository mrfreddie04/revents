import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onSnapshot } from '@firebase/firestore';
import { dataFromSnapshot } from "../firestore/firebase-db-service";
import { asyncActions } from '../async/async-reducer';
//import { delay } from '../common/util/util';

const { asyncActionStart, asyncActionFinish, asyncActionError} = asyncActions;

export function useFirestoreDoc({query, data, deps, shouldExecute = true}) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    //check if we need to fetch data
    if(!shouldExecute) return;
    
    //console.log("FD", query);

    dispatch(asyncActionStart());
    const unsub = onSnapshot( query(), {
      next: (snapshot) => {
        if(!snapshot.exists) {
          dispatch(asyncActionError({code: "not_found", message: "Couldn't not find document"}));
          return;
        }
        data(dataFromSnapshot(snapshot));
        //await delay(1000);
        dispatch(asyncActionFinish());        
      },
      error: (err) => dispatch(asyncActionError(err)),
      complete: () => console.log('You will never see this message')
    }); 
    
    return unsub;
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps

}