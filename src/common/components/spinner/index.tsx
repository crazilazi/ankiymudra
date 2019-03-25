import * as React from 'react';
import moon from 'src/icon/moon.svg';
// export interface ISpinnerProps {

// }

// export interface ISpinnerState {

// }

class Spinner extends React.Component {

    public render() {
        return (
            <div style={{
                position: "fixed",
                zIndex: 999,
                // tslint:disable-next-line:object-literal-sort-keys
                "top": 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba( 255, 255, 255, .8 )"
            }}>
                <img src={moon} style={{ bottom:0, left: 0, margin: "auto", position: "absolute", right: 0,"top": 0,
                 }} />
            </div>
        );
    }
}

export default Spinner;