package common

import "math"

var margin = 0.0001

func FloatsAreSame(a float32, b float32) bool {
	return math.Abs(float64(a - b)) < margin
}
