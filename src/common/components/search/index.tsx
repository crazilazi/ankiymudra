import * as React from 'react';
// import NumberFormat from 'react-number-format';
// import { FiSearch } from 'react-icons/fi';

// tslint:disable-next-line:no-empty-interface
export interface ISearchProps {
    totalMarketCap?: number,
    getSearchTxt(searchTxt: string): void
}

// tslint:disable-next-line:no-empty-interface
export interface ISearchState {
    searchTxt: string,
    // searchOnKeyUp(event: any): void

}

class Search extends React.Component<ISearchProps, ISearchState> {
    constructor(props: ISearchProps) {
        super(props);
    }
    /**
     * search mudra
     */
    public getCurrentText(event: any) {
        // your logic here
        // console.log(event.target.value);
        const txt: string = event.target.value;
        this.props.getSearchTxt(txt.trim());
    }
    public render() {
        return (
            <>
                <input className="form-control" minLength={3}
                    onChange={(e) => this.getCurrentText(e)}
                    type="text" placeholder="Search" />
                {/* <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <input className="form-control" minLength={3}
                        onChange={(e) => this.getCurrentText(e)}
                        type="text" placeholder="Search" />
                </div>
                <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <NumberFormat className="form-control text-primary" value={this.props.totalMarketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div> */}
            </>
        );
    }
}

export default Search;