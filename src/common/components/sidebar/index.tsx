import * as React from "react";
import Sidebar, { SidebarProps } from "react-sidebar";
import referesh from 'src/icon/referesh.svg';
import setting from 'src/icon/setting.svg';

// tslint:disable-next-line:no-empty-interface
export interface ISideNavBarProps extends SidebarProps {
    refreshClick(event: any): void;
}

// tslint:disable-next-line:no-empty-interface
export interface ISideNavBarState {
    sidebarOpen: boolean
}

class SideNavBar extends React.Component<ISideNavBarProps, ISideNavBarState> {
    constructor(props: ISideNavBarProps) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    public onSetSidebarOpen(open: boolean) {
        this.setState({ sidebarOpen: open });
    }

    public render() {
        return (
            <Sidebar
                sidebar={(<ul className="list-group">
                    <li className="list-group-item"><a href="#" onClick={(e: any) => this.props.refreshClick(e)}><img src={referesh} onClick={() => this.onSetSidebarOpen(true)}
                        style={{ width: 32, height: 32, cursor: 'pointer' }} /></a></li>

                </ul>)}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
            >
                <img src={setting} onClick={() => this.onSetSidebarOpen(true)}
                    style={{ width: 32, height: 32, cursor: 'pointer' }} />
                {/* <button onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
          </button> */}
            </Sidebar>
        );
    }
}

export default SideNavBar;