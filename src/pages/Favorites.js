import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoritos: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    getFavoriteSongs().then((favoritos) => this.setState({ favoritos, loading: false }));
  }

  render() {
    const { favoritos, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading />
          : favoritos.map((song) => (
            <MusicCard
              key={ song.trackId }
              music={ song }
              handleChange={ this.getFavoriteList }
              checked={ favoritos.some((s) => s.trackId === song.trackId) }
            />
          ))}
        <p>Favorites</p>
      </div>
    );
  }
}

export default Favorites;
