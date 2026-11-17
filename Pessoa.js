class Pessoa{
    #nome
    #matricula
    #estado

    constructor(nome, matricula, estado){
        this.#nome = nome;
        this.#matricula = matricula;
        this.#estado = estado;
    }
    
    getNome() { return this.#nome; }
    getMatricula() { return this.#matricula; }
    getEstado() { return this.#estado; }

    setNome(nome) { this.#nome = nome; }
    setMatricula(matricula) { this.#matricula = matricula; }
    setEstado(estado) { this.#estado = estado; }
}