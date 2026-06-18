export class PlaylistResponseDTO {
  constructor(video) {
    this.id = video.id;
    this.titulo = video.titulo;
    this.url = video.url;
    this.salaId = video.salaId;
    // Aqui garantimos que a resposta sempre terá essa estrutura exata
  }
}