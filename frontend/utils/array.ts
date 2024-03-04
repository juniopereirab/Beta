export function replaceItem(array: any[], newItem: any) {
    return array.map(item => {
        // Se o ID do item atual corresponder ao ID do novo item,
        // substituímos o item atual pelo novo item
        if (item.id === newItem.id) {
            return newItem;
        } else {
            // Caso contrário, mantemos o item atual inalterado
            return item;
        }
    });
}