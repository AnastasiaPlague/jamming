import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
        state = {
            term: ''
        };

    search = () => {
        this.props.onSearch(this.state.term) 
    };

    render() { 
        return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist"
            onChange={(e) => this.setState({
                term: e.target.value
            })} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
        </div>  
        );
    }
}
 
export default SearchBar;