var elixir = require('laravel-elixir');

elixir(function(mix) {
	mix.browserify(['jquery.circles-progressbar.js'],'dist/','src/');
	mix.scripts('dist/bundle.js','dist/','./');
	mix.copy('dist/all.js','dist/jquery.circles-progressbar.js');
});