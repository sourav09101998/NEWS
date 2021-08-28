import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("hello constructor form news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async update() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0beb58c47d3d456c9034fe80114af848&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles
        })

    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0beb58c47d3d456c9034fe80114af848&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        this.update();
    }
    handlePrevClick = async () => {
        // console.log("prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0beb58c47d3d456c9034fe80114af848&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles
        // })
        this.setState({ page: this.state.page - 1 });
        this.update();
    }
    handleNextClick = async () => {
        // if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

        // }
        // else{

        //     console.log("next");
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0beb58c47d3d456c9034fe80114af848&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.update();
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">{`News - Top  ${this.props.category} HeadLines`}</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between my-5">

                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark"> &larr; prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
