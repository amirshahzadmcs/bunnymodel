<!DOCTYPE html>
<html lang="en-US" dir="ltr" data-navigation-type="default" data-navbar-horizontal-shape="default">

  
<meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>Bunny Models</title>

    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
	<link rel="apple-touch-icon" sizes="180x180" href="{{ asset('admin/assets/img/favicons/apple-touch-icon.png') }}">
	<link rel="icon" type="image/png" sizes="32x32" href="{{ asset('admin/assets/img/favicons/favicon-32x32.png') }}">
	<link rel="icon" type="image/png" sizes="16x16" href="{{ asset('admin/assets/img/favicons/favicon-16x16.png') }}">
	<link rel="shortcut icon" type="image/x-icon" href="{{ asset('admin/assets/img/favicons/favicon.ico') }}">
	<link rel="manifest" href="{{ asset('admin/assets/img/favicons/manifest.json') }}">
	<meta name="msapplication-TileImage" content="{{ asset('admin/assets/img/favicons/mstile-150x150.png') }}">
	<meta name="theme-color" content="#ffffff">

	<script src="{{ asset('admin/vendors/simplebar/simplebar.min.js') }}"></script>
	<script src="{{ asset('admin/assets/js/config.js') }}"></script>

	<!-- Stylesheets -->
	<link rel="preconnect" href="https://fonts.googleapis.com/">
	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&amp;display=swap" rel="stylesheet">
	<link href="{{ asset('admin/vendors/simplebar/simplebar.min.css') }}" rel="stylesheet">
	<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
	<link href="{{ asset('admin/assets/css/theme-rtl.min.css') }}" type="text/css" rel="stylesheet" id="style-rtl">
	<link href="{{ asset('admin/assets/css/theme.min.css') }}" type="text/css" rel="stylesheet" id="style-default">
	<link href="{{ asset('admin/assets/css/user-rtl.min.css') }}" type="text/css" rel="stylesheet" id="user-style-rtl">
	<link href="{{ asset('admin/assets/css/user.min.css') }}" type="text/css" rel="stylesheet" id="user-style-default">


  </head>

  <body>
    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
  <div class="container">
    <div class="row flex-center min-vh-100 py-5">
	  <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
		<a class="d-flex flex-center text-decoration-none mb-4" href="{{ url('/login') }}">
		  <div class="d-flex align-items-center fw-bolder fs-3 d-inline-block">
			<img src="{{ asset('admin/assets/img/icons/logo.png') }}" alt="Admin Logo" width="58" />
		  </div>
		</a>

		<div class="text-center mb-7">
		  <h3 class="text-body-highlight">Sign In</h3>
		  <p class="text-body-tertiary">Get access to your account</p>
		</div>

		<!-- Login Form -->
		<form method="POST" action="{{ route('login.post') }}">
		  @csrf

		  <div class="mb-3 text-start">
			<label class="form-label" for="email">Email address</label>
			<div class="form-icon-container">
			  <input class="form-control form-icon-input @error('email') is-invalid @enderror" id="email" type="email" name="email" placeholder="name@example.com" value="{{ old('email') }}" required autofocus />
			  <span class="fas fa-user text-body fs-9 form-icon"></span>
			</div>
			@error('email')
			  <span class="text-danger fs-7">{{ $message }}</span>
			@enderror
		  </div>

		  <div class="mb-3 text-start">
			<label class="form-label" for="password">Password</label>
			<div class="form-icon-container" data-password="data-password">
			  <input class="form-control form-icon-input pe-6 @error('password') is-invalid @enderror" id="password" type="password" name="password" placeholder="Password" data-password-input="data-password-input" required />
			  <span class="fas fa-key text-body fs-9 form-icon"></span>
			</div>
			@error('password')
			  <span class="text-danger fs-7">{{ $message }}</span>
			@enderror
		  </div>

		  <div class="row flex-between-center mb-7">
			<div class="col-auto">
			  <div class="form-check mb-0">
				<input class="form-check-input" id="remember" type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }} />
				<label class="form-check-label mb-0" for="remember">Remember me</label>
			  </div>
			</div>
			<div class="col-auto">
			  <a class="fs-9 fw-semibold" href="{{ url('/admin/forgot-password') }}">Forgot Password?</a>
			</div>
		  </div>

		  <button class="btn btn-primary w-100 mb-3" type="submit">Sign In</button>

		  <div class="text-center">
			<a class="fs-9 fw-bold" href="#">Create an account</a>
		  </div>
		</form>
	  </div>
	</div>

  </div>

</main>

    <script src="{{ asset('admin/vendors/popper/popper.min.js') }}"></script>
	<script src="{{ asset('admin/vendors/bootstrap/bootstrap.min.js') }}"></script>
	<script src="{{ asset('admin/vendors/fontawesome/all.min.js') }}"></script>
	<script src="{{ asset('admin/assets/js/phoenix.js') }}"></script>

  </body>
</html>