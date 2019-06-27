import * as React from 'react';
import { elastic as Menu, Props } from "react-burger-menu";
// import { FiRefreshCw } from 'react-icons/fi';
// import Button from 'reactstrap/lib/Button';
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
                {/* <Button color="primary" className="menu-item"
                    onClick={(e: any) => this.props.refreshClick(e)}
                >Refresh <FiRefreshCw /></Button>
                <div>
                    <Button color="primary" className="menu-item"
                        onClick={(e: any) => this.props.refreshClick(e)}
                    >Refresh <FiRefreshCw /></Button>
                </div> */}
                <ul className="nav">
                    <li><a href="#" onClick={(e: any) => this.props.refreshClick(e)}>Link 1</a></li>
                    <li><a href="#" id="btn-1" data-toggle="collapse" data-target="#submenu1" aria-expanded="false">Link 2 (toggle)</a>
                        <ul className="nav collapse" id="submenu1" role="menu" aria-labelledby="btn-1">
                            <li><a href="#">Link 2.1</a></li>
                            <li><a href="#">Link 2.2</a></li>
                            <li><a href="#">Link 2.3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Link 4</a></li>
                </ul>
            </Menu>);
    }
}

export default SideBar;