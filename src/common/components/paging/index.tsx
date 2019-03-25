import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// tslint:disable-next-line:no-empty-interface
export interface IKMPagingProps {
    currentPage: number;
    pagesCount: number
    pagingclick(event: any, page: number): void;

}

// tslint:disable-next-line:no-empty-interface
export interface IKMPagingState {

}

class KMPaging extends React.Component<IKMPagingProps, IKMPagingState> {

    /**
     *
     */
    constructor(props: IKMPagingProps) {
        super(props);

    }
    public numberToArray = (num: number) => {
        const obj: number[] = [];
        for (let i = 0; i < num; i++) {
            obj.push(i);
        }
        return obj;
    }

    public render() {
        return (
            <div className={"pagination-wrapper "} style={{ overflow: "auto", marginTop: 20 }}>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={this.props.currentPage <= 0}>
                        <PaginationLink
                            onClick={e => this.props.pagingclick(e, this.props.currentPage - 1)}
                            previous
                            href="#"
                        />
                    </PaginationItem>

                    {this.numberToArray(this.props.pagesCount).map((page, i) => (
                        <PaginationItem active={i === this.props.currentPage} key={i}>
                            <PaginationLink
                                onClick={e => this.props.pagingclick(e, i)}
                                href="#"
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem
                        disabled={this.props.currentPage >= this.props.pagesCount - 1}
                    >
                        <PaginationLink
                            onClick={e => this.props.pagingclick(e, this.props.currentPage + 1)}
                            next
                            href="#"
                        />
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

export default KMPaging;