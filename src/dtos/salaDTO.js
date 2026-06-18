export class SalaResponseDTO {
  constructor(sala) {
    this.id = sala.id;
    this.nome = sala.nome;
    this.status = sala.status;
    // Omitimos, por exemplo, um campo interno como 'criadoEm' ou 'versao'
  }
}