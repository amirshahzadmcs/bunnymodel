@include('admin.layouts.header')
<div class="content">
    <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
            <li class="breadcrumb-item active">Post List</li>
        </ol>
    </nav>
    <h2 class="text-bold text-body-emphasis mb-3">Post List</h2>
    <ul class="nav nav-links mb-3 mb-lg-2 mx-n3">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#"><span>All </span><span class="text-body-tertiary fw-semibold">({{ $total }})</span></a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span>Publish </span><span class="text-body-tertiary fw-semibold">({{ $publish }})</span></a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span>Draft </span><span class="text-body-tertiary fw-semibold">({{ $draft  }})</span></a></li>
    </ul>
    <div id="members"
        data-list='{"valueNames":["customer","email","mobile_number","city","last_active","joined"],"page":10,"pagination":true}'>
        <div class="mb-4">
            <div class="d-flex flex-wrap gap-3">
                <div class="search-box">
                    <form class="position-relative">
                        <input class="form-control search-input search" type="search" placeholder="Search post" aria-label="Search" />
                        <span class="fas fa-search search-box-icon"></span>
                    </form>
                </div>
                <div class="d-flex justify-content-end align-items-center">
                    <button class="btn btn-link text-body me-4 px-0">
                        <span class="fa-solid fa-file-export fs-9 me-2"></span>Export
                    </button>
                    <a href="{{ route('admin.posts.create') }}" class="btn btn-subtle-secondary me-1 mb-1" id="addBtn">
                        <span class="fas fa-plus me-2"></span>Add New Post
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
                            <th class="sort align-middle" scope="col" data-sort="customer" style="width:15%; min-width:200px;">Post Name</th>
                            <th class="sort align-middle" scope="col" data-sort="email" style="width:15%; min-width:200px;">Post Slug</th>
                            <th class="sort align-middle pe-3" scope="col" data-sort="mobile_number" style="width:20%; min-width:200px;">Post Title</th>
                            <th class="sort align-middle text-end" scope="col" data-sort="nationality" style="width:16%;  min-width:200px;">Status</th>
                            <th class="sort align-middle text-center pe-0" scope="col" data-sort="Action" style="width:10%;  min-width:200px;">Action</th>
                        </tr>
                    </thead>
                    <tbody class="list" id="members-table-body">
                      @php
                        use Illuminate\Support\Str;
                      @endphp
                        @foreach($posts as $post)
                            <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                                <!-- Post Name -->
                                <td class="email align-middle white-space-nowrap">
                                    {{ Str::limit($post->title, 30) }}
                                </td>

                                <!-- Post Slug -->
                                <td class="email align-middle white-space-nowrap">
                                    {{ Str::limit($post->slug, 30) }}
                                </td>

                                <!-- Post Meta Title -->
                                <td class="email align-middle white-space-nowrap">
                                    {{ Str::limit($post->seo_title, 30) }}
                                </td>


                                <!-- Status -->
                                <td class="align-middle white-space-nowrap text-body-tertiary ps-5 text-end">
                                    @if($post->status === 'publish')
                                        <span class="badge badge-phoenix fs-10 badge-phoenix-success">
                                            <span class="badge-label">Publish</span>
                                            <span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span>
                                        </span>
                                    @else
                                        <span class="badge badge-phoenix fs-10 badge-phoenix-danger">
                                            <span class="badge-label">Draft</span>
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
                                            <a class="dropdown-item" href="{{ route('admin.posts.update', $post->id) }}">Edit</a>
                                            <div class="dropdown-divider"></div>
                                            <form action="{{ route('admin.posts.destroy', $post->id) }}" method="POST" class="d-inline" 
                                                onsubmit="return confirm('Are you sure you want to remove this post?');">
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
                    <p class="mb-0 d-none d-sm-block me-3 fw-semibold text-body" data-list-info="data-list-info"></p>
                    <a class="fw-semibold" href="#!" data-list-view="*">View all
                        <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
                    </a>
                    <a class="fw-semibold d-none" href="#!" data-list-view="less">View Less
                        <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
                    </a>
                </div>
                <div class="col-auto d-flex">
                    <button class="page-link" data-list-pagination="prev"><span class="fas fa-chevron-left"></span></button>
                    <ul class="mb-0 pagination"></ul>
                    <button class="page-link pe-0" data-list-pagination="next"><span class="fas fa-chevron-right"></span></button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="verticallyCentered" tabindex="-1" aria-labelledby="verticallyCenteredModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="verticallyCenteredModalLabel">Delete Post</h5>
                    <button class="btn btn-close p-1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-body-tertiary lh-lg mb-0">Are you sure you want to delete this post?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-danger" type="button">Delete</button>
                </div>
            </div>
        </div>
    </div>
@include('admin.layouts.footer')