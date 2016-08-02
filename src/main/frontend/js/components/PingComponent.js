import React from 'react';
import PingActions from '../actions/PingActions';
import PingStore from '../stores/PingStore';
import EventConstants from '../constants/Events';

class PingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           message: null
        };
        this._handlePingButton = this._handlePingButton.bind(this);
        this._onPingDataUpdated = this._onPingDataUpdated.bind(this);
    }

    componentDidMount() {
        PingStore.addListener(EventConstants.PING_CHANGE_EVENT, this._onPingDataUpdated);
    }

    componentWillUnmount() {
        PingStore.removeListener(EventConstants.PING_CHANGE_EVENT, this._onPingDataUpdated);
    }

    _onPingDataUpdated() {
        this.setState({
            message: PingStore.getPingData()
        })
    }

    _handlePingButton() {
        PingActions.callForPing();
    }

    render () {
        if (this.state.message) {
            return <h2>{this.state.message}</h2>
        } else {
            return <button onClick={this._handlePingButton}>Send ping</button>
        }

    }

};

export default PingComponent;