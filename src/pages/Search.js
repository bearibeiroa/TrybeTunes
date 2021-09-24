import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCards from '../components/AlbumCards';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Header.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: false,
      searchOk: false,
      artistFetched: [],
      lastSearch: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });

    const { search } = this.state;
    const result = await searchAlbumsAPI(search);

    this.setState({
      search: '',
      loading: false,
      searchOk: true,
      artistFetched: result,
      lastSearch: search,
    });
  }

  albumSearchResult = () => {
    const { artistFetched, lastSearch } = this.state;

    if (artistFetched.length === 0) {
      return (
        <>
          <h3>{`Resultado de álbuns de: ${lastSearch}`}</h3>
          <h2>Nenhum álbum foi encontrado</h2>
        </>
      );
    }
    return (
      <>
        <h3>{`Resultado de álbuns de: ${lastSearch}`}</h3>
        <section className="album-card-container">
          { artistFetched.map((album) => (
            <AlbumCards key={ album.collectionId } album={ album } />)) }
        </section>
      </>
    );
  }

  render() {
    const { search, loading, searchOk } = this.state;
    const SearchLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form">
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              value={ search }
              placeholder="Nome do artista"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ search.length < SearchLength }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            { loading && <Loading /> }
          </label>
        </form>
        { searchOk && this.albumSearchResult() }
      </div>
    );
  }
}

export default Search;
