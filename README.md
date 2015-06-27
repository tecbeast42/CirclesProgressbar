# CirclesProgressbar
A jQuery Plugin for several Circle Shaped Progressbars

## Installation
	npm install jquery-circles-progressbar --save

## Usage
	<script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.js"></script>
	<script type="text/javascript" src="../dist/jquery.circles-progressbar.js"></script>

	$(element).circlesProgress(optionsObject);

#### e.g.
	optionsObject = {
		'size':150, // 150px width and height
		'progress': 50, // fillup in percent
		'innerColor': 'rgb(255,0,0)',
		'outerColor': '#00F',
		'borderSize': 4, // width of the border
	}

### Avaible Options
	- size 
	- progress
	- borderSize
	- innerColor
	- outerColor
	- initialProgress
	- innerOpacity
	- outerOpacity

## Release History
	0.1.0 Initial release