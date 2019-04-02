import * as React from 'react';
import { elastic as Menu, Props } from "react-burger-menu";
import { FaBeer } from 'react-icons/fa';
import "src/common/components/sidebar/index.css";

// tslint:disable-next-line:no-empty-interface
export interface ISideBarProps extends Props {

}

// tslint:disable-next-line:no-empty-interface
export interface ISideBarState {

}

class SideBar extends React.Component<Props> {
    // public readonly props: Readonly<Props>;
    constructor(props: ISideBarProps) {
        super(props);

    }
    public render() {
        return ( // Pass on our props
            <Menu {...this.props} noOverlay>
                <a className="menu-item" href="/">
                    Home<FaBeer />
              </a>

                <a className="menu-item" href="/burgers">
                    Burgers
              </a>

                <a className="menu-item" href="/pizzas">
                    Pizzas
              </a>

                <a className="menu-item" href="/desserts">
                    Desserts
              </a>
            </Menu>);
    }
}

export default SideBar;