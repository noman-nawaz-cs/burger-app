import React, {Component} from "react";
import './Layout.scss';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return(
            <>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                <main className= 'content'>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout;