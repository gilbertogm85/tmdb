<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Movies</title>
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Lato:300,700|Oswald:300" rel="stylesheet">
	<link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-lg-10 offset-lg-1">
				<div id="app"></div>
			</div>
		</div> 
	</div>
	<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>