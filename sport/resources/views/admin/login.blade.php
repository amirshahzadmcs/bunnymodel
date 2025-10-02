<!DOCTYPE html>
<html lang="en-US" dir="ltr" data-navigation-type="default" data-navbar-horizontal-shape="default">
<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login | Bunny Model</title>

  <!-- ===============================================-->
  <!--    Favicons-->
  <!-- ===============================================-->
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('public/admin/assets/img/favicons/apple-touch-icon.png') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('public/admin/assets/img/favicons/favicon-32x32.png') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('public/admin/assets/img/favicons/favicon-16x16.png') }}">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('public/admin/assets/img/favicons/favicon.ico') }}">
  <link rel="manifest" href="{{ asset('public/admin/assets/img/favicons/manifest.json') }}">
  <meta name="msapplication-TileImage" content="{{ asset('public/admin/assets/img/favicons/mstile-150x150.png') }}">
  <script src="{{ asset('public/admin/vendors/simplebar/simplebar.min.js') }}"></script>
  <script src="{{ asset('public/admin/assets/js/config.js') }}"></script>

  <!-- ===============================================-->
  <!--    Stylesheets-->
  <!-- ===============================================-->
  <link rel="preconnect" href="https://fonts.googleapis.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&amp;display=swap"
    rel="stylesheet">
  <link href="{{ asset('public/admin/assets/css/theme.min.css') }}" type="text/css" rel="stylesheet" id="style-default">
  <link href="{{ asset('public/admin/assets/css/style.css') }}" type="text/css" rel="stylesheet">

</head>

<body>
  <!-- ===============================================-->
  <!--    Main Content-->
  <!-- ===============================================-->
  <main class="main" id="top">
    <div class="container-fluid login-screen login-full-screen">
      <!--/.bg-holder-->
      <div class="row flex-center position-relative min-vh-100 g-0 py-5">
        <div class="col-11 col-sm-10 col-xl-8">
          <div class="row justify-content-center gy-7">
            <div class="col-md-6 d-lg-block d-none">
              <div class="auth-title-box me-5">
                <img src="{{ asset('public/admin/assets/img/icons/logo-1.png') }}" alt="phoenix" width="128" />
              </div>
            </div>
            <div class="col-md-5 col-sm-12">
              <div class="auth-form-box">
                <div class="text-center mb-5">
                  <div class="d-lg-none d-flex flex-center text-decoration-none mb-6" href="#.">
                          <img src="{{ asset('public/admin/admin/assets/img/icons/logo-1.png') }}" alt="phoenix" width="128">
                        </div>
                  <h3 class="text-body-highlight">Sign In</h3>
                  <!-- <p class="text-body-tertiary">Get access to your account</p> -->
                </div>


                <form method="POST" action="{{ route('login.post') }}">
					@csrf

					<!-- Email field -->
					<div class="mb-4 text-start">
						<label class="form-label" for="email">Email address</label>
						<div class="form-icon-container">
							<input 
								class="form-control form-icon-input @error('email') is-invalid @enderror" 
								id="email" 
								type="email" 
								name="email" 
								placeholder="Enter your e-mail" 
								value="{{ old('email') }}" 
								required 
								autofocus 
							/>
							<div class="icon-log">
								<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M2.58789 10.5657C2.58789 7.31266 2.58789 5.68615 3.59848 4.67556C4.60906 3.66498 6.23557 3.66498 9.4886 3.66498H12.9389C16.192 3.66498 17.8185 3.66498 18.8291 4.67556C19.8397 5.68615 19.8397 7.31266 19.8397 10.5657C19.8397 13.8187 19.8397 15.4452 18.8291 16.4558C17.8185 17.4664 16.192 17.4664 12.9389 17.4664H9.4886C6.23557 17.4664 4.60906 17.4664 3.59848 16.4558C2.58789 15.4452 2.58789 13.8187 2.58789 10.5657Z" stroke="#4D4D4D" stroke-width="1.41029" />
									<path d="M6.03711 7.11533L7.89935 8.66719C9.48361 9.98741 10.2757 10.6475 11.2126 10.6475C12.1495 10.6475 12.9417 9.98741 14.5259 8.66719L16.3882 7.11533" stroke="#4D4D4D" stroke-width="1.41029" stroke-linecap="round" />
								</svg>
							</div>
						</div>
						@error('email')
							<span class="text-danger fs-7">{{ $message }}</span>
						@enderror
					</div>

					<!-- Password field -->
					<div class="mb-3 text-start">
						<label class="form-label" for="password">Password</label>
						<div class="form-icon-container" data-password="data-password">
							<input 
								class="form-control form-icon-input pe-6 @error('password') is-invalid @enderror" 
								id="password" 
								type="password" 
								name="password" 
								placeholder="Password" 
								data-password-input="data-password-input" 
								required 
							/>
							<div class="icon-log">
								<svg width="22" height="21" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M2.74805 17.8301C2.74805 14.7659 2.74805 13.2339 3.69995 12.282C4.65185 11.3301 6.18392 11.3301 9.24805 11.3301H17.9147C20.9788 11.3301 22.5109 11.3301 23.4628 12.282C24.4147 13.2339 24.4147 14.7659 24.4147 17.8301C24.4147 20.8942 24.4147 22.4263 23.4628 23.3782C22.5109 24.3301 20.9788 24.3301 17.9147 24.3301H9.24805C6.18392 24.3301 4.65185 24.3301 3.69995 23.3782C2.74805 22.4263 2.74805 20.8942 2.74805 17.8301Z" stroke="#4D4D4D" stroke-width="1.5" />
									<path d="M7.08154 11.3301V9.16341C7.08154 5.57356 9.99169 2.66341 13.5815 2.66341C17.1714 2.66341 20.0815 5.57356 20.0815 9.16341V11.3301" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</div>
						</div>
						@error('password')
							<span class="text-danger fs-7">{{ $message }}</span>
						@enderror
					</div>

					<!-- Remember & Forgot password -->
					<div class="row flex-between-center mb-7">
						<div class="col-auto">
							<div class="form-check mb-0">
								<input class="form-check-input" id="remember" type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }} />
								<label class="form-check-label mb-0" for="remember">Remember me</label>
							</div>
						</div>
					</div>

					<!-- Submit button -->
					<button class="btn btn-primary w-100 mb-3" type="submit">Sign In</button>
				</form>

				
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>

</body>

</html>