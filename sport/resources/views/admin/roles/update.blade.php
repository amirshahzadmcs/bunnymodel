@include('admin.layouts.header')

<div class="content">
    <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Update Role</li>
        </ol>
    </nav>

    <h2 class="mb-4">Update Role</h2>

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

            <form method="POST" action="{{ route('admin.roles.update', $role->id) }}" class="row g-3 mb-6">
                @csrf
                @method('PUT')

                <!-- Role Name -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('name') is-invalid @enderror"
                               type="text"
                               id="name"
                               name="name"
                               value="{{ old('name', $role->name) }}"
                               placeholder="Role Name"
                               required autofocus />
                        <label for="name">Role Name</label>
                        @error('name')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Slug -->
                <div class="col-sm-6 col-md-6">
                    <div class="form-floating">
                        <input class="form-control @error('slug') is-invalid @enderror"
                               type="text"
                               id="slug"
                               name="slug"
                               value="{{ old('slug', $role->slug) }}"
                               placeholder="Slug"
                               required />
                        <label for="slug">Slug</label>
                        @error('slug')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
                <div class="col-sm-12 col-md-12">
                    <h6 class="mb-2">Choose Permissions</h6>
                    <div class="row">
                        @foreach($permissions as $permission)
                            <div class="col-md-3">
                                <div class="form-check">
                                    <input class="form-check-input" 
                                        type="checkbox" 
                                        name="permissions[]" 
                                        value="{{ $permission->name }}" 
                                        id="permission-{{ $permission->id }}"
                                        {{ in_array($permission->name, $rolePermissions) ? 'checked' : '' }}/>
                                    <label class="form-check-label" for="permission-{{ $permission->id }}">
                                        {{ $permission->name }}
                                    </label>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <!-- Submit Button -->
                <div class="col-12 gy-6">
                    <div class="row g-3">
                        <div class="col-auto">
                            <button class="btn btn-subtle-secondary px-5 px-sm-15" type="submit">Update Role</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>


@include('admin.layouts.footer')
