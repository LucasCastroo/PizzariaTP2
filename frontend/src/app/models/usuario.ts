export interface Usuario {
  id: number,
  cpf: string;
  email: string;
  nascimento: string;
  nome: string;
  senha: string;
  nomeImagem: string;
}

export interface UsuarioCreate{
  nome: string;
  cpf: string;
  email: string;
  nascimento: string;
  senha: string;
}
