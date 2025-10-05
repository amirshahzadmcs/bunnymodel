    @include('admin.layouts.header')
	<div class="content">
      <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Models List</li>
        </ol>
      </nav>
      <h2 class="text-bold text-body-emphasis mb-3">Models List</h2>
      <ul class="nav nav-links mb-3 mb-lg-2 mx-n3">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#"><span>All </span><span class="text-body-tertiary fw-semibold">({{ $total }})</span></a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span>Active </span><span class="text-body-tertiary fw-semibold">({{ $approved }})</span></a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span>Pending </span><span class="text-body-tertiary fw-semibold">({{ $pending  }})</span></a></li>
      </ul>
      <div id="members"
        div data-list='{"valueNames":["image","name","age","phone","nationality"],"page":12}'>
        <div class="mb-4">
              <div class="d-flex flex-wrap gap-3">
                <div class="search-box">
                  <form class="position-relative">
                    <input class="form-control search-input search" type="search" placeholder="Search Models" aria-label="Search" />
                    <span class="fas fa-search search-box-icon"></span>
                  </form>
                </div>
               <div class="d-flex justify-content-end align-items-center">
                    <a href="{{route('admin.models.export')}}" class="btn btn-link text-body me-4 px-0">
                        <span class="fa-solid fa-file-export fs-9 me-2"></span>Export
                    </a>
                    <a href="{{ route('admin.models.store') }}" class="btn btn-subtle-secondary me-1 mb-1" id="addBtn">
                        <span class="fas fa-plus me-2"></span>Add Models
                    </a>
                </div>
              </div>
            </div>
            {{-- Success Message --}}
            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            {{-- Error Message --}}
            @if(session('error'))
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ session('error') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif
        <div class="mb-9 bg-body-emphasis border mt-2 position-relative top-1">
          <div class="table-responsive scrollbar ms-n1 ps-1">
            <table class="table table-sm fs-9 mb-0">
              <thead>
                <tr>
                  <th class="sort white-space-nowrap align-middle" scope="col" style="min-width:150px;" data-sort="image">Image</th>
                    <th class="sort align-middle" scope="col" data-sort="name" style="min-width:150px;">Name</th>
                    <th class="sort align-middle" scope="col" data-sort="age" style="min-width:50px;">Age</th>
                    <th class="sort align-middle" scope="col" data-sort="phone" style="min-width:110px;">Phone</th>
                    <th class="sort align-middle" scope="col" style="max-width:350px;" data-sort="nationality">Nationality</th>
                    <th class="sort text-start ps-5 align-middle" scope="col" data-sort="city">City</th>
                    <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">Status</th>
                    <th class="sort text-end align-middle" scope="col" data-sort="action">Action</th>
                </tr>
              </thead>
              <tbody class="list" id="members-table-body">
               @foreach($models as $model)
                    <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <!-- Models Name -->
                        <td class="align-middle product white-space-nowrap">
                          @if($model->images->isNotEmpty())
                                <img src="{{ asset($model->images->first()->image) }}" style="border-radius: 19px; width: 45px;" alt="Model Image" width="60">
                            @else
                                No image
                            @endif
                        </td>

                        <!-- Firstname -->
                        <td class="align-middle product name white-space-nowrap">
                            {{ $model->firstname }}
                        </td>


                        <!-- Firstname -->
                        <td class="align-middle product age white-space-nowrap">
                            {{ $model->age }}
                        </td>

                        <!-- Phone -->
                        <td class="align-middle customer phone white-space-nowrap">
                            <a class="d-flex align-items-center text-body" href="#">
                                {{ $model->phone }}
                            </a>
                        </td>

                        <!-- Nationality -->
                        <td class="align-middle customer nationality white-space-nowrap">
                            <a class="d-flex align-items-center text-body" href="#">
                                {{ $model->nationality }}
                            </a>
                        </td>

                        <!-- City -->
                        <td class="align-middle customer city white-space-nowrap">
                            <a class="d-flex align-items-center text-body" href="#">
                                {{ $model->city }}
                            </a>
                        </td>
                        <!-- Status -->
                        <td class="align-middle white-space-nowrap text-body-tertiary ps-5 text-end">
                            @if($model->profile_status == 'public')
                                <span class="badge badge-phoenix fs-10 badge-phoenix-success">
                                    <span class="badge-label">Public</span>
                                    <span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span>
                                </span>
                            @elseif($model->profile_status == 'private')
                                <span class="badge badge-phoenix fs-10 badge-phoenix-warning">
                                    <span class="badge-label">Private</span>
                                    <span class="ms-1" data-feather="x" style="height:12.8px;width:12.8px;"></span>
                                </span>
                            @else
                                <span class="badge badge-phoenix fs-10 badge-phoenix-danger">
                                    <span class="badge-label">Block</span>
                                    <span class="ms-1" data-feather="x" style="height:12.8px;width:12.8px;"></span>
                                </span>
                            @endif

                        </td>

                        <!-- Actions -->
                        <td class="joined align-middle white-space-nowrap text-body-tertiary text-center">
                            <div class="btn-reveal-trigger position-static">
                                <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                                    type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true"
                                    aria-expanded="false" data-bs-reference="parent">
                                    <span class="fas fa-ellipsis fs-9"></span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end py-2">
                                    <a class="dropdown-item" href="{{ route('admin.models.update', $model->id) }}">Edit</a>

                                      <div class="dropdown-divider"></div>
                                      <form action="{{ route('admin.models.destroy', $model->id) }}" method="POST" class="d-inline" 
                                          onsubmit="return confirm('Are you sure you want to remove this model?');">
                                          @csrf
                                          @method('DELETE')
                                          <button type="submit" class="dropdown-item text-danger">Remove</button>
                                      </form>

                                </div>
                            </div>
                        </td>
                    </tr>
                    @endforeach

            </tbody>

            </table>
          </div>
          <div class="row align-items-center justify-content-between py-2 pe-4 ps-3 pe-0 fs-9">
            <div class="col-auto d-flex">
              <p class="mb-0 d-none d-sm-block me-3 fw-semibold text-body" data-list-info="data-list-info"></p><a
                class="fw-semibold" href="#!" data-list-view="*">View all<span class="fas fa-angle-right ms-1"
                  data-fa-transform="down-1"></span></a><a class="fw-semibold d-none" href="#!"
                data-list-view="less">View Less<span class="fas fa-angle-right ms-1"
                  data-fa-transform="down-1"></span></a>
            </div>
            <div class="col-auto d-flex"><button class="page-link" data-list-pagination="prev"><span
                  class="fas fa-chevron-left"></span></button>
              <ul class="mb-0 pagination"></ul><button class="page-link pe-0" data-list-pagination="next"><span
                  class="fas fa-chevron-right"></span></button>
            </div>
          </div>
        </div>
      </div>
     
	  <div class="modal fade" id="verticallyCentered" tabindex="-1" aria-labelledby="verticallyCenteredModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="verticallyCenteredModalLabel">Delete Profile</h5><button class="btn btn-close p-1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p class="text-body-tertiary lh-lg mb-0">Are you sure you want to delete this member’s profile? </p>
			</div>
			<div class="modal-footer"><button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Cancel</button><button class="btn btn-danger" type="button">Delete</button></div>
			</div>
		</div>
	</div>
	@include('admin.layouts.footer')