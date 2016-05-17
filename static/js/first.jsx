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
    this.getEvents()
  }

  getEvents() { 
    fetch('http://prometheus.datasektionen.se/api/list/sv/event')
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
        <a class="news_item" href="#">
            <h4>{item.title}</h4>
            <div class="news_item_meta">
                <i class="fa fa-clock-o"></i> {item.time}
            </div>
            <div class="news_item_meta">
                <i class="fa fa-location-arrow"></i> {item.location}
            </div>
        </a>
      ))}
      </div>
    )
  }
}

ReactDom.render(<CurrentEvents />, document.querySelector('#news'))
