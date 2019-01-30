module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true,
                "modules": true,
                "allowArrowFunctions": true,
                "experimentalObjectRestSpread": true,
            }
        }
    },
    "env": {
        "node": true,
        "mocha": true
    },
    "rules":{
        "eqeqeq": 1,
        "comma-dangle": 0
    }
};