export default {
	"env": {
		"node": true,
		"es2021": true
	},
	"extends": ["esnext", "esnext/style-guide", "node", "node/style-guide", "eslint:recommended"],
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"prefer-const": ["error", {
			"destructuring": "any",
			"ignoreReadBeforeAssign": false
		}],
		"no-var": "error"
	}
};
