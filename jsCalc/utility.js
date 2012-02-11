function isNumber(o) {
	return typeof(o) == 'number';
}

function isObject(o) {
	return typeof(o) == 'object';
}

function isInteger(n) {
   return typeof(n) == 'number' && n % 1 == 0;
}

function getVector(m) {
	if (m.cols() == 1) {
		return m.col(1);
	} else if (m.rows() == 1) {
		return m.row(1);
	} else {
		return NaN;
	}
}

function dot(a, b) {
	if (isObject(a) && isObject(b)) {
		var v1 = getVector(a)
		var v2 = getVector(b);
		
		if (isObject(v1) && isObject(v2)) {	
			return v1.dot(v2);
		}
	}
	
	return NaN;
}

function cross(a, b) {
	if (isObject(a) && isObject(b)) {
		var v1 = getVector(a)
		var v2 = getVector(b);
		
		if (isObject(v1) && isObject(v2)) {	
			return v1.cross(v2);
		}
	}
	
	return NaN;
}

function power(a, b) {		
	if (b < 0) {
		return power(a.inverse(), -b);
	} else if (b == 0) {
		return Matrix.I(a.rows());
	} else if (b == 1) {
		return a;
	} else {
		if (b % 2) {
			return power(a, b-1).multiply(a);
		} else {
			var ans = power(a, b/2)
			return ans.multiply(ans);
		}
	}
}

var Utility = {
	"add" : function(a, b) {
		if (isNumber(a) && isNumber(b)) {
			return a+b;
		} else if (isObject(a) && isObject(b)) {
			return a.add(b);
		}
		return NaN;
	},
	"subtract" : function(a, b) {
		if (isNumber(a) && isNumber(b)) {
			return a-b;
		} else if (isObject(a) && isObject(b)) {
			return a.subtract(b);
		}
		return NaN;
	},
	"multiply" : function(a, b) {
		if (isNumber(a)) {
			if (isNumber(b)) {
				return a*b;
			} else if (isObject(b)) {
				return b.multiply(a);
			}
		} else if (isObject(a)) {
			return a.multiply(b);
		}
		return NaN;
	},
	"divide" : function(a, b) {
		if (isNumber(a) && isNumber(b)) {
			return a/b;
		}
		return NaN;
	},
	"negate" : function(a) {
		if (isNumber(a)) {
			return -a;
		} else if (isObject(a)) {
			return a.multiply(-1);
		}
		return NaN;
	},
	"power" : function(a,b) {
		if (isNumber(a) && isNumber(b)) {
			return Math.pow(a,b);
		} else if (isObject(a) && a.isSquare() && isInteger(b)) {
			return power(a, b);			
		}
		return NaN;
	},
	"factorial" : function(a) {
		if (isInteger(a)) {
			if (a == 0) {
				return 1;
			} else if (a > 0) {
				var ans = 1;
				for (;a > 0; --a) {
					ans *= a;
				}
				return ans;
			}
		}
		return NaN;
	},
};
