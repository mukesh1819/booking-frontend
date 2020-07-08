Array.prototype.chunk = function (size) {
    var chunks = []
    var i, j, newChunk;
    for (i = 0, j = this.length; i < j; i += size) {
        newChunk = this.slice(i, i + size);
        chunks.push(newChunk);
    }
    return chunks;
}

String.prototype.pluralize = function (count, suffix = 's') {
    return `${count} ${this}${count !== 1 ? suffix : ''}`;
}