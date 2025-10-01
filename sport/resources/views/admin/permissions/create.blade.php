@include('admin.layouts.header')

<div class="content">
    <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Create Permission</li>
        </ol>
    </nav>
    <h2 class="mb-4">Create Permission</h2>

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

            <form method="POST" action="{{ route('admin.permissions.store') }}" class="row g-3 mb-6">
                @csrf

                <!-- Permission Name -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('name') is-invalid @enderror" 
                               type="text" 
                               id="name" 
                               name="name" 
                               value="{{ old('name') }}" 
                               placeholder="Permission Name" 
                               required />
                        <label for="name">Permission Name</label>
                        @error('name')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="col-12 gy-6">
                    <div class="row g-3">
                        <div class="col-auto">
                            <button class="btn btn-subtle-secondary px-5 px-sm-15" type="submit">Create Permission</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>

@include('admin.layouts.footer')
