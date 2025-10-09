    @include('admin.layouts.header')
	<div class="content">
      <div class="row gy-3 mb-4 justify-content-between">
          <div class="col-xxl-6">
            <h3 class="mb-2 text-body-emphasis">Dashboard</h3>
            <h5 class="text-body-tertiary fw-semibold mb-4">Check your business growth in one place</h5>
          <div class="row g-4">
            <div class="col-12-md mb-5 mt-5">
              <div class="row align-items-center g-4">
                <div class="col-md-4 col-md-auto">
                  <div class="d-flex align-items-center">
                    <span class="fa-stack" style="min-height: 40px;min-width: 40px;">
                      <span class="me-2 text-info" data-feather="users" style="min-height:34px; width:34px"></span>
                    </span>
                    <div class="ms-3">
                      <h5 class="mb-0">{{$totalModels}} Models</h5>
                      <p class="text-body-secondary fs-9 mb-0">Total number of models</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-md-auto">
                  <div class="d-flex align-items-center">
                    <span class="fa-stack" style="min-height: 40px;min-width: 40px;">
                      <span class="me-2 text-success" data-feather="users" style="min-height:34px; width:34px"></span>
                    </span>
                    <div class="ms-3">
                      <h5 class="mb-0">{{$totalMembers}} Members</h5>
                      <p class="text-body-secondary fs-9 mb-0">Total number of member</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-md-auto">
                  <div class="d-flex align-items-center">
                    <span class="fa-stack" style="min-height: 40px;min-width: 40px;">
                      <span class="me-2 text-danger" data-feather="file-text" style="min-height:30px; width:30px"></span>
                    </span>
                    <div class="ms-3">
                      <h5 class="mb-0">{{$posts}} Blog Posts</h5>
                      <p class="text-body-secondary fs-9 mb-0">Total number of Blog Posts</p>
                    </div>
                  </div>
                </div>
              </div>
		        </div>
            <div class="col-12 col-xxl-6 mb-8">
              <div class="mb-3">
                <h4>New  Registration</h4>
                <p class="text-body-tertiary mb-0">New models and members stats</p>
              </div>
              <div class="row g-6">
                <div class="col-md-6 mb-2 mb-sm-0">
                  <div class="d-flex align-items-center">
                    <span class="me-2 text-info" data-feather="users" style="min-height:24px; width:24px"></span>
                    <h4 class="text-body-tertiary mb-0">Models :<span class="text-body-emphasis"> {{$totalModels}} </span></h4><span class="badge badge-phoenix fs-10 badge-phoenix-success d-inline-flex align-items-center ms-2"><span class="badge-label d-inline-block lh-base">+24.5%</span><span class="ms-1 fa-solid fa-caret-up d-inline-block lh-1"></span></span>
                  </div>
                  <div class="pb-0 pt-4">
                    <div class="echarts-new-users" style="min-height:110px;width:100%;"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex align-items-center">
                      <span class="me-2 text-primary" data-feather="users" style="height:24px; width:24px"></span>
                    <h4 class="text-body-tertiary mb-0">Members :<span class="text-body-emphasis"> {{$totalMembers}} </span></h4><span class="badge badge-phoenix fs-10 badge-phoenix-success d-inline-flex align-items-center ms-2"><span class="badge-label d-inline-block lh-base">+30.5%</span><span class="ms-1 fa-solid fa-caret-up d-inline-block lh-1"></span></span>
                  </div>
                  <div class="pb-0 pt-4">
                    <div class="echarts-new-leads" style="min-height:110px;width:100%;"></div>
                  </div>
                </div>
              </div>
            </div>
		  </div>

      <div class="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis pt-7 border-y">
          <div data-list='{"valueNames":["image","name","age","phone","nationality"],"page":6}'>
            <div class="row align-items-end justify-content-between pb-5 g-3">
              <div class="col-auto">
                <h4>All Models</h4>
                <p class="text-body-tertiary lh-sm mb-0">Total number of models</p>
              </div>
              <div class="col-12 col-md-auto">
                <div class="row g-2 gy-3">
                  <div class="col-auto flex-1">
                    <div class="search-box">
                      <form class="position-relative"><input class="form-control search-input search form-control-sm" type="search" placeholder="Search" aria-label="Search">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive mx-n1 px-1 scrollbar">
              <table class="table fs-9 mb-0 border-top border-translucent">
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
                <tbody class="list" id="table-latest-review-body">

                  @foreach($models as $model)
                    <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        
                    @php
                        $imageFile = $model->images->first()->image; // e.g. "P1_01.jpg"
                        $folder = explode('_', $imageFile)[0];       // "P1"
                    @endphp
                        <!-- Model Image -->
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

                        <!-- Profile Status -->
                        <td class="align-middle customer white-space-nowrap">
                            <a class="d-flex align-items-center text-body" href="#">
                                {{ ucfirst($model->profile_status) }}
                            </a>
                        </td>

                        <!-- Actions -->
                        <td class="align-middle white-space-nowrap text-end pe-0">
                            <div class="position-relative">

                                <!-- Hover Action Buttons -->
                                <div class="hover-actions">
                                    <button class="btn btn-sm btn-phoenix-secondary me-1 fs-10">
                                        <span class="fas fa-check"></span>
                                    </button>
                                    <button class="btn btn-sm btn-phoenix-secondary fs-10">
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </div>
                            </div>

                            <!-- Dropdown Menu -->
                            <div class="btn-reveal-trigger position-static">
                                <button 
                                    class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10" 
                                    type="button" 
                                    data-bs-toggle="dropdown" 
                                    data-boundary="window" 
                                    aria-haspopup="true" 
                                    aria-expanded="false" 
                                    data-bs-reference="parent">
                                    <span class="fas fa-ellipsis-h fs-10"></span>
                                </button>

                                <div class="dropdown-menu dropdown-menu-end py-2">
                                    <a class="dropdown-item" href="#!">View</a>
                                    <a class="dropdown-item" href="#!">Export</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item text-danger" href="#!">Remove</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                  @endforeach

                </tbody>
              </table>
            </div>
            <div class="row align-items-center py-1">
              <div class="pagination d-none"></div>
              <div class="col d-flex fs-9">
                <p class="mb-0 d-none d-sm-block me-3 fw-semibold text-body" data-list-info="data-list-info">1 to 6 <span class="text-body-tertiary"> Items of </span>15</p><a class="fw-semibold" href="#!" data-list-view="*">View all<svg class="svg-inline--fa fa-angle-right ms-1" data-fa-transform="down-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style="transform-origin: 0.3125em 0.5625em;"><g transform="translate(160 256)"><g transform="translate(0, 32)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" transform="translate(-160 -256)"></path></g></g></svg><!-- <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span> Font Awesome fontawesome.com --></a><a class="fw-semibold d-none" href="#!" data-list-view="less">View Less</a>
              </div>
              <div class="col-auto d-flex">
                <button class="btn btn-link px-1 me-1 disabled" type="button" title="Previous" data-list-pagination="prev" disabled=""><svg class="svg-inline--fa fa-chevron-left me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg><!-- <span class="fas fa-chevron-left me-2"></span> Font Awesome fontawesome.com -->Previous</button><button class="btn btn-link px-1 ms-1" type="button" title="Next" data-list-pagination="next">Next<svg class="svg-inline--fa fa-chevron-right ms-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg><!-- <span class="fas fa-chevron-right ms-2"></span> Font Awesome fontawesome.com --></button>
              </div>
            </div>
          </div>
        </div>

	</div>
	@include('admin.layouts.footer')
  <script src="{{ asset('public/admin/vendors/echarts/echarts.min.js') }}"></script>
  <script src="{{ asset('public/admin/assets/js/dashboards/crm-dashboard.js') }}"></script>