import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/style.css';

class MusicCard extends Component {
  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { handleChange } = this.props;

    return (
      <div className="music-player-card">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <form>
            <input
              className="tw-heart"
              id={ trackId }
              type="checkbox"
              value={ trackId }
              onChange={ handleChange }
            />
          </form>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    artistName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MusicCard;
