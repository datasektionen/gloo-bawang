import React from 'react'

import {getList, getItem} from './prometheus'

export default class News extends React.Component {
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
    getList(type)
      .then(json => this.setState({items: json, type: type}))
  }

  render() {
    const {items, type} = this.state;

    const highlight = item_type => item_type === type ? "text-theme-color strong" : ""

    return (
      <div className="row">
        <div className="col-sm-4 col-md-3">
          <div id="secondary-nav">
            <h3><a href="/nyheter">Nyheter/Event</a></h3>
            <ul>
              <li>
                <a className={highlight('all')}
                   onClick={e => this.getNews('all')}>
                   Event och poster
                </a>
              </li>
              <li>
                <a className={highlight('event')}
                   onClick={e => this.getNews('event')}>
                   Bara event
                </a>
              </li>
              <li>
                <a className={highlight('post')}
                   onClick={e => this.getNews('post')}>
                   Bara poster
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-8 col-md-9">
            {this.state.hash.length > 1
              ? <SingleItem id={this.state.hash.substring(1)} />
              : items.map(item => <ListItem key={item.id} {...item} />)}
        </div>
      </div>
    )
  }
}

function ListItem(props) {
  return (
    <div className="notice ultra_light">
      <a href={'#' + props.id}>
        <h1>{props.title_sv}</h1>
      </a>
      <p dangerouslySetInnerHTML={{__html: props.content_sv}}></p>
      <p style={{float: "right", marginBottom: 0}} >&mdash; {props.author}</p>
      <div className="clear"></div>
    </div>
  )
}

class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_sv: 'Läser in...',
      content_sv: '',
      author: '',
      sticky: false,
      publishDate: '',
      id: '',
      image: ''
    };

    this.getContent = this.getContent.bind(this)
  }

  getContent(id) {
    getItem(id).then(json => this.setState(json))
  }

  componentDidMount() {
    this.getContent(this.props.id)
  }

  componentWillReceiveProps(props) {
    this.getContent(props.id)        
  }

  render() {
    const {title_sv, content_sv, author} = this.state;

    return (
      <div>
        <a href="#" className="close">Stäng</a>
        <h1>{title_sv}</h1>
        <p dangerouslySetInnerHTML={{__html: content_sv}}></p>
        <p style={{float: "right"}}>&mdash; {author}</p>
      </div>
    )
  }
}
