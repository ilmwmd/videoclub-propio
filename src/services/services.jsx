import axios from 'axios';

const MOVIES_API_URL = 'http://localhost:3000/movies';

const movieService = {
  getAll: (signal) => axios.get(MOVIES_API_URL, { signal }),
  create: (pelicula) => axios.post(MOVIES_API_URL, pelicula),
  update: (id, pelicula) =>
    axios.patch(`${MOVIES_API_URL}/${encodeURIComponent(id)}`, pelicula),
  delete: (id) =>
    axios.delete(`${MOVIES_API_URL}/${encodeURIComponent(id)}`),
};

export default movieService;
