import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps =
        {
            pageSize: 3,
            country: 'in',
            category: 'general'
        }
    firstLetterCapitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }


    constructor(props) {
        super(props);
        this.state =
        {
            articles: [],
            loading: true,
            pageNumber: 1,
            totalArticles: 0
        }
        document.title = this.firstLetterCapitalize(this.props.category);
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72ff76f16d984f8b936723e19119257a&page=${this.state.pageNumber}&pageSize=${this.props.pageSize}`;
        console.log(url);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parceData = await data.json();
        this.setState({
            articles: parceData.articles,
            totalArticles: parceData.totalResults,
            loading: false
        });

    }
    // fetch api se data lane k liye ye lifecycle method hota hai
    // dynamically data ko show krne k liye
    async componentDidMount() { this.updateNews(); }


    // handlePreviousClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72ff76f16d984f8b936723e19119257a&page=${this.state.pageNumber - 1}&pageSize=${this.props.pageSize}`;
    //     // console.log(url);
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parceData = await data.json();
    //     // // console.log(parceData);
    //     // this.setState(
    //     //     {

    //     //         pageNumber: this.state.pageNumber - 1,
    //     //         articles: parceData.articles,
    //     //         loading: false
    //     //     });
    //     // // console.log('previous' + this.state.pageNumber);
    //     // // console.log('previous');
    //     this.setState({ pageNumber: this.state.pageNumber - 1 });
    //     this.updateNews();
    // }


    // handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72ff76f16d984f8b936723e19119257a&page=${this.state.pageNumber + 1}&pageSize=${this.props.pageSize}`;
    // console.log(url);
    // let currentPageNumber = this.state.pageNumber;
    // currentPageNumber++;
    // // console.log('current page' + currentPageNumber);
    // // console.log('orginal current page ' + this.state.pageNumber);
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parceData = await data.json();
    // // console.log(parceData);
    // this.setState(
    //     {

    //         pageNumber: currentPageNumber,
    //         articles: parceData.articles,
    //         loading: false

    //     });
    // console.log('next' + this.state.pageNumber);
    // console.log('next');
    //     this.setState({ pageNumber: this.state.pageNumber + 1 });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72ff76f16d984f8b936723e19119257a&page=${this.state.pageNumber + 1}&pageSize=${this.props.pageSize}`;
        console.log(url);
        this.setState({ pageNumber: this.state.pageNumber + 1 });
        let data = await fetch(url);
        let parceData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parceData.articles),
            totalArticles: parceData.totalResults
        });
    };


    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '25px', marginTop: '90px' }}>Royal Newsite - Top {this.firstLetterCapitalize(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage ? element.urlToImage : ''} newsUrl={element.url ? element.url : ''} time={element.publishedAt ? element.publishedAt : ''} author={element.author ? element.author : 'Mohit'} source={element.source.name ? element.source.name : 'Royal'} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }

}
export default News
