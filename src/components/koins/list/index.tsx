import axios from "axios";
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import KMPaging from 'src/common/components/paging';
import SideBar from 'src/common/components/sidebar';
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
    dropdownOpen: boolean;
    sortDropdownOpen: boolean;
    dropdownValue: string;
    sortType: string;
}

class KoinList extends React.Component<IKoinListProps, IKoinListState> {
    public koins: ITicker[];
    // tslint:disable-next-line:object-literal-sort-keys
    public readonly state: Readonly<IKoinListState> = {
        pagedData: [], isPageLoading: false, currentPage: 0,
        pagesCount: 0, pageSize: 80, isPageLoaded: false, globalData: {},
        dropdownOpen: false, dropdownValue: "1h", sortType: "Sort By Rank",
        sortDropdownOpen: false
    };
    // public readonly state: Readonly<IKoinListState> = { isPageLoading: true };
    constructor(props: any, context: any) {
        super(props, context);

        this.toggle = this.toggle.bind(this);
        this.sortToggle = this.sortToggle.bind(this);
    }

    public toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
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
                this.koins = data;
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
        return this.koins.slice((index * this.state.pageSize), ((index + 1) * this.state.pageSize))
    }

    public getDropDownValue = (e: any) => {
        e.preventDefault();
        this.setState({ dropdownValue: e.currentTarget.textContent });
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
                switch (this.state.dropdownValue.trim()) {
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
                switch (this.state.dropdownValue.trim()) {
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
        let bgColor: string = "";
        switch (this.state.dropdownValue.trim()) {
            case "1h":
                bgColor = change.percent_change_1h < 0 ? "bg-danger text-light" : "bg-success text-light";
                break;
            case "12h":
                bgColor = change.percent_change_12h < 0 ? "bg-danger text-light" : "bg-success text-light";
                break;
            case "24h":
                bgColor = change.percent_change_24h < 0 ? "bg-danger text-light" : "bg-success text-light";
                break;
            case "30d":
                bgColor = change.percent_change_30d < 0 ? "bg-danger text-light" : "bg-success text-light";
                break;
            case "1y":
                bgColor = change.percent_change_1y < 0 ? "bg-danger text-light" : "bg-success text-light";
                break;

            default:
                break;
        }
        return bgColor;
    }

    public getChangeValueBasedOnDropdown = (change: IUSD): number => {
        let changeInPercentage: number = 0;
        switch (this.state.dropdownValue.trim()) {
            case "1h":
                changeInPercentage = change.percent_change_1h;
                break;
            case "12h":
                changeInPercentage = change.percent_change_12h;
                break;
            case "24h":
                changeInPercentage = change.percent_change_24h;
                break;
            case "30d":
                changeInPercentage = change.percent_change_30d;
                break;
            case "1y":
                changeInPercentage = change.percent_change_1y;
                break;

            default:
                break;
        }
        return changeInPercentage;
    }

    public render = () => {
        if (this.state.isPageLoading === true) {
            return (<Spinner />);
        }
        // const hide = !this.state.isPageLoaded ? 'd-none' : '';
        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

                <div id="page-wrap">
                    <div className="container-fluid">
                        <div >
                            <div className="row">
                                {this.state.pagedData.map(koin => (
                                    <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1" key={koin.id} style={{ marginBottom: 3 }}>
                                        <div className={"card " + this.getClassBasedOnDropdown(koin.quotes.USD)} style={{ width: 112, height: 63 }}  >
                                            <div className="card-body" style={{ padding: "0.25rem" }}>
                                                <h6 className="card-title"><Link to={`/get/${koin.id}`} className="text-white">{koin.symbol}</Link>
                                                    <span style={{ fontSize: 9, fontWeight: "bold", float: "right" }}>{this.getChangeValueBasedOnDropdown(koin.quotes.USD)}%</span>
                                                </h6>
                                                <span className="card-subtitle mb-2">
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