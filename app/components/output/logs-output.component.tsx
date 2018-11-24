import * as React from 'react';

let styles = require('./logs-output.component.scss');

interface IComponentProps {
    logs: {type: string, out: any}[];
}

export class LogsOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    switchOutput(logs: {type: string, out: any}[]) {
        if (!logs || !logs.length) {
            return (<></>);
        }

        return (<>
            {logs.map((log, i) => {
            console.log(styles, log.type);
               switch(true) {
                   case (log.type === 'error'): {
                       return (
                           <div key={i} className={styles.LogsError}>
                               <pre>
                               {JSON.stringify(log.out, null, 4)}
                               </pre>
                           </div>
                       );
                   }
                   default: {
                       return (
                           <div key={i} className={styles.LogsLog}>
                               <pre>
                               {JSON.stringify(log.out, null, 4)}
                               </pre>
                           </div>
                       );
                   }
               }
            })}
        </>)
    }

    render() {
        const elements = this.switchOutput(this.props.logs);

        return (
            <div className={styles.Logs}>
                {elements}
            </div>
        );
    }
}