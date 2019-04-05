import * as React from 'react';

export interface IAppProps {
}

export class App extends React.PureComponent<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  render() {
    return <div>
      Latest Boiler Plate
    </div>
  }
}