<div className="movie-detail-page">
  <Container>
    <Row className="movie-detail-content">
      <Col xl={5} md={5} xs={12} className="poster-col">
        <img
          className="movie-poster"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={title}
        />
      </Col>

      <Col xl={7} md={7} xs={12} className="info-col">
        <h2 className="movie-title">{title}</h2>
        <div className="genre-badges">
          {genres.map((genre) => (
            <Badge bg="secondary" key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>
        <p><strong>Budget:</strong> ${budget.toLocaleString()}</p>
        <p><strong>Release Date:</strong> {release_date}</p>
        <p><strong>Overview:</strong> {overview}</p>
      </Col>
    </Row>

    {/* 트레일러 섹션 */}
    <div className="trailer-section">
      <h3>Trailer</h3>
      <div className="trailer-video-box">
        영상은 여기에...
      </div>
    </div>
  </Container>
</div>
