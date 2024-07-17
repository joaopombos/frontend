import React, { } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
export default function Sign_sucess() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/shop">
            <img
              src="/images/Logos/logo.png"
              style={{ width: "20%" }}
              alt="ware logo"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
          <button class="btn btn-outline-light me-2" type="button">
            Iniciar Sessão
          </button>
        </div>
      </nav>

      {/* LOG IN FORM */}
      <section class="vh-100 d-flex" style={{ width: "100%" }}>
        <div class="col-sm-6" style={{ alignItems: "center", height: "100vh" }}>
          <img
            src="/images/fundos/fundo preto.jpg"
            class="img-fluid"
            alt="fundo preto"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div class="col-sm-6 text-black" style={{ width: "50%" }}>
          <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form style={{ width: "23rem", marginTop: "20%" }}>
              <i
                class="bi bi-check2-circle"
                style={{ fontSize: "5em", alignContent: "center" }}
              ></i>
              <h1 class="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                Sucesso!
              </h1>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="form2Example17"
                  class="form-control form-control-lg"
                />
                <label class="form-label" for="form2Example17">
                  Código
                </label>
              </div>
              <p style={{ color: "#B3B3B3" }}>
                Foi enviado um email para email@domain.com. Por favor introduza
                o código que recebeu para poder concluir o processo de criação
                de conta.
              </p>
              <div class="pt-1 mb-4" style={{ marginTop: "5%" }}>
                <a
                  href="/signup_comprador"
                  class="btn btn-info btn-lg btn-dark"
                  role="button"
                >
                  Continuar
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer class="footer bg-dark text-light fixed-bottom">
        <div class="container d-flex justify-content-center align-items-center">
          <span class="text-center">&copy; Ware 2024</span>
        </div>
      </footer>
    </div>
  );
}
