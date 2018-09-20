import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

const IMAGE_FADE_IN_CLASS = 'fadeIn';

class GracefulImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      imageHasLoadedClassName: '',
    };

    this.handleImageOnLoad = this.handleImageOnLoad.bind(this);
  }

  handleImageOnLoad() {
    console.log('imagem carregada com sucesso');

    this.setState({
      imageHasLoadedClassName: IMAGE_FADE_IN_CLASS,
    });
  }

  handleImageOnError() {
    console.log('erro a carregar');
  }

  render() {
    const { imageHasLoadedClassName } = this.state;

    const {
      alt, src, width, height, placeholder,
    } = this.props;
    return (
      <Container
        style={{
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <Image
          className={`${imageHasLoadedClassName}`}
          alt={alt}
          width={`${width}`}
          height={`${height}`}
          src={src}
          onLoad={this.handleImageOnLoad}
          onError={this.handleImageOnError}
        />
      </Container>
    );
  }
}

const Container = styled.figure`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${rem('375px')};
  overflow: hidden;
  background-size: cover;
  background-position: center center;

  @media ${props => props.theme.breakpointMedium} {
    height: ${rem('414px')};
  }

  @media ${props => props.theme.breakpointLarge} {
    height: ${rem('480px')};
  }

  @media ${props => props.theme.breakpointXlarge} {
    height: ${rem('560px')};
  }
`;

const Image = styled.img`
  position: relative;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation-fill-more: forwards;
`;

GracefulImage.defaultProps = {
  width: 1400,
  height: 560,
};

GracefulImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default GracefulImage;
