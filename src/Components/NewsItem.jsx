import React, { Component } from 'react'

export class NewsItem extends Component {
   
    render() {
        let {title, description, imageUrl, newsUrl, author, date} = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <img src={!imageUrl?"https://s.france24.com/media/display/d1676b6c-0770-11e9-8595-005056a964fe/w:1280/p:16x9/news_1920x1080.png":imageUrl} className="card-img-top" alt="imaged"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted"><strong>By</strong> {!author?"unknown":author} <strong>On</strong> {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank_" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
// 0beb58c47d3d456c9034fe80114af848