//REDUCER************funcao redutora
import { List } from 'immutable';

function trocaFoto(lista, fotoId, callbackAtualizapropriedades) {
    
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
    const novasPropriedades = callbackAtualizapropriedades(fotoEstadoAntigo)
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);
    return lista.set(indiceDaLista, fotoEstadoNovo);
}

export function timeline(state = [], action) {

    if (action.type === 'LISTAGEM') {
        return new List(action.fotos);
    }

    if (action.type === 'COMENTARIO') {
        
        return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);
            return { comentarios: novosComentarios };
        });
    }

    if (action.type === 'LIKE') {
        
        console.log(state);
        console.log(action.fotoId);
        return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
            
            console.log(fotoEstadoAntigo);
            const likeada = !fotoEstadoAntigo.likeada;

            const liker = action.liker;
            const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === liker.login);

            let novosLikers;
            if (possivelLiker === undefined) {
                novosLikers = fotoEstadoAntigo.likers.concat(liker);
            } else {
                novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== liker.login);
            }

            return { likeada, likers: novosLikers };

        });
        
    }

    return state;
}

