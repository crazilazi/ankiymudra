import * as React from 'react';
import { elastic as Menu, Props } from "react-burger-menu";
import { FiRefreshCw } from 'react-icons/fi';
import Button from 'reactstrap/lib/Button';
import "src/common/components/sidebar/index.css";

// tslint:disable-next-line:no-empty-interface
export interface ISideBarProps extends Props {
    refreshClick(event: any): void;
}

// tslint:disable-next-line:no-empty-interface
export interface ISideBarState {

}

class SideBar extends React.Component<ISideBarProps> {
    // public readonly props: Readonly<Props>;
    constructor(props: ISideBarProps) {
        super(props);

    }
    public render() {
        return ( // Pass on our props
            <Menu {...this.props} noOverlay>
             <Button color="primary" className="menu-item"
              onClick={(e: any) => this.props.refreshClick(e)}
             >Refresh <FiRefreshCw /></Button>
            
            </Menu>);
    }
}

export default SideBar;