var elixir = require('laravel-elixir');

elixir(function(mix) {
	mix.browserify(['jquery.circles-progressbar.js'],'dist/','src/');
	mix.copy('dist/bundle.js','dist/jquery.circles-progressbar.js');
});