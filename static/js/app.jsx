import 'whatwg-fetch'

import React from 'react'
import ReactDom from 'react-dom'

import Front from './frontpage.jsx'
import News from './news.jsx'

const front_container = document.getElementById('home_news');
if(front_container)
  ReactDom.render(<Front />, front_container);


const news_container = document.getElementById('mount_point');
if(news_container)
  ReactDom.render(<News />, news_container);
