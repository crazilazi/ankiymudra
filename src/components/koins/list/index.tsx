import axios from "axios";
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import KmDropDown from 'src/common/components/dropDown';
import KMPaging from 'src/common/components/paging';
import Search from 'src/common/components/search';
import SideNavBar from 'src/common/components/sidebar';
import Spinner from 'src/common/components/spinner';
import { Config } from 'src/common/config';
import { IGlobalData } from 'src/common/IGobalData';
import { ITicker, IUSD } from 'src/common/ITicker';
// tslint:disable-next-line:no-empty-interface
export interface IKoinListProps {

}

export interface IKoinListState {

    pagedData: ITicker[];
    currentPage: number;
    pagesCount: number;
    isPageLoading: boolean;
    pageSize: number;
    isPageLoaded: boolean;
    globalData: IGlobalData;
    timeDropDownOpen: boolean;
    sortDropdownOpen: boolean;
    timeDropDownValue: string;
    timeDropDownData: string[];
    sortType: string;
    // allMudra: ITicker[];
}

class KoinList extends React.Component<IKoinListProps, IKoinListState> {
    public allMudra: ITicker[];
    public orgAllMudra: ITicker[];
    // tslint:disable-next-line:object-literal-sort-keys
    public readonly state: Readonly<IKoinListState> = {
        pagedData: [], isPageLoading: false, currentPage: 0,
        pagesCount: 0, pageSize: 100, isPageLoaded: false, globalData: {},
        timeDropDownOpen: false, timeDropDownValue: "24h", timeDropDownData: ['1h', '12h', '24h', '7d', '30d', '1y', 'ath'],
        sortType: "Sort By Rank",
        sortDropdownOpen: false
    };
    // public readonly state: Readonly<IKoinListState> = { isPageLoading: true };
    constructor(props: any, context: any) {
        super(props, context);

        this.timeDropDownOpenToggle = this.timeDropDownOpenToggle.bind(this);
        this.sortToggle = this.sortToggle.bind(this);
    }

    public timeDropDownOpenToggle() {
        this.setState(prevState => ({
            timeDropDownOpen: !prevState.timeDropDownOpen
        }));
    }

    public sortToggle() {
        this.setState(prevState => ({
            sortDropdownOpen: !prevState.sortDropdownOpen
        }));
    }

    public componentDidMount = () => {
        // do nothing
        // this.getAllTicker();

    }

    public getAllTicker = () => {
        this.setState({ isPageLoading: true });
        axios.get(`${Config.baseUrl}/global`)
            .then(res => {
                this.setState({ globalData: res.data });
            })
            .catch(err => {
                console.error(err);
            });

        axios.get(`${Config.baseUrl}/tickers`)
            .then(response => {
                const data: ITicker[] = response.data;
                data.sort((a, b) => {
                    if (a.rank < b.rank) { return -1; }
                    if (a.rank > b.rank) { return 1; }
                    return 0;
                });
                this.orgAllMudra = data;
                this.allMudra = data;
                // this.setState({ allMudra: data });
                this.setState({ pagedData: this.getPageddata(0), isPageLoading: false, pagesCount: (data.length / this.state.pageSize), isPageLoaded: true });
            });
    }

    public numberToArray = (num: number) => {
        const obj: number[] = [];
        for (let i = 0; i < num; i++) {
            obj.push(i);
        }
        return obj;
    }

    public handleClick = (e: any, index: number) => {
        e.preventDefault();
        this.setState({ pagedData: this.getPageddata(index), currentPage: index });

    }

    public getPageddata = (index: number): ITicker[] => {
        return this.allMudra.slice((index * this.state.pageSize), ((index + 1) * this.state.pageSize))
    }

    public getTimeDropDownValue = (e: any) => {
        e.preventDefault();
        this.setState({ timeDropDownValue: e.currentTarget.textContent });
    }

    public setSortValue = (e: any) => {
        e.preventDefault();
        let data: ITicker[] = [];
        switch (e.currentTarget.textContent.trim()) {
            case "Sort By Rank":
                data = this.state.pagedData.sort((a, b) => {
                    if (a.rank < b.rank) { return -1; }
                    if (a.rank > b.rank) { return 1; }
                    return 0;
                });
                break;
            case "Sort By $ L2H":
                data = this.state.pagedData.sort((a, b) => {
                    if (a.quotes.USD.price < b.quotes.USD.price) { return -1; }
                    if (a.quotes.USD.price > b.quotes.USD.price) { return 1; }
                    return 0;
                });
                break;
            case "Sort By $ H2L":
                data = this.state.pagedData.sort((a, b) => {
                    if (a.quotes.USD.price < b.quotes.USD.price) { return 1; }
                    if (a.quotes.USD.price > b.quotes.USD.price) { return -1; }
                    return 0;
                });
                break;
            case "Sort By % L2H":
                switch (this.state.timeDropDownValue.trim()) {
                    case "1h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_1h < b.quotes.USD.percent_change_1h) { return -1; }
                            if (a.quotes.USD.percent_change_1h > b.quotes.USD.percent_change_1h) { return 1; }
                            return 0;
                        });
                        break;
                    case "12h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_12h < b.quotes.USD.percent_change_12h) { return -1; }
                            if (a.quotes.USD.percent_change_12h > b.quotes.USD.percent_change_12h) { return 1; }
                            return 0;
                        });
                        break;
                    case "24h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_24h < b.quotes.USD.percent_change_24h) { return -1; }
                            if (a.quotes.USD.percent_change_24h > b.quotes.USD.percent_change_24h) { return 1; }
                            return 0;
                        });
                        break;
                    case "30d":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_30d < b.quotes.USD.percent_change_30d) { return -1; }
                            if (a.quotes.USD.percent_change_30d > b.quotes.USD.percent_change_30d) { return 1; }
                            return 0;
                        });
                        break;
                    case "1y":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_1y < b.quotes.USD.percent_change_1y) { return -1; }
                            if (a.quotes.USD.percent_change_1y > b.quotes.USD.percent_change_1y) { return 1; }
                            return 0;
                        });
                        break;

                    default:
                        break;
                }

                break;
            case "Sort By % H2L":
                switch (this.state.timeDropDownValue.trim()) {
                    case "1h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_1h < b.quotes.USD.percent_change_1h) { return 1; }
                            if (a.quotes.USD.percent_change_1h > b.quotes.USD.percent_change_1h) { return -1; }
                            return 0;
                        });
                        break;
                    case "12h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_12h < b.quotes.USD.percent_change_12h) { return 1; }
                            if (a.quotes.USD.percent_change_12h > b.quotes.USD.percent_change_12h) { return -1; }
                            return 0;
                        });
                        break;
                    case "24h":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_24h < b.quotes.USD.percent_change_24h) { return 1; }
                            if (a.quotes.USD.percent_change_24h > b.quotes.USD.percent_change_24h) { return -1; }
                            return 0;
                        });
                        break;
                    case "30d":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_30d < b.quotes.USD.percent_change_30d) { return 1; }
                            if (a.quotes.USD.percent_change_30d > b.quotes.USD.percent_change_30d) { return -1; }
                            return 0;
                        });
                        break;
                    case "1y":
                        data = this.state.pagedData.sort((a, b) => {
                            if (a.quotes.USD.percent_change_1y < b.quotes.USD.percent_change_1y) { return -1; }
                            if (a.quotes.USD.percent_change_1y > b.quotes.USD.percent_change_1y) { return 1; }
                            return 0;
                        });
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
        this.setState({ sortType: e.currentTarget.textContent, pagedData: data });
    }

    public getClassBasedOnDropdown = (change: IUSD): string => {
        return change[`percent_change_${this.state.timeDropDownValue.trim()}`] < 0 ? "bg-danger text-light" : "bg-success text-light";
    }

    public getChangeValueBasedOnDropdown = (change: IUSD): number => {
        return change[`percent_change_${this.state.timeDropDownValue.trim()}`];
    }
    public findMudra = (searchTxt: string): void => {
        const filterMudra: ITicker[] = this.orgAllMudra.filter(x => x.symbol.toLowerCase().startsWith(searchTxt.toLowerCase()) ||
            x.name.toLowerCase().startsWith(searchTxt.toLowerCase()));
        this.allMudra = filterMudra;
        this.setState({ pagedData: this.getPageddata(0), pagesCount: (this.allMudra.length / this.state.pageSize) });
        console.log(this.state.globalData);
    }
    public render = () => {
        if (this.state.isPageLoading === true) {
            return (<Spinner />);
        }
        const hide = !this.state.isPageLoaded ? 'd-none' : '';
        return (
            <div id="App">
                <SideNavBar refreshClick={this.getAllTicker} />
                <div id="page-wrap" className={hide}>
                    <div className="container mt-2">
                        <div >
                            <div className="row">
                                <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                    <Search totalMarketCap={this.state.globalData.market_cap_usd} getSearchTxt={this.findMudra} />
                                </div>
                                <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                    <NumberFormat className="form-control text-primary" value={this.state.globalData.market_cap_usd} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </div>
                                <div className="form-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                    <KmDropDown dropDownData={this.state.timeDropDownData} dropDownOpen={this.state.timeDropDownOpen} dropDownValue={this.state.timeDropDownValue}
                                        dropDownStyles={{}} dropDownToggle={this.timeDropDownOpenToggle} getDropDownValue={this.getTimeDropDownValue} />
                                </div>
                            </div>

                            <div className="row">
                                {this.state.pagedData.map(koin => (
                                    <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1" key={koin.id} style={{ marginBottom: 2 }}>
                                        <div className={"card " + this.getClassBasedOnDropdown(koin.quotes.USD)} style={{ width: 92, height: 55 }}  >
                                            <div className="card-body" style={{ padding: "0.25rem" }}>
                                                <h6 className="card-title" style={{ fontSize: 12, fontWeight: "bold" }}><Link to={`/get/${koin.id}`} className="text-white">{koin.symbol}</Link>
                                                    <span style={{ fontSize: 9, fontWeight: "bold", float: "right" }}>{this.getChangeValueBasedOnDropdown(koin.quotes.USD)}%</span>
                                                </h6>
                                                <span className="card-subtitle mb-2" style={{ fontSize: 12, fontWeight: "bold" }}>
                                                    <NumberFormat value={koin.quotes.USD.price.toFixed(4)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </span>
                                                {/* <span className = "text-muted">ATH - {koin.quotes.USD.ath_price.toFixed(2)}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <KMPaging currentPage={this.state.currentPage} pagesCount={this.state.pagesCount} pagingclick={this.handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default KoinList;