import * as React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
// import MonsterMenu from 'src/common/components/navbar';
import KoinDetails from 'src/components/koins/details';
import KoinList from 'src/components/koins/list';
export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <MemoryRouter>
            <div>
                {/* <MonsterMenu /> */}
                <Route exact={true} path="/" component={KoinList} />
                <Route path="/get/:id" component={KoinDetails} />
                {/* <Route path="/edit/:id" component={EmpEdit} /> */}
            </div>
        </MemoryRouter>
    );
}
