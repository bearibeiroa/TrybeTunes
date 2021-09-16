import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musicList: [],
    };

    this.musicListResult = this.musicListResult.bind(this);
  }

  componentDidMount() {
    this.fetchMusicList();
  }

  fetchMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);

    this.setState({
      loading: false,
      musicList: result,
    });
  }

  musicListResult() {
    const { musicList } = this.state;
    return (
      <section>
        <h3 data-testid="album-name">{musicList[0].collectionName}</h3>
        <h4 data-testid="artist-name">{musicList[0].artistName}</h4>
        {musicList.slice(1).map((music) => (
          <MusicCard key={ music.trackId } music={ music } />
        ))}
      </section>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        { loading ? <Loading /> : this.musicListResult() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
