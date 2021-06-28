import React from 'react';

function MainImage(props) {
  const { image, title, text } = props;
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url('${image}')`,
        backgroundColor: '#1c1c1c',
        backgroundSize: '100%, cover',
        backgroundPosition: 'center, center',
        width: '100%',
        height: '500px',
        position: 'relative',
      }}
    >
      <div>
        <div
          style={{
            position: 'absolute',
            maxWidth: '500px',
            bottom: '2rem',
            marginLeft: '2rem',
          }}
        >
          <h2 sytle={{ color: 'width' }}> {title}</h2>
          <p style={{ color: 'white', fontSize: '1rem' }}> {text}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
