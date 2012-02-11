
function getAngleType() {
	return $("input[name='angle']:checked").val();
}

function toRadian(theta) {	
	var angle = getAngleType();
	switch (angle) {
	case 'd':
		return theta/180*Math.PI;
		break;
	case 'g':
		return theta/200*Math.PI;
		break;
	case 'r':
		return theta;
		break;
	}

	return theta;
}
	
function fromRadian(theta) {
	var angle = getAngleType();
	switch (angle) {
	case 'd':
		return theta/Math.PI*180;
		break;
	case 'g':
		return theta/Math.PI*200;
		break;
	case 'r':
		return theta;
		break;
	}
	
	return theta;
}

function format(n) {
	if (typeof(n) == "object") {
		if (n == null) {
			return "undefined";
		} else {
			return n.inspect().split('\n').join('\n\t\t');
		}
	} else if (typeof(n) == 'string') {
		return n;
	} else if (isNaN(n)) {
		return "undefined";
	} else {
		var mode = $("input[name='format']:checked").val();
		var precision = Number($('#prec').val());

		switch (mode) {
		case 's':
			if (Math.abs(n) >= 1e10 || Math.abs(n) <= 1e-6) {
				if (Math.abs(n) <= 1e-15) {
					return '0';
				}
				return n.toExponential(precision);
			} else {
				if (Math.abs(n) < 1) {
					return Number(n.toPrecision(precision)).toString();
				} else {
					return Number(n.toFixed(precision)).toString();
				}
			}
		case 'f':
			return n.toFixed(precision);
		}
	}
	
	return n;
}

var symTab = {};
var functions = {
			"abs":Math.abs,
			"asin": function(x) { return fromRadian(Math.asin(x)); },
			"acos": function(x) { return fromRadian(Math.acos(x)); },
			"atan": function(x) { return fromRadian(Math.atan(x)); },
			"atan2": function(x,y) { return fromRadian(Math.atan2(x,y)); },
			"floor":Math.floor,
			"ceil":Math.ceil,
			"round":Math.round,
			"exp": Math.exp,	
			"log": Math.log,	
			"max": Math.max,	
			"min": Math.min,	
			"random": Math.random,	
			"sin": function(theta) { return Math.sin(toRadian(theta)); },	
			"cos": function(theta) { return Math.cos(toRadian(theta)); },
			"tan": function(theta) { return Math.tan(toRadian(theta)); },
			'I': function(n) { return Matrix.I(n); },
			'identity': function(n) { return Matrix.I(n); },
			'zeros': function(m, n) { return Matrix.Zero(m, n); },
			'augment': function(a, b) { 
				var ans = a.dup(); 
				return ans.augment(b);
			},
			'inv': function(m) { return m.inv(); },
			'det': function(m) { return m.det(); },
			'ref': function(m) { return m.toRightTriangular(); },
			'rref': function(m) {
				var result = m.toRightTriangular();
				var i, j, k;
				for (i = result.rows()-1; i > 0; --i) {
					var pivot = 0;
					for (pivot = 0; pivot < result.cols(); ++pivot) {
							if (Math.abs(result.elements[i][pivot]) > 1e-6) {
								break;
							}
					}
					if (pivot >= result.cols()) continue;
					var factor = result.elements[i][pivot];
					result.elements[i][pivot] = 1;
					for (j = pivot+1; j < result.cols(); ++j) {
						result.elements[i][j] /= factor;
					}
					
					for (j = 0; j < i; ++j) {
						if (Math.abs(result.elements[j][pivot]) > 1e-6) {
								var factor = result.elements[j][pivot];
								result.elements[j][pivot] = 0;								
								for (k = pivot+1; k < result.cols(); ++k) {
									result.elements[j][k] -= result.elements[i][k] * factor;
								}
						}
					}

				}
				
				return result;
			},
			'rank': function(m) { return m.rank(); },
			'dot': dot,
			'cross': cross,
			'len': function(v) { return sqrt(v.dot(v)); },
			'tr': function(m) { return m.tr(); },
			'transpose': function(m) { return m.transpose(); },
		};

$(document).ready(function() {
	var trials = 0;
	
	function parse() {
		var input = $('#input').val();	
		var ans;
		
		try {
			ans = parser.parse(input);
		} catch (err) {
			ans = "Syntax Error";
		}

		ans = format(ans);
		
		var result = "\nIn[" + trials + "]:  \t" + input;
		result += "\nOut[" + trials + "]: \t" + ans + "\n";
		result += $('#output').val();
		$('#output').val(result);	
		$('#input').val("");
		++trials;	
	}

	$('#input').bind('keydown', function (e) {
		var key = e.keyCode || e.which;
		if (key === 13) { 
			parse();
			 e.preventDefault();
		}
	
	});    

	$('#submit').click(function() { parse(); });
});