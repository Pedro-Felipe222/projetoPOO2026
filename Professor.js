class Professor extends Pessoa{
    #formacao
    #email

    constructor(nome, mat, estado, forma, email){
        super(nome, matricula, null);
        this.#formacao = formacao;
        this.#formacao = formacao;
    }
    
    getFormacao() { return this.#formacao; }
    getEmail() { return this.#email; }

    setFormacao(formacao) { this.#formacao = formacao; }
    setEmail(email) { this.#email = email; }
}