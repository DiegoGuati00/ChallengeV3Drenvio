import React, { createContext } from 'react';
import { 
    reImg1,
    reImg2,
    reImg3,
    reImg4,
    reImg5,
} from '../Resources/resources';

const ImgContex = createContext();
const ImgProvider = ({children}) => {
    let data = {
        reImg1,
        reImg2,
        reImg3,
        reImg4,
        reImg5,
    }

    return (<ImgContex.Provider value={data}>{children}</ImgContex.Provider>
    );
}
export {ImgProvider}
export default ImgContex;
