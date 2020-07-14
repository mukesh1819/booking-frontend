Array.prototype.chunk = function(size) {
	var chunks = [];
	var i, j, newChunk;
	for (i = 0, j = this.length; i < j; i += size) {
		newChunk = this.slice(i, i + size);
		chunks.push(newChunk);
	}
	return chunks;
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.pluralize = function(count, suffix = 's') {
	return `${count} ${this}${count !== 1 ? suffix : ''}`;
};

String.prototype.titleize = function() {
	var string_array = this.capitalize().split('_');
	return string_array.join(' ');
};

Object.prototype.pick = function(arr) {
	return arr.reduce((acc, curr) => (curr in this && (acc[curr] = this[curr]), acc), {});
};
