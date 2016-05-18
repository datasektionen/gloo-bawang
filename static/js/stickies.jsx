var React    = require('react');
var ReactDom = require('react-dom');

class CurrentEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getAll()
    }

    getAll() {
        fetch('https://prometheus.datasektionen.se/api/sticky')
            .then(response => response.json())
            .then(json => this.setState({items: json}))
    }

    render() {
        var {items} = this.state;

        return (
            <div>
                {items.map(item => (
                    <div>
                        <h4>{item.title_sv}</h4>
                        <p dangerouslySetInnerHTML={{__html: item.content_sv}}></p>
                    </div>
                ))}
            </div>
        )
    }
}

ReactDom.render(<CurrentEvents />, document.getElementById('sticky'));
