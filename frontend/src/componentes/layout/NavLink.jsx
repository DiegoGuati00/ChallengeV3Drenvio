import { NavLink as NavLinkReactRouter}  from "react-router-dom";




const NavLink = ({to, children, active, Myclass, ...props}) => {
    return (
        <NavLinkReactRouter
        className={({isActive})=>{
            return isActive ? active +' '+ Myclass: Myclass 
        }}
        to={to}
        >{children}
        </NavLinkReactRouter>
    );
}

export default NavLink;