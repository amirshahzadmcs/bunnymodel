@include('admin.layouts.header')
<div class="content">
        <nav class="mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Add new page</li>
          </ol>
        </nav>
        <h2 class="mb-4">Add new page</h2>
        <div class="row">
          <div class="col-xl-8">
			@if(session('success'))
				<div class="alert alert-success">
					{{ session('success') }}
				</div>
			@endif
            <form method="POST" action="{{ route('admin.pages.store') }}" class="row g-3 mb-6">
				@csrf

				<!-- Name -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<input class="form-control @error('page_name') is-invalid @enderror" 
							type="text" 
							id="page_name" 
							name="page_name" 
							value="{{ old('page_name') }}" 
							placeholder="Page Name" 
							required 
							autofocus />
						<label for="page_name">Page Name</label>
						@error('page_name')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>

				<!-- slug -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<input class="form-control @error('slug') is-invalid @enderror" 
							type="text" 
							id="slug" 
							name="slug" 
							value="{{ old('slug') }}" 
							placeholder="slug" 
							required />
						<label for="slug">Page Slug</label>
						@error('slug')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<!-- meta_title -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<input class="form-control @error('meta_title') is-invalid @enderror" 
							type="text" 
							id="meta_title" 
							name="meta_title" 
							value="{{ old('meta_title') }}" 
							placeholder="Page Title" 
							required />
						<label for="meta_title">Page Title</label>
						@error('meta_title')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<!-- meta_description -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<textarea class="form-control @error('meta_description') is-invalid @enderror" 
							id="meta_description" 
							name="meta_description" 
							rows="3"
							placeholder="Page Description" 
							required >{{ old('meta_description') }}</textarea>
						<label for="meta_description">Meta Description</label>
						@error('meta_description')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<!-- meta_keywords -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<textarea class="form-control @error('meta_keywords') is-invalid @enderror" 
							id="meta_keywords" 
							name="meta_keywords" 
							rows="3"
							placeholder="Page Keywords" 
							 >{{ old('meta_keywords') }}</textarea>
						<label for="meta_keywords">Meta keywords</label>
						@error('meta_keywords')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<!-- canonical_url -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<input class="form-control @error('canonical_url') is-invalid @enderror" 
							type="text" 
							id="canonical_url" 
							name="canonical_url" 
							value="{{ old('canonical_url') }}" 
							placeholder="Canonical URL" 
							 />
						<label for="canonical_url">MeCanonicalta URL</label>
						@error('canonical_url')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>
				<!-- Submit Button -->
				<div class="col-12 gy-6">
					<div class="row g-3">
						<div class="col-auto">
							<button class="btn btn-subtle-secondary  px-5 px-sm-15" type="submit">Create Page</button>
						</div>
					</div>
				</div>
			</form>

          </div>
        </div>
@include('admin.layouts.footer')
<script>
    const pageNameInput = document.getElementById('page_name');
    const slugInput = document.getElementById('slug');

    pageNameInput.addEventListener('input', function() {
        let slug = this.value.toLowerCase()                  // convert to lowercase
                            .trim()                          // remove spaces at ends
                            .replace(/[^a-z0-9\s-]/g, '')   // remove invalid chars
                            .replace(/\s+/g, '-')           // replace spaces with dash
                            .replace(/-+/g, '-');           // remove multiple dashes
        slugInput.value = slug;
    });
</script>