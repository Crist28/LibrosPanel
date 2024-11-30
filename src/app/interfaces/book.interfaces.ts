export interface Libro {
    _id: string
    titulo: string;
    precio: number;
    stock: number;
    categoria: string;
    nventas: number;
    portada: string;
    autor: string;
    isbn: string;
    anio_publicacion: number;
    createdAt: string;
}

export interface LibroResponse {
    data: Libro[];
    message?: string;
}
