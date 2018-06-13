// calcs.js

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

export const toFaranheit = (celsius) => {
	return celsius * 9.0 / 5.0 + 32
}

export const skyconCode = (s) => {
	var res = s.toUpperCase()
	var out = res.replaceAll('-', '_')
	return out
}

export const roundN = (x, n) => {
	var base = Math.pow(10, n) 
	return Math.round(x * base) / base
}