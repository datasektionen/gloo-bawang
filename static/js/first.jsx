require('whatwg-fetch'); // fetch polyfill

var React    = require('react');
var ReactDom = require('react-dom');
var moment   = require('moment');
moment.locale('sv');

require('./stickies.jsx');

class CurrentEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getEvents()
    }

    getEvents() {
        fetch('https://prometheus.datasektionen.se/api/list/sv/event')
            .then(response => response.json())
            .then(json => {
                this.setState({items: json})
            })
    }

    render() {
        var {items} = this.state;

        return (
            <div>
                {items.filter((x, i) => i <= 2).map(item => (
                    <a className="news_item" key={item.id} href={'/nyheter#' + item.id}>
                        <h4>{item.title_sv}</h4>
                        <div className="news_item_meta">
                            <i className="fa fa-clock-o"></i> {moment(item.eventStart).format('D MMMM HH:mm')}
                        </div>
                        <div className="news_item_meta">
                            <i className="fa fa-location-arrow"></i> {item.eventLocation}
                        </div>
                    </a>
                ))}
            </div>
        )
    }
}

ReactDom.render(<CurrentEvents />, document.getElementById('news'));
