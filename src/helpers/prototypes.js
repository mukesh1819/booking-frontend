Array.prototype.chunk = function (size) {
    var chunks = []
    var i, j, newChunk;
    for (i = 0, j = this.length; i < j; i += size) {
        newChunk = this.slice(i, i + size);
        chunks.push(newChunk);
    }
    return chunks;
}