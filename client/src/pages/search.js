import React, { Component } from 'react';
import { Input, FormBtn } from "../components/Form"
import { List, ListItem, SaveBtn } from "../components/List";
import API from "../utils/API";

class Search extends Component {
    state = {
        books: [],
        currentTerm: "",
        queryString: "https://www.googleapis.com/books/v1/volumes?q="
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.currentTerm) {
            let localSearchTerms = this.state.currentTerm.split(" ");
            let queryTerms = localSearchTerms.join("+")
            let localQueryString = this.state.queryString + queryTerms;
            API.googleBooks(localQueryString).then(response => {
                console.log(response)
                this.setState({
                    books: response.data.items
                })
                console.log(this.state.books)
            })
        }
    };

    saveBook = id => {
        const localBook = this.state.books[id].volumeInfo
        const data = {
            title : localBook.title,
            authors: localBook.authors,
            summary: localBook.description,
            image: localBook.imageLinks.thumbnail,
            link: localBook.infoLink
        }
        API.saveBook(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        alert("Book saved !")
    }

    render() {
        return (
            <div className="row-center">
                <div className="row">
                    <form className="col-md-10 mx-auto" style={{ border: '5px solid black'}}>
                        <h4 className="ml-1" ><br></br>Book Search</h4><br></br>
                        <h4 className="ml-1" style={{ fontSize: '15px'}}>Book </h4>
                        <Input
                            style={{ border: '5px solid black'}}
                            value={this.state.currentTerm}
                            onChange={this.handleInputChange}
                            name="currentTerm"
                            placeholder="example: Harry Potter"
                        />
                        <FormBtn
                            disabled={!(this.state.currentTerm)}
                            onClick={this.handleFormSubmit}
                        >
                            Search
                    </FormBtn>
                    </form>
                </div>
                <div className="">
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map((book, i) => {
                                return (
                                    <ListItem key={i}>
                                        <div className="card" style={{ border: '5px solid black' }}>
                                            <div className="card-body">
                                            <a className="btn btn-dark float-right" style = {{backgroundColor: 'white', color: 'black', border: '3px solid black'}} href={book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "https://en.wikipedia.org/wiki/HTTP_404"}>View</a>
                                                <SaveBtn onClick={() => this.saveBook(i)}>Save Book</SaveBtn>
                                                <img src={book.volumeInfo.imageLinks
                                                ?
                                                book.volumeInfo.imageLinks.thumbnail
                                                :
                                                "https://cdn4.iconfinder.com/data/icons/basic-17/80/22_BO_open_book-512.png"}
                                            
                                                alt="The book's cover" className="float-left img-fluid m-3" />
                                                <div className="card-title"><strong>{book.volumeInfo.title ? book.volumeInfo.title : "Title Unknown"}</strong> by {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Anonymous" })}</div>
                                                <div className="card-text">{book.volumeInfo.description ? book.volumeInfo.description : "No Description Found"}</div>
                                                
                                            </div>
                                        </div>
                                    </ListItem>
                                )
                            })}
                        </List>
                    ) : (
                            <h4 className="mx-auto"> No results found </h4>
                        )}
                </div>
            </div>
        )
    }

}

export default Search;