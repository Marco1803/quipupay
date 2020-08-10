

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
        // calcula total pagaginas
        let totalPages = Math.ceil(totalItems / pageSize);
          // verificar que la pagina actual no este fuera de rango
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // menos de 10 páginas en total, así que muestre todo
            startPage = 1;
            endPage = totalPages;
        } else {
            // Mas de 10 paginas en total para calcular las paginas de inicio y final.
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calcula los indices de inicio y final
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // crear una matriz de paginas (ng-repetir/pag1,pag2,...)
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        // devuelve el objeto con todas las propiedades que requiere la vista
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
  }
  