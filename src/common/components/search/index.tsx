import * as React from 'react';
import NumberFormat from 'react-number-format';
// import { FiSearch } from 'react-icons/fi';

// tslint:disable-next-line:no-empty-interface
export interface ISearchProps {

}

// tslint:disable-next-line:no-empty-interface
export interface ISearchState {

}

class Search extends React.Component<ISearchProps, ISearchState> {
    constructor(props: ISearchProps) {
        super(props);
    }
    public render() {
        return (
            <div className="row">
                <div className="form-group col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <input className="form-control" type="checkbox" id="inlineCheckbox1" />
                </div>
                <div className="form-group col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input className="form-control" type="text" placeholder="Search" />
                </div>
                <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <NumberFormat value={4654654645} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
            </div>
        );
    }
}

export default Search;