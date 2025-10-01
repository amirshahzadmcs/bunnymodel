<nav class="navbar navbar-vertical navbar-expand-lg" style="display:none;">
  <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
    <!-- scrollbar removed-->
    <div class="navbar-vertical-content">
      <ul class="navbar-nav flex-column" id="navbarVerticalNav">

        <li class="nav-item">
            <div class="nav-item-wrapper">
                <a class="nav-link  {{ isActiveRoute(['admin.register', 'admin.user.list']) }} dropdown-indicator label-1" 
                href="#user-managments" 
                aria-expanded="{{ isMenuOpen(['admin.register', 'admin.user.list']) ? 'true' : 'false' }}" 
                role="button" 
                data-bs-toggle="collapse" aria-expanded="false" aria-controls="user-managments">
                <div class="d-flex align-items-center">
                    <div class="dropdown-indicator-icon-wrapper">
                    <span class="fas fa-caret-right dropdown-indicator-icon"></span>
                    </div>
                    <span class="nav-link-icon">
                      <span data-feather="users"></span>
                    </span>
                    <span class="nav-link-text">User </span>
                </div>
                </a>

                <div class="parent-wrapper label-1">
                <ul class="nav collapse parent  {{ isMenuOpen(['admin.register', 'admin.user.list']) }}" data-bs-parent="#navbarVerticalCollapse" id="user-managments">
                    <li class="collapsed-nav-item-title d-none">User </li>

                    <li class="nav-item">
                    <a class="nav-link  {{ isActiveRoute('admin.register') }}" href="{{route('admin.register')}}">
                        <div class="d-flex align-items-center">
                        <span class="nav-link-text">Create new</span>
                        </div>
                    </a>
                    <!-- more inner pages -->
                    </li>

                    <li class="nav-item">
                    <a class="nav-link {{ isActiveRoute('admin.user.list') }}" href="{{route('admin.user.list')}}">
                        <div class="d-flex align-items-center">
                        <span class="nav-link-text">User list view</span>
                        </div>
                    </a>
                    <!-- more inner pages -->
                    </li>

                </ul>
                </div>
            </div>

            @php
                $roleRoutes = ['admin.roles.create', 'admin.roles.index'];
            @endphp

            <div class="nav-item-wrapper">
                <a class="nav-link dropdown-indicator label-1 {{ in_array(Route::currentRouteName(), $roleRoutes) ? 'active' : '' }}" 
                  href="#role-managments" 
                  role="button" 
                  data-bs-toggle="collapse" 
                  aria-expanded="{{ in_array(Route::currentRouteName(), $roleRoutes) ? 'true' : 'false' }}" 
                  aria-controls="role-managments">
                    <div class="d-flex align-items-center">
                        <div class="dropdown-indicator-icon-wrapper">
                            <span class="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span class="nav-link-icon">
                            <span data-feather="git-merge"></span>
                        </span>
                        <span class="nav-link-text">Role </span>
                    </div>
                </a>

                <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent {{ in_array(Route::currentRouteName(), $roleRoutes) ? 'show' : '' }}" 
                        data-bs-parent="#navbarVerticalCollapse" 
                        id="role-managments">
                        <li class="collapsed-nav-item-title d-none">Role </li>

                        <li class="nav-item">
                            <a class="nav-link {{ Route::currentRouteName() == 'admin.roles.create' ? 'active' : '' }}" 
                              href="{{ route('admin.roles.create') }}">
                                <div class="d-flex align-items-center">
                                    <span class="nav-link-text">Create Role</span>
                                </div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ Route::currentRouteName() == 'admin.roles.index' ? 'active' : '' }}" 
                              href="{{ route('admin.roles.index') }}">
                                <div class="d-flex align-items-center">
                                    <span class="nav-link-text">Role list</span>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

            
            @php
                $permissionRoutes = ['admin.permissions.create', 'admin.permissions.index'];
            @endphp

            <div class="nav-item-wrapper">
                <a class="nav-link dropdown-indicator label-1 {{ in_array(Route::currentRouteName(), $permissionRoutes) ? 'active' : '' }}" 
                  href="#permission-managments" 
                  role="button" 
                  data-bs-toggle="collapse" 
                  aria-expanded="{{ in_array(Route::currentRouteName(), $permissionRoutes) ? 'true' : 'false' }}" 
                  aria-controls="permission-managments">
                    <div class="d-flex align-items-center">
                        <div class="dropdown-indicator-icon-wrapper">
                            <span class="fas fa-caret-right dropdown-indicator-icon"></span>
                        </div>
                        <span class="nav-link-icon">
                            <span data-feather="layers"></span>
                        </span>
                        <span class="nav-link-text">Permission </span>
                    </div>
                </a>

                <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent {{ in_array(Route::currentRouteName(), $permissionRoutes) ? 'show' : '' }}" 
                        data-bs-parent="#navbarVerticalCollapse" 
                        id="permission-managments">
                        <li class="collapsed-nav-item-title d-none">Permission </li>

                        <li class="nav-item">
                            <a class="nav-link {{ Route::currentRouteName() == 'admin.permissions.create' ? 'active' : '' }}" 
                              href="{{ route('admin.permissions.create') }}">
                                <div class="d-flex align-items-center">
                                    <span class="nav-link-text">Create Permission</span>
                                </div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ Route::currentRouteName() == 'admin.permissions.index' ? 'active' : '' }}" 
                              href="{{ route('admin.permissions.index') }}">
                                <div class="d-flex align-items-center">
                                    <span class="nav-link-text">Permission list</span>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>


          <div class="nav-item-wrapper">
            <a class="nav-link label-1" href="members.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span data-feather="users"></span>
                </span>
                <span class="nav-link-text-wrapper">
                  <span class="nav-link-text">Members</span>
                </span>
              </div>
            </a>
          </div>
          <!-- parent pages -->

          <div class="nav-item-wrapper">
            <a class="nav-link label-1" href="notifications.html" role="button" data-bs-toggle="" aria-expanded="false">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span data-feather="bell"></span>
                </span>
                <span class="nav-link-text-wrapper">
                  <span class="nav-link-text">Notifications</span>
                </span>
              </div>
            </a>
          </div>
          <!-- parent pages -->

          <div class="nav-item-wrapper">
            <a class="nav-link dropdown-indicator label-1" href="#nv-projectManagement" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-projectManagement">
              <div class="d-flex align-items-center">
                <div class="dropdown-indicator-icon-wrapper">
                  <span class="fas fa-caret-right dropdown-indicator-icon"></span>
                </div>
                <span class="nav-link-icon">
                  <span data-feather="layout"></span>
                </span>
                <span class="nav-link-text">Project management</span>
              </div>
            </a>

            <div class="parent-wrapper label-1">
              <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-projectManagement">
                <li class="collapsed-nav-item-title d-none">Project management</li>

                <li class="nav-item">
                  <a class="nav-link" href="#.">
                    <div class="d-flex align-items-center">
                      <span class="nav-link-text">Create new</span>
                    </div>
                  </a>
                  <!-- more inner pages -->
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#.">
                    <div class="d-flex align-items-center">
                      <span class="nav-link-text">Project list view</span>
                    </div>
                  </a>
                  <!-- more inner pages -->
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#.">
                    <div class="d-flex align-items-center">
                      <span class="nav-link-text">Project card view</span>
                    </div>
                  </a>
                  <!-- more inner pages -->
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#.">
                    <div class="d-flex align-items-center">
                      <span class="nav-link-text">Project board view</span>
                    </div>
                  </a>
                  <!-- more inner pages -->
                </li>

              </ul>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>

  <div class="navbar-vertical-footer">
    <button class="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
      <span class="uil uil-left-arrow-to-left fs-8"></span>
      <span class="uil uil-arrow-from-right fs-8"></span>
      <span class="navbar-vertical-footer-text ms-2">Collapsed View</span>
    </button>
  </div>
</nav>
