@include('admin.layouts.header')
<div class="content">
    <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Add New Post</li>
        </ol>
    </nav>
    <h2 class="mb-4">Add New Post</h2>
    <div class="row">
        <div class="col-xl-8">
            {{-- Success Message --}}
            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            <form method="POST" action="{{ route('admin.posts.store') }}" class="row g-3 mb-6">
                @csrf

                <!-- Post Title -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <input class="form-control @error('title') is-invalid @enderror" 
                            type="text" 
                            id="title" 
                            name="title" 
                            value="{{ old('title') }}" 
                            placeholder="Post Title" 
                            required 
                            autofocus />
                        <label for="title">Post Title</label>
                        @error('title')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Slug -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <input class="form-control @error('slug') is-invalid @enderror" 
                            type="text" 
                            id="slug" 
                            name="slug" 
                            value="{{ old('slug') }}" 
                            placeholder="Slug" 
                            required />
                        <label for="slug">Post Slug</label>
                        @error('slug')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- SEO Title -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <input class="form-control @error('seo_title') is-invalid @enderror" 
                            type="text" 
                            id="seo_title" 
                            name="seo_title" 
                            value="{{ old('seo_title') }}" 
                            placeholder="SEO Title" 
                            required />
                        <label for="seo_title">SEO Title</label>
                        @error('seo_title')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Meta Description -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <textarea class="form-control @error('meta_description') is-invalid @enderror" 
                            id="meta_description" 
                            name="meta_description" 
                            rows="3"
                            placeholder="Meta Description" 
                            required>{{ old('meta_description') }}</textarea>
                        <label for="meta_description">Meta Description</label>
                        @error('meta_description')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Meta Keywords -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <textarea class="form-control @error('meta_keywords') is-invalid @enderror" 
                            id="meta_keywords" 
                            name="meta_keywords" 
                            rows="3"
							required
                            placeholder="Meta Keywords">{{ old('meta_keywords') }}</textarea>
                        <label for="meta_keywords">Meta Keywords</label>
                        @error('meta_keywords')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

				<!-- Feature Image -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<input class="form-control @error('feature_image') is-invalid @enderror" 
							type="file" 
							id="feature_image" 
							name="feature_image" 
							value="{{ old('feature_image') }}" 
							placeholder="Feature Image URL" />
						@error('feature_image')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>

				<!-- Status -->
				<div class="col-sm-6 col-md-12">
					<div class="form-floating">
						<select class="form-select @error('status') is-invalid @enderror" 
							id="status" 
							name="status" required>
							<option value="publish" {{ old('status') == 'publish' ? 'selected' : '' }}>Publish</option>
							<option value="draft" {{ old('status') == 'draft' ? 'selected' : '' }}>Draft</option>
						</select>
						<label for="status">Status</label>
						@error('status')
							<span class="text-danger fs-8">{{ $message }}</span>
						@enderror
					</div>
				</div>

                <!-- Canonical URL -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <input class="form-control @error('canonical_url') is-invalid @enderror" 
                            type="text" 
                            id="canonical_url" 
                            name="canonical_url" 
                            value="{{ old('canonical_url') }}" 
                            placeholder="Canonical URL" />
                        <label for="canonical_url">Canonical URL</label>
                        @error('canonical_url')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Post Content -->
                <div class="col-sm-6 col-md-12">
                    <div class="form-floating">
                        <textarea class="form-control @error('content') is-invalid @enderror" 
                            id="content" 
                            name="content" 
                            rows="6"
                            placeholder="Post Content" 
                            required>{{ old('content') }}</textarea>
                        <label for="content">Post Content</label>
                        @error('content')
                            <span class="text-danger fs-8">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="col-12 gy-6">
                    <div class="row g-3">
                        <div class="col-auto">
                            <button class="btn btn-subtle-secondary px-5 px-sm-15" type="submit">Create Post</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
@include('admin.layouts.footer')

<script>
    const titleInput = document.getElementById('title');
    const slugInput = document.getElementById('slug');

    titleInput.addEventListener('input', function() {
        let slug = this.value.toLowerCase()                  // convert to lowercase
                            .trim()                          // remove spaces at ends
                            .replace(/[^a-z0-9\s-]/g, '')   // remove invalid chars
                            .replace(/\s+/g, '-')           // replace spaces with dash
                            .replace(/-+/g, '-');           // remove multiple dashes
        slugInput.value = slug;
    });
</script>
