var elixir = require('laravel-elixir');

elixir(function(mix) {

	mix.browserify(['index.js'],'build/','module/');


});