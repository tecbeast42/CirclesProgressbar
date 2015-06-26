<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Circles</title>
	<style type="text/css">
		div {
			margin:5px;
		}
	</style>
</head>
<body>
	<div id="test1"></div>
	<div id="test2"></div>
	<div id="test3"></div>
	<script type="text/javascript" src="../build/bundle.js"></script>
	<script type="text/javascript">
		jQuery(document).ready(function () {
			jQuery('#test1').circlesProgress({'progress':'10','borderSize':'2'});
			var c2 = jQuery('#test2').circlesProgress({'size':'100','progress':'66','initialProgress':'100'});
			jQuery('#test3').circlesProgress({'size':'200','progress':'100'});
			var delay = setTimeout(function () {
				c2.update({'progress':'10'});
			},3000);
		});
	</script>
</body>
</html>