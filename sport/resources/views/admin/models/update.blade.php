@include('admin.layouts.header')
<div class="content">
        <nav class="mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="{{ route('admin.models.index') }}">Models</a></li>
            <li class="breadcrumb-item active">Edit Model</li>
          </ol>
        </nav>
        <h2 class="mb-4">Edit Model</h2>
        <div class="row">
			<div class="col-xl-9">
				<!-- Success Message -->
				@if(session('success'))
					<div class="alert alert-success">
						{{ session('success') }}
					</div>
				@endif

				<!-- Error Message -->
				@if(session('error'))
					<div class="alert alert-danger">
						{{ session('error') }}
					</div>
				@endif

				<!-- Validation Errors -->
				@if($errors->any())
					<div class="alert alert-danger">
						<ul class="mb-0">
							@foreach($errors->all() as $error)
								<li>{{ $error }}</li>
							@endforeach
						</ul>
					</div>
				@endif

				<form action="{{ route('admin.models.updateStore', $model->id) }}" class="row g-3 mb-6 dropzone" id="modelDropzone" method="POST" enctype="multipart/form-data">
				@csrf
				@method('PUT')
					<!-- Email -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('email') is-invalid @enderror" 
								type="email" 
								id="email" 
								name="email" 
								value="{{ old('email', $model->email) }}" 
								placeholder="Email" 
								required 
								autofocus />
							<label for="email">Email</label>
							@error('email')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- First Name -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('firstname') is-invalid @enderror" 
								type="text" 
								id="firstname" 
								name="firstname" 
								value="{{ old('firstname', $model->firstname) }}" 
								placeholder="First Name" 
								required />
							<label for="firstname">First Name</label>
							@error('firstname')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Phone -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('phone') is-invalid @enderror" 
								type="tel" 
								id="phone" 
								name="phone" 
								value="{{ old('phone', $model->phone) }}" 
								placeholder="Phone" 
								required />
							<label for="phone">Phone</label>
							@error('phone')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Age -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('age') is-invalid @enderror" 
								type="number" 
								id="age" 
								name="age" 
								value="{{ old('age', $model->age) }}" 
								placeholder="Age" 
								required />
							<label for="age">Age</label>
							@error('age')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Height -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('height') is-invalid @enderror" 
								type="number" 
								id="height" 
								name="height" 
								value="{{ old('height', $model->height) }}" 
								placeholder="Height" 
								required />
							<label for="height">Height (cm)</label>
							@error('height')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Weight -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('weight') is-invalid @enderror" 
								type="number" 
								id="weight" 
								name="weight" 
								value="{{ old('weight', $model->weight) }}" 
								placeholder="Weight" 
								required />
							<label for="weight">Weight (kg)</label>
							@error('weight')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Bust -->
					<div class="col-sm-4 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('bust') is-invalid @enderror" 
								type="number" 
								id="bust" 
								name="bust" 
								value="{{ old('bust', $model->bust) }}" 
								placeholder="Bust" 
								required />
							<label for="bust">Bust (cm)</label>
							@error('bust')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Waist -->
					<div class="col-sm-4 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('waist') is-invalid @enderror" 
								type="number" 
								id="waist" 
								name="waist" 
								value="{{ old('waist', $model->waist) }}" 
								placeholder="Waist" 
								required />
							<label for="waist">Waist (cm)</label>
							@error('waist')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Hips -->
					<div class="col-sm-4 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('hips') is-invalid @enderror" 
								type="number" 
								id="hips" 
								name="hips" 
								value="{{ old('hips', $model->hips) }}" 
								placeholder="Hips" 
								required />
							<label for="hips">Hips (cm)</label>
							@error('hips')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Nationality -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('nationality') is-invalid @enderror" 
								type="text" 
								id="nationality" 
								name="nationality" 
								value="{{ old('nationality', $model->nationality) }}" 
								placeholder="Nationality" 
								required />
							<label for="nationality">Nationality</label>
							@error('nationality')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- City -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('city') is-invalid @enderror" 
								type="text" 
								id="city" 
								name="city" 
								value="{{ old('city', $model->city) }}" 
								placeholder="City" 
								required />
							<label for="city">City</label>
							@error('city')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Languages -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<input class="form-control @error('languages') is-invalid @enderror" 
								type="text" 
								id="languages" 
								name="languages" 
								value="{{ old('languages', $model->languages) }}" 
								placeholder="Languages" 
								required />
							<label for="languages">Languages</label>
							@error('languages')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Currency -->
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<select class="form-select @error('currency') is-invalid @enderror" 
								id="currency" 
								name="currency" 
								required>
								<option value="">Select Currency</option>
								<option value="USD" {{ old('currency', $model->currency) == 'USD' ? 'selected' : '' }}>USD</option>
								<option value="EURO" {{ old('currency', $model->currency) == 'EURO' ? 'selected' : '' }}>EURO</option>
								<option value="GBP" {{ old('currency', $model->currency) == 'GBP' ? 'selected' : '' }}>GBP</option>
								<option value="CAD" {{ old('currency', $model->currency) == 'CAD' ? 'selected' : '' }}>CAD</option>
							</select>
							<label for="currency">Currency</label>
							@error('currency')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>

					<!-- Description -->
					<div class="col-12 gy-6">
						<div class="form-floating">
							<textarea class="form-control @error('description') is-invalid @enderror" 
								id="description" 
								name="description" 
								placeholder="Leave a description here" 
								style="height: 100px" 
								>{{ old('description', $model->description) }}</textarea>
							<label for="description">Description</label>
							@error('description')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<h6 class="mt-3">Model Rates</h6>
					<!-- incall_2h -->
					<div class="col-sm-6 col-md-3">
						<div class="form-floating">
							<input class="form-control @error('incall_2h') is-invalid @enderror" 
								type="text" 
								id="incall_2h" 
								name="incall_2h" 
								value="{{ old('incall_2h', $model->prices[0]->incall_2h) }}" 
								placeholder="Incall 2 Hours" 
								required />
							<label for="incall_2h">Incall up to 2 Hours</label>
							@error('incall_2h')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- incall_3h -->
					<div class="col-sm-6 col-md-3">
						<div class="form-floating">
							<input class="form-control @error('incall_3h') is-invalid @enderror" 
								type="text" 
								id="incall_3h" 
								name="incall_3h" 
								value="{{ old('incall_3h', $model->prices[0]->incall_3h) }}" 
								placeholder="Incall 3 Hours" 
								required />
							<label for="incall_3h">Incall up to 3 Hours</label>
							@error('incall_3h')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- incall_6h -->
					<div class="col-sm-6 col-md-3">
						<div class="form-floating">
							<input class="form-control @error('incall_6h') is-invalid @enderror" 
								type="text" 
								id="incall_6h" 
								name="incall_6h" 
								value="{{ old('incall_6h', $model->prices[0]->incall_6h) }}" 
								placeholder="Incall 6 Hours" 
								required />
							<label for="incall_6h">Incall up to 6 Hours</label>
							@error('incall_6h')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- incall_12h -->
					<div class="col-sm-6 col-md-3">
						<div class="form-floating">
							<input class="form-control @error('incall_12h') is-invalid @enderror" 
								type="text" 
								id="incall_12h" 
								name="incall_12h" 
								value="{{ old('incall_12h', $model->prices[0]->incall_12h) }}" 
								placeholder="Incall overnight" 
								required />
							<label for="incall_12h">Incall overnight</label>
							@error('incall_12h')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- outcall_1d -->
					<div class="col-sm-6 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('outcall_1d') is-invalid @enderror" 
								type="text" 
								id="outcall_1d" 
								name="outcall_1d" 
								value="{{ old('outcall_1d', $model->prices[0]->outcall_1d) }}" 
								placeholder="Up to 24 Hours" 
								required />
							<label for="outcall_1d">Outcall up to 24 Hours</label>
							@error('outcall_1d')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- outcall_3d -->
					<div class="col-sm-6 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('outcall_3d') is-invalid @enderror" 
								type="text" 
								id="outcall_3d" 
								name="outcall_3d" 
								value="{{ old('outcall_3d', $model->prices[0]->outcall_3d) }}" 
								placeholder="Up to 48 Hours" 
								required />
							<label for="outcall_3d">Outcall up to 48 Hours</label>
							@error('outcall_3d')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<!-- outcall_ad -->
					<div class="col-sm-6 col-md-4">
						<div class="form-floating">
							<input class="form-control @error('outcall_ad') is-invalid @enderror" 
								type="text" 
								id="outcall_ad" 
								name="outcall_ad" 
								value="{{ old('outcall_ad', $model->prices[0]->outcall_ad) }}" 
								placeholder="Outcall additional Each Day" 
								required />
							<label for="outcall_ad">Outcall additional Each Day</label>
							@error('outcall_ad')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					<div class="col-sm-6 col-md-6">
						<div class="form-floating">
							<select class="form-select @error('profile_status') is-invalid @enderror" 
								id="profile_status" 
								name="profile_status" 
								required>
								<option value="">Select profile status</option>
								<option value="public" {{ old('profile_status', $model->profile_status) == 'public' ? 'selected' : '' }}>Public</option>
								<option value="private" {{ old('profile_status', $model->profile_status) == 'private' ? 'selected' : '' }}>Private</option>
								<option value="block" {{ old('profile_status', $model->profile_status) == 'block' ? 'selected' : '' }}>Block</option>
							</select>
							<label for="profile_status">Currency</label>
							@error('profile_status')
								<span class="text-danger fs-8">{{ $message }}</span>
							@enderror
						</div>
					</div>
					
					<h6 class="mt-3">Model images</h6>

					<div class="dropzone dropzone-multiple p-0 mb-5 dz-clickable text-align-center" id="my-awesome-dropzone">
					<!-- Preview container -->
					<div class="dz-preview d-flex flex-wrap mb-3">
						<!-- Display existing images -->
						@if(isset($model->images) && count($model->images) > 0)
							@foreach($model->images as $image)
								<div class="dz-preview-item existing-image" data-image-id="{{ $image->id }}" style="position: relative; margin-right: 10px; margin-bottom: 10px;">
									<img src="{{ asset($image->image) }}" class="preview-image" style="max-width: 100px; height: auto;">
									<a class="remove-existing-image" style="position: absolute; top: 0; right: 0; background: rgba(0, 0, 0, 0.5); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; padding: 2px 6px; cursor: pointer;">X</a>
									<input type="hidden" name="existing_images[]" value="{{ $image->id }}">
								</div>
							@endforeach
						@endif
					</div>
					<!-- Currency -->
					

					<!-- Dropzone message -->
					<div class="dz-message text-body-tertiary text-opacity-85 text-center" data-dz-message="data-dz-message">
						<button class="btn btn-link p-0" type="button" id="browseButton">Browse from device</button>
						<br>
						<img class="mt-3 me-2" src="{{ asset('public/admin/assets/img/icons/image-icon.png') }}" width="40" alt="">
					</div>

					<!-- Hidden file input -->
					<input type="file" id="hiddenFileInput" name="images[]" multiple accept="image/*" style="display:none;">
					
					<!-- Clear All button -->
					<button id="clearAllButton" class="btn btn-danger mt-3" style="display:none;">Clear All New Images</button>
				</div>

					<!-- Action Buttons -->
					<div class="col-12 gy-6">
						<div class="row g-3 justify-content-end">
							<div class="col-auto">
								<button type="submit" class="btn btn-phoenix-primary px-5 px-sm-15">Update Model</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
<script>
document.getElementById("browseButton").addEventListener("click", function () {
    document.getElementById("hiddenFileInput").click();
});

var file = [];
var fileIndex = 0; // global counter to keep unique IDs

document.getElementById("hiddenFileInput").addEventListener("change", function (event) {
    var files = event.target.files;
    var previewContainer = document.querySelector(".dz-preview");

    for (var i = 0; i < files.length; i++) {
        let currentFile = files[i];
        file.push(currentFile); // add to array

        var previewItem = document.createElement("div");
        previewItem.classList.add("dz-preview-item"); 
        previewItem.id = fileIndex + "-currentCross"; 
        previewItem.setAttribute("current-id", fileIndex);
        previewItem.style.position = "relative"; 
        previewItem.style.marginRight = "10px"; 
        previewItem.style.marginBottom = "10px";

        var img = document.createElement("img");
        img.src = URL.createObjectURL(currentFile);
        img.classList.add("preview-image");
        img.style.maxWidth = "100px";
        img.style.height = "auto";

        var removeBtn = document.createElement("a");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "X";
        removeBtn.style.position = "absolute";
        removeBtn.style.top = "0";
        removeBtn.style.right = "0";
        removeBtn.style.background = "rgba(0, 0, 0, 0.5)";
        removeBtn.style.color = "white";
        removeBtn.style.borderRadius = "50%";
        removeBtn.style.width = "20px";
        removeBtn.style.height = "20px";
        removeBtn.style.fontSize = "11px";
        removeBtn.style.padding = "2px 6px";
        removeBtn.style.cursor = "pointer";

        previewItem.appendChild(img);
        previewItem.appendChild(removeBtn);
        previewContainer.appendChild(previewItem);

        fileIndex++; // increment global counter so IDs are unique
    }
    
    // Show clear all button if there are new images
    if (file.length > 0) {
        document.getElementById("clearAllButton").style.display = "block";
    }
});

// Handle remove button for new images
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-btn")) {
        let parent = e.target.closest(".dz-preview-item");

        if (parent) {
            let currentId = parent.getAttribute("current-id");
            parent.remove();

            if (currentId !== null) {
                let index = parseInt(currentId);
                // Find file by index
                file = file.filter((f, idx) => idx !== index);

                console.log("Removed file with id:", index);
                console.log("Updated file array:", file);
            }
        }
    }
    
    // Handle remove for existing images
    if (e.target.classList.contains("remove-existing-image")) {
        let parent = e.target.closest(".existing-image");
        if (parent) {
            // Add a hidden input to mark this image for deletion
            let imageId = parent.getAttribute("data-image-id");
            let deleteInput = document.createElement("input");
            deleteInput.type = "hidden";
            deleteInput.name = "deleted_images[]";
            deleteInput.value = imageId;
            document.querySelector("form").appendChild(deleteInput);
            
            // Remove the image preview
            parent.remove();
        }
    }
});

// Clear all new images
document.getElementById("clearAllButton").addEventListener("click", function(e) {
    e.preventDefault();
    
    // Remove all new image previews
    document.querySelectorAll('.dz-preview-item:not(.existing-image)').forEach(function(item) {
        item.remove();
    });
    
    // Clear the file array
    file = [];
    fileIndex = 0;
    
    // Reset the file input
    document.getElementById("hiddenFileInput").value = "";
    
    // Hide the clear all button
    this.style.display = "none";
});
</script>
@include('admin.layouts.footer')