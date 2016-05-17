require('whatwg-fetch'); // fetch polyfill

var React    = require('react');
var ReactDom = require('react-dom');

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      type: 'all',
      hash: location.hash
    };

    window.onhashchange = e => this.setState({hash: location.hash})
  }

  componentDidMount() {
    this.getNews(this.state.type)
  }

  getNews(type) { 
    fetch('http://prometheus.datasektionen.se/api/list/sv/' + type)
      .then(response => response.json())
      .then(json => {
        this.setState({items: json, type: type})
      })
  }

  render() {
    var {items, type} = this.state;

    return (
      <div className="row">
        <div className="col-sm-4 col-md-3">
          <div id="secondary-nav">
            <h3><a href="/nyheter">Nyheter/Event</a></h3>
            <ul>
              <TypeButton text={'Alla poster'} 
                          type='all'
                          stateType={type}
                          onClick={e => this.getNews('all')} />
              <TypeButton text={'Bara event'} 
                          type='event'
                          stateType={type}
                          onClick={e => this.getNews('event')} />
              <TypeButton text={'Inte event'}
                          type='post'
                          stateType={type}
                          onClick={e => this.getNews('post')} />
            </ul>
          </div>
        </div>
        <div className="col-sm-8 col-md-9">
          <div className="row">
            <div class="col-sm-9">
              <div>
                {this.state.hash.length > 1 ? 
                  <SingleItem id={this.state.hash.substring(1)} /> :
                  items.map(item => <NewsItem key={item.id} {...item} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_sv: 'Post title',
      content_sv: '',
      author: '',
      sticky: false,
      publishDate: 'eeeh',
      id: '',
      image: 'lol.jpg'
    };

    this.getContent = this.getContent.bind(this)
  }

  getContent(id) {
    fetch('http://prometheus.datasektionen.se/api/item/' + id)
      .then(response => response.json())
      .then(json => this.setState(json))
  }

  componentDidMount() {
    this.getContent(this.props.id)
  }

  componentWillReceiveProps(props) {
    this.getContent(props.id)        
  }

  render() {
    var {title_sv, content_sv, author} = this.state;

    return (
      <div>
        <a href="#">Close</a>
        <h1>{title_sv}</h1>
        <p dangerouslySetInnerHTML={{__html: content_sv}}></p>
        <p>{author}</p>
      </div>
    )
  }
}

function TypeButton(props) {
  return (
    <li>
      <a className={props.type === props.stateType ? "text-theme-color strong" : false}
         onClick={props.onClick}>
           {props.text}</a>
    </li>
  )
}

function NewsItem(props) {
  return (
    <div>
      <a href={'#' + props.id}>{props.title_sv}</a>
    </div>
  )
}

ReactDom.render(<News />, document.querySelector('#mount_point'));