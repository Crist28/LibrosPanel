export interface Libro {
    _id: string
    titulo: string;
    precio: number;
    stock: number;
    categoria: string;
    nventas: number;
    portada: string;
    createdAt: string;
}

export interface LibroResponse {
    data: Libro[];
    message?: string;
}
