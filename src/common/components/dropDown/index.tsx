import * as React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
// import { IDropDownData } from 'src/common/ITicker';
// tslint:disable-next-line: no-empty-interface
export interface IKmDropDownProps {
    dropDownOpen: boolean,
    dropDownValue: string,
    dropDownData: string[],
    dropDownStyles: any
    dropDownToggle(): void,
    getDropDownValue(event: any): void,
}

// tslint:disable-next-line: no-empty-interface
export interface IKmDropDownState {

}

class KmDropDown extends React.Component<IKmDropDownProps, IKmDropDownState> {
    constructor(props: IKmDropDownProps) {
        super(props);
        // this.state = { : };
    }
    public render() {
        console.log(this.props.dropDownData);
        return (
            <Dropdown isOpen={this.props.dropDownOpen} style={this.props.dropDownStyles} toggle={this.props.dropDownToggle}>
                <DropdownToggle caret>
                    {this.props.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    {this.props.dropDownData.map((data, index) => (
                        <DropdownItem key={index} onClick={(e: any) => this.props.getDropDownValue(e)}>{data}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>);
    }
}

export default KmDropDown;