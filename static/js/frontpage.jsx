import React from 'react'

import moment from 'moment'

import {getEvents, getStickies} from './prometheus'

export default class Front extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      stickies: []
    }
  }

  componentDidMount() {
    getEvents().then(json => this.setState({events: json}))
    getStickies().then(json => this.setState({stickies: json}))
  }

  render() {
    const {events, stickies} = this.state

    return (
      <div className="row">
        <div className="col-sm-6" id="news">
          {events.filter((x, i) => i <= 2).map(item => (
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

        <div className="col-sm-6" id="sticky">
          {stickies.map(item => (
            <a className="news_item" key={item.id} href={'/nyheter#' + item.id} >
              <h4>{item.title_sv}</h4>
              <p dangerouslySetInnerHTML={{__html: item.content_sv}}></p>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
