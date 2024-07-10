import {useEffect,useRef} from 'react';
import { createPortal } from 'react-dom';

const Modal= ({children})=>{
    const elRef=useRef(null);//ref-when we need same thing (div here) back everytime
    if(!elRef.current){//we need same div on every re render on dom
        elRef.current=document.createElement('div');
    }
    useEffect(()=>{
        const modalRoot=document.getElementById("modal");
        modalRoot.appendChild(elRef.current);
        return ()=>modalRoot.removeChild(elRef.current);
    },[]);
    return createPortal(<div>{children}</div>,elRef.current)
};
export default Modal;
//here this is for are you sure you wanna adopt pop yup
//after clicking adopt
//we want this on top of all 
//modal allow you to render on topn from a different place
//but we also need to dispose off the are you sure modal or whatever
//in class component we do component Unmount
//in function  component we do this
//return ()=>modalRoot.removeChild(elRef.current);
//like this we can remove event listeners, and remove timers by setTimeout