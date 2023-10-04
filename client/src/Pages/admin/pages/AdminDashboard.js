import React from "react";
import Container from "../../../Pages/admin/layout/Container";
import Footer from "../../../Pages/admin/layout/Footer";
import '../../../Assets/Css/admin/style.css'

const AdminDashboard = () => {
  return (
    <>
      <Container />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-xxl-4 col-md-6">
                  <div class="card info-card sales-card">
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">
                        Sales <span>| Today</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-chart-simple"></i>
                        </div>
                        <div class="ps-3">
                          <h6>145</h6>
                          <span class="text-success small pt-1 fw-bold">
                            12%
                          </span>
                          <span class="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}

                {/* <!-- Revenue Card --> */}
                <div class="col-xxl-4 col-md-6">
                  <div class="card info-card revenue-card">
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">
                        Revenue <span>| This Month</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-dollar-sign"></i>
                        </div>
                        <div class="ps-3">
                          <h6>$3,264</h6>
                          <span class="text-success small pt-1 fw-bold">
                            8%
                          </span>
                          <span class="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Revenue Card --> */}

                {/* <!-- Customers Card --> */}
                <div class="col-xxl-4 col-xl-12">
                  <div class="card info-card customers-card">
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">
                        Customers <span>| This Year</span>
                      </h5>

                      <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="fa-solid fa-users"></i>
                        </div>
                        <div class="ps-3">
                          <h6>1244</h6>
                          <span class="text-danger small pt-1 fw-bold">
                            12%
                          </span>
                          <span class="text-muted small pt-2 ps-1">
                            decrease
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Customers Card --> */}

                {/* <!-- Reports --> */}
                <div class="col-12">
                  <div class="card">
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a class="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">
                        Reports <span>/Today</span>
                      </h5>

                      {/* <!-- Line Chart --> */}
                      <div id="reportsChart"></div>

                      {/* <!-- End Line Chart --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- End Reports --> */}
              </div>
            </div>
            {/* <!-- End Left side columns --> */}

            {/* <!-- Right side columns --> */}
            <div class="col-lg-4">
              {/* <!-- Recent Activity --> */}
              <div class="card">
                <div class="filter">
                  <a class="icon" href="#" data-bs-toggle="dropdown">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li class="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <a class="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="card-body">
                  <h5 class="card-title">
                    Recent Activity <span>| Today</span>
                  </h5>

                  <div class="activity">
                    <div class="activity-item d-flex">
                      <div class="activite-label">32 min</div>
                      <i class="fa-solid fa-circle" style={{color: "#050a4d" , alignSelf: "self-start"}}></i>
                      <div class="activity-content">
                        Quia quae rerum
                        <a href="#" class="fw-bold text-dark">
                          explicabo officiis
                        </a>
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div class="activity-item d-flex">
                      <div class="activite-label">56 min</div>
                      <i class="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                      <div class="activity-content">
                        Voluptatem blanditiis blanditiis eveniet
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div class="activity-item d-flex">
                      <div class="activite-label">2 hrs</div>
                      <i class="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
                      <div class="activity-content">
                        Voluptates corrupti molestias voluptatem
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div class="activity-item d-flex">
                      <div class="activite-label">1 day</div>
                      <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                      <div class="activity-content">
                        Tempore autem saepe
                        <a href="#" class="fw-bold text-dark">
                          occaecati voluptatem
                        </a>
                        tempore
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div class="activity-item d-flex">
                      <div class="activite-label">2 days</div>
                      <i class="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
                      <div class="activity-content">
                        Est sit eum reiciendis exercitationem
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div class="activity-item d-flex">
                      <div class="activite-label">4 weeks</div>
                      <i class="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
                      <div class="activity-content">
                        Dicta dolorem harum nulla eius. Ut quidem quidem sit
                        quas
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}
                  </div>
                </div>
              </div>
              {/* <!-- End Recent Activity --> */}
            </div>
            {/* <!-- End Right side columns --> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
