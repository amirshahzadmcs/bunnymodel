@include('admin.layouts.header')
<div class="content">
        <nav class="mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Register new user</li>
          </ol>
        </nav>
        <h2 class="mb-4">Register new user</h2>
        <div class="row">
          <div class="col-xl-8">
			@if(session('success'))
				<div class="alert alert-success">
					{{ session('success') }}
				</div>
			@endif
            <form method="POST" action="{{ route('register.post') }}" class="row g-3 mb-6">
				@csrf

				<!-- Name -->
				<div class="col-sm-6 col-md-6">
					<div class="form-floating">
						<input class="form-control @error('name') is-invalid @enderror" 
							type="text" 
							id="name" 
							name="name" 
							value="{{ old('name') }}" 
							placeholder="Name" 
							required 
							autofocus />
						<label for="name">Name</label>
						@error('name')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>

				<!-- Email -->
				<div class="col-sm-6 col-md-6">
					<div class="form-floating">
						<input class="form-control @error('email') is-invalid @enderror" 
							type="email" 
							id="email" 
							name="email" 
							value="{{ old('email') }}" 
							placeholder="Email" 
							required />
						<label for="email">Email address</label>
						@error('email')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<div class="col-12">
					<div class="form-floating">
						<select class="form-select @error('role') is-invalid @enderror" name="role" id="roleSelect">
							<option value="">Select Role</option>
							
							@foreach($roles as $role)
								<option value="{{ $role->id }}" {{ old('role') == $role->id ? 'selected' : '' }}>
									{{ $role->name }}
								</option>
							@endforeach
							
						</select>
						@error('role')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>


				<!-- Password -->
				<div class="col-sm-6 col-md-6">
					<div class="form-floating position-relative" data-password="data-password">
						<input class="form-control @error('password') is-invalid @enderror form-icon-input pe-6" 
							type="password" 
							id="password" 
							name="password" 
							placeholder="Password" 
							required />
						<label for="password">Password</label>
						@error('password')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>

				<!-- Confirm Password -->
				<div class="col-sm-6 col-md-6">
					<div class="form-floating position-relative" data-password="data-password">
						<input class="form-control form-icon-input pe-6" 
							type="password" 
							id="password_confirmation" 
							name="password_confirmation" 
							placeholder="Confirm Password" 
							required />
						<label for="password_confirmation">Confirm Password</label>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="col-12 gy-6">
					<div class="row g-3">
						<div class="col-auto">
							<button class="btn btn-subtle-secondary  px-5 px-sm-15" type="submit">Register User</button>
						</div>
					</div>
				</div>
			</form>

          </div>
        </div>
@include('admin.layouts.footer')