import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/style.css';

class AlbumCards extends Component {
  render() {
    const {
      album: {
        collectionId,
        artworkUrl100,
        collectionName,
        artistName },
    } = this.props;

    return (
      <span className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
            width="260"
          />
          <div className="album-card-info">
            <h4>{collectionName}</h4>
            <p>{artistName}</p>
          </div>
        </Link>
      </span>
    );
  }
}

AlbumCards.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

export default AlbumCards;
