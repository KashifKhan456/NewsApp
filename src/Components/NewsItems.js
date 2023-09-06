import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let {title, description, newsUrl, imgUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{position:'absolute',display: 'flex',justifyContent:'flex-end',right: '0'}}>
        <span className="badge p-1.5 rounded-pill bg-danger"> {source}</span>
        </div>
          <img src={!imgUrl ? "https://assets2.cbsnewsstatic.com/hub/i/r/2023/08/15/8477db5e-9a1a-4020-804f-1f1453b22425/thumbnail/1200x630/e3e40869d0a9dec59d8341636b81003a/eiffel-tower1587561534.jpg?v=c1558d3b6724dca6fca8d3ab18436e19" : imgUrl} className="card-img-top img-fluid" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
