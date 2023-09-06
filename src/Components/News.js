import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
// React infinite scroll 
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps ={
    country : 'us',
    pageSize : 6,
    category : 'general'
  }
  static propTypes ={
    country:PropTypes.string ,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    setProgress:PropTypes.func
  }
  // Capitalize first letter function 
  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
    };
    
  // constructor of the class
  constructor(props){
    super(props);
    this.state = {
      article : [],
      page : 1,
      loading : true,
      totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
  }
  async updateNews(){
    if (this.props.setProgress) {
      this.props.setProgress(0); // Start loading
      
    }
    let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({loading:true})
    let data = await fetch(URL);
    let parseData = await data.json();
    this.setState({article : parseData.articles,totalResults: parseData.totalResults,loading:false})
    if (this.props.setProgress) {
      this.props.setProgress(100); // Start loading
    }
  }
  async componentDidMount(){
    // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d934a93a4d4eb8b4533656e7cc9d9d&page=1&pageSize=${this.props.pageSize}`;
    
    // this.setState({loading:true})
    // let data = await fetch(URL);
    // let parseData = await data.json();
    // this.setState({article : parseData.articles,totalResults: parseData.totalResults,loading:false})
    this.updateNews();
  }

  // handlePrevClick
  handlePrevClick = async ()=>{
    // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d934a93a4d4eb8b4533656e7cc9d9d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(URL);
    // let parseData = await data.json();
    // this.setState({article : parseData.articles, page: this.state.page - 1,loading:false})
    this.setState({page: this.state.page -1})
    this.updateNews();
  }

  // handleNextClick
  handleNextClick= async() =>{
    // if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d934a93a4d4eb8b4533656e7cc9d9d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(URL);
    //   let parseData = await data.json();
    //   this.setState({article : parseData.articles, page: this.state.page + 1, loading:false})

    // }
    this.setState({page: this.state.page +1})
    this.updateNews();
  
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page +1})
    setTimeout(async () => {
      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
      let data = await fetch(URL);
      let parseData = await data.json();
      this.setState({
        article: this.state.article.concat(parseData.articles),
        totalResults: parseData.totalResults,
      });
    }, 0);
  };
  render() {
    return (
      <>

        <h3 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
        {/* Spinner */}
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.article.map((element)=>{
            return <div className="col-md-3" key={element.url?element.url:"Unique"}>
            <NewsItems title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,60): ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-2">
        <button type="button" disabled= {this.state.page <= 1}className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled = {this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}
