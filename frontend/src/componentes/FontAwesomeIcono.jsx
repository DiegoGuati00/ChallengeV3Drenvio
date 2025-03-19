import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { 
    faAddressBook,
    faPen,
    faEye,
    faCopy,
    faQrcode,
    faUser, 
    faFileExcel,
    faFileSignature,
    faUsers,
    faUserPlus,
    faUsersGear,
    faUserPen,
    faColumns,
    faCirclePlus,
    faTrashCan,
    faListCheck,
    faClipboardList,
    faFileInvoiceDollar,
    faFileContract,
    faHouseChimney,
    faChartGantt,
    faGroupArrowsRotate,
    faLayerGroup,
    faFolderPlus,
    faMasksTheater,
    faPeopleRoof,
    faBuilding,
    faTableList,
    faGlobe,
    faCircleExclamation,
    faRepeat,
    faClock,
    faUserClock,
    faFilePdf,
    faBars,
    faMoneyBill,
    faGear,
    faList,
    faBoxTissue,
    faBuildingCircleArrowRight,
    faClipboard,
    faRightToBracket,
    faRightFromBracket,
    faSignature,
    faCheck,
    faMagnifyingGlass,
    faHouse,
    faImage,
    faCaretRight,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'
const iconos = {
    faUserPlus:faUserPlus,
    faUser:faUser,
    faUserPen,
    faFileExcel,
    faFileSignature,
    faUsers,
    faPen,
    faEye,
    faQrcode,
    faCopy,
    faColumns,
    faCirclePlus,
    faTrashCan,
    faListCheck,
    faClipboardList,
    faFileInvoiceDollar,
    faFileContract,
    faHouseChimney,
    faAddressBook,
    faChartGantt,
    faGroupArrowsRotate,
    faLayerGroup,
    faFolderPlus,
    faMasksTheater,
    faPeopleRoof,
    faUsersGear,
    faBuilding,
    faTableList,
    faGlobe,
    faCircleExclamation,
    faRepeat,
    faClock,
    faUserClock,
    faFilePdf,
    faBars,
    faMoneyBill,
    faGear,
    faList,
    faSignature,
    faBoxTissue,
    faBuildingCircleArrowRight,
    faClipboard,
    faRightToBracket,
    faRightFromBracket,
    faCheck,
    faMagnifyingGlass,
    faHouse,
    faImage,
    faCaretRight,
    faCaretDown
}
const FontAwesomeIcono = (props) => {
    let{icon=null,iconName=null}=props;
    // useEffect(() => {
    //     if(iconName){
    //         icon = iconos[iconName]
    //     }
    // }, []);
    // console.log(iconName?iconos[iconName]:"h")
    // console.log(iconName?iconos[iconName]:icon)
    if(iconName && iconos[iconName]){
        return (
                <FontAwesomeIcon
                 icon={iconos[iconName]}
                 />
        );
    }
    if(icon){
        return (
                <FontAwesomeIcon
                 icon={icon}
                 />
        );
    }
    return null;
}

export default FontAwesomeIcono;
