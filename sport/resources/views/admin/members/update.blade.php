@include('admin.layouts.header')

<div class="content">
    <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Update Member</li>
        </ol>
    </nav>

    <h2 class="mb-4">Update Member</h2>

    <div class="row">
        <div class="col-xl-8">
            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            @if(session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif

            <form method="POST" action="{{ route('admin.members.updateStore', $member->id) }}" class="row g-3 mb-6">
                @csrf
                @method('PUT')

                <!-- full_name -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('full_name') is-invalid @enderror" 
                               type="text" 
                               id="full_name" 
                               name="full_name" 
                               value="{{ old('full_name', $member->full_name) }}" 
                               placeholder="Name" 
                               required 
                               autofocus />
                        <label for="full_name">Name</label>
                        @error('full_name')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- phone -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('phone') is-invalid @enderror" 
                               type="tell" 
                               id="phone" 
                               name="phone" 
                               value="{{ old('phone', $member->phone) }}" 
                               placeholder="Phone Number" 
                                
                               autofocus />
                        <label for="phone">Phone Number</label>
                        @error('phone')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Country -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('country') is-invalid @enderror" 
                               type="tell" 
                               id="country" 
                               name="country" 
                               value="{{ old('country', $member->country) }}" 
                               placeholder="Country" 
                                
                               autofocus />
                        <label for="country">Country</label>
                        @error('country')
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
                               value="{{ old('email', $member->email) }}" 
                               placeholder="Email" 
                               required />
                        <label for="email">Email address</label>
                        @error('email')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
                <!-- Password (optional) -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating position-relative">
                        <input class="form-control @error('password') is-invalid @enderror form-icon-input pe-6" 
                               type="password" 
                               id="password" 
                               name="password" 
                               placeholder="New Password (optional)" />
                        <label for="password">Password</label>
                        @error('password')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Confirm Password -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating position-relative">
                        <input class="form-control form-icon-input pe-6" 
                               type="password" 
                               id="password_confirmation" 
                               name="password_confirmation" 
                               placeholder="Confirm Password" />
                        <label for="password_confirmation">Confirm Password</label>
                    </div>
                </div>

                <!-- Status -->
                <div class="col-12">
                    <div class="form-floating">
                        <select class="form-select @error('profile_status') is-invalid @enderror" name="profile_status">
                            <option value="approved" {{ old('profile_status', $member->profile_status) === 'approved' ? 'selected' : '' }}>Active</option>
                            <option value="pending" {{ old('profile_status', $member->profile_status) === 'pending' ? 'selected' : '' }}>Pending</option>
                            <option value="blocked" {{ old('profile_status', $member->profile_status) === 'blocked' ? 'selected' : '' }}>Blocked</option>
                        </select>
                        @error('profile_status')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                

                <!-- Submit Button -->
                <div class="col-12 gy-6">
                    <div class="row g-3">
                        <div class="col-auto">
                            <button class="btn btn-subtle-secondary  px-5 px-sm-15" type="submit">Update Member</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
@include('admin.layouts.footer')
