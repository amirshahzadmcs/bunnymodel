<!DOCTYPE html>
<html lang="en-US" dir="ltr" data-navigation-type="default" data-navbar-horizontal-shape="default">

  
<!-- Mirrored from prium.github.io/phoenix/v1.23.0/pages/authentication/simple/sign-up.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 25 Jul 2025 07:53:59 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>Phoenix</title>

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
    <main class="main" id="top">
	  <div class="container">
		<div class="row flex-center min-vh-100 py-5">
		  <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
			<a class="d-flex flex-center text-decoration-none mb-4" href="{{ route('register') }}">
			  <div class="d-flex align-items-center fw-bolder fs-3 d-inline-block">
				<img src="{{ asset('admin/assets/img/icons/logo.png') }}" alt="phoenix" width="58" />
			  </div>
			</a>

			<div class="text-center mb-7">
			  <h3 class="text-body-highlight">Sign Up</h3>
			  <p class="text-body-tertiary">Create your account today</p>
			</div>


			<!-- Laravel Registration Form -->
			<form method="POST" action="{{ route('register.post') }}">
			  @csrf

			  <div class="mb-3 text-start">
				<label class="form-label" for="name">Name</label>
				<input class="form-control @error('name') is-invalid @enderror" id="name" type="text" name="name" value="{{ old('name') }}" placeholder="Name" required autofocus />
				@error('name')
				  <span class="text-danger fs-8">{{ $message }}</span>
				@enderror
			  </div>

			  <div class="mb-3 text-start">
				<label class="form-label" for="email">Email address</label>
				<input class="form-control @error('email') is-invalid @enderror" id="email" type="email" name="email" value="{{ old('email') }}" placeholder="name@example.com" required />
				@error('email')
				  <span class="text-danger fs-8">{{ $message }}</span>
				@enderror
			  </div>

			  <div class="row g-3 mb-3">
				<div class="col-sm-6">
				  <label class="form-label" for="password">Password</label>
				  <div class="position-relative" data-password="data-password">
					<input class="form-control align-items-center form-icon-input pe-6 @error('password') is-invalid @enderror" id="password" type="password" name="password" placeholder="Password" required />
				  </div>
				  @error('password')
					<span class="text-danger fs-8">{{ $message }}</span>
				  @enderror
				</div>

				<div class="col-sm-6">
				  <label class="form-label" for="password_confirmation">Confirm Password</label>
				  <div class="position-relative" data-password="data-password">
					<input class="form-control align-items-center  form-icon-input pe-6" id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirm Password" required />
				  </div>
				</div>
			  </div>

			  <div class="form-check mb-3">
				<input class="form-check-input @error('terms') is-invalid @enderror" id="termsService" type="checkbox" name="terms" required />
				<label class="form-label fs-9 text-transform-none" for="termsService">I accept the <a href="#!">terms</a> and <a href="#!">privacy policy</a></label>
				@error('terms')
				  <span class="text-danger fs-8">{{ $message }}</span>
				@enderror
			  </div>

			  <button class="btn btn-primary w-100 mb-3" type="submit">Sign Up</button>

			  <div class="text-center">
				<a class="fs-9 fw-bold" href="{{ route('login') }}">Sign in to an existing account</a>
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